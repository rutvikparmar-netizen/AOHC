'use client'

import { useEffect, useRef } from 'react'
import { homeMarker, type ReachMarker } from '@/data/reach'

/**
 * A photographic Earth with the patient countries pinned and a travel arc
 * running from each one back to the centre in India.
 *
 * WHY THIS IS HAND-WRITTEN WEBGL AND NOT A LIBRARY. An earlier version used
 * `cobe`, which draws the globe as a grid of dots — a deliberate aesthetic
 * that no amount of tuning makes photorealistic. A real Earth needs real
 * imagery mapped onto a real sphere, and the two ways to get that are a 3D
 * engine (three.js is several hundred KB before you load anything) or one
 * fragment shader. This is the shader: ~50 lines of GLSL, no dependency, and
 * the only payload is the 163KB texture.
 *
 * HOW THE SPHERE WORKS. There is no geometry. A single quad covers the canvas
 * and the fragment shader intersects a ray with a unit sphere per pixel: for
 * screen point `p`, anything with |p| > 1 is sky and everything else is the
 * sphere at depth `z = sqrt(1 - |p|²)`. That surface normal is rotated by the
 * current tilt and spin, converted to latitude/longitude, and used to sample
 * the equirectangular photo. Lambert shading, limb darkening and an
 * atmospheric rim go on top. A textured sphere for the cost of one quad.
 *
 * HOW THE ARCS WORK. They are SVG, not WebGL — a path can be stroked, dashed
 * and animated for free, where a shader would need the whole thing rebuilt as
 * geometry. Each arc is a great circle from a country to Delhi, lifted off the
 * surface by a bell curve so it reads as a flight path. The sample points are
 * computed once in Earth-fixed coordinates; each frame only rotates and
 * projects them. A point is dropped from the path when it goes behind the
 * globe — that occlusion is what makes a flat SVG sit convincingly on a
 * sphere.
 *
 * IMAGERY: NASA Blue Marble Next Generation (Visible Earth, December 2004),
 * topography and bathymetry, downscaled to 2048×1024 — power-of-two so WebGL 1
 * can mipmap it, which is what keeps the coastlines from aliasing as the globe
 * turns. NASA imagery is in the public domain and carries no attribution
 * requirement.
 *
 * ACCESSIBILITY — unchanged and not optional:
 *
 *   1. The canvas is `aria-hidden` and the country list beside it is the real
 *      content. A canvas cannot be read aloud, and the pins are a pointer-only
 *      convenience, so the globe must never be the only place a country
 *      exists. Every one of them is a focusable chip in that list.
 *   2. `prefers-reduced-motion` stops the drift and the arc flow, and focus
 *      changes snap instead of sweeping.
 *   3. No WebGL falls back to a shaded disc rather than a blank square, with
 *      the pins and arcs hidden since there is then nothing to pin them to.
 *
 * PERFORMANCE. The texture is only fetched, and the GL context only created,
 * once the section nears the viewport — this sits well below the fold and
 * should cost nothing to a reader who never scrolls to it.
 */

const TEXTURE_SRC = '/images/earth.webp'

/** Degrees of longitude the globe drifts per frame when left alone. */
const DRIFT = 0.09
/** Resting tilt: a slight northern bias, where most of the markers are. */
const BASE_TILT = 18
/** How fast the globe eases toward a focused country (0–1 per frame). */
const EASE = 0.06
/** Sample points per arc. Enough to look smooth at any size we render. */
const ARC_STEPS = 36
/** Share of the canvas the sphere fills, leaving room for the halo. */
const FILL = 0.88
/**
 * Sphere radius in the arc overlay's own units.
 *
 * The SVG uses a fixed `viewBox` of 100 units across, centred on the sphere,
 * so the arcs scale with the element and the frame loop never has to know how
 * many pixels wide the globe currently is. Half of that is 50, and the sphere
 * fills 88% of it.
 */
const ARC_RADIUS = 50 * FILL

const VERTEX_SHADER = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`

const FRAGMENT_SHADER = `
precision highp float;

varying vec2 v_uv;

uniform sampler2D u_earth;
uniform float u_spin;   // radians; negative centre longitude
uniform float u_tilt;   // radians; centre latitude
uniform float u_px;     // one device pixel, in sphere radii
uniform vec3 u_light;   // unit light direction, view space

const float PI = 3.141592653589793;
const float FILL = 0.88;

void main() {
  vec2 p = v_uv / FILL;
  float r = length(p);

  /* Smooth coverage instead of a hard cut, or the horizon turns into a
     staircase. u_px is the pixel size in these units, so the edge stays one
     pixel wide whatever the canvas is scaled to. */
  float sphere = 1.0 - smoothstep(1.0 - u_px * 1.5, 1.0 + u_px * 0.5, r);

  vec3 colour = vec3(0.0);

  if (sphere > 0.0) {
    float z = sqrt(max(1.0 - r * r, 0.0));
    vec3 n = vec3(p.x, p.y, z);

    /* Tilt about X, then spin about Y, to carry the view normal back to a
       fixed Earth. */
    float ct = cos(u_tilt), st = sin(u_tilt);
    vec3 m = vec3(n.x, n.y * ct + n.z * st, -n.y * st + n.z * ct);
    float cs = cos(u_spin), ss = sin(u_spin);
    vec3 q = vec3(m.x * cs - m.z * ss, m.y, m.x * ss + m.z * cs);

    float lat = asin(clamp(q.y, -1.0, 1.0));
    float lng = atan(q.x, q.z);
    vec3 earth = texture2D(u_earth, vec2(lng / (2.0 * PI) + 0.5, 0.5 - lat / PI)).rgb;

    /* Lambert with a soft terminator. The night side keeps a little of the
       albedo so the dark limb reads as unlit land rather than a hole. */
    float lambert = dot(n, u_light);
    float day = smoothstep(-0.30, 0.42, lambert);
    vec3 night = earth * 0.12 + vec3(0.008, 0.035, 0.05);
    colour = mix(night, earth * (0.72 + 0.48 * max(lambert, 0.0)), day);

    /* Limb darkening — the edge of a lit sphere is always dimmer. */
    colour *= pow(max(1.0 - r * r, 0.0), 0.20);

    /* Atmosphere seen through its own depth, strongest at the horizon. */
    float rim = pow(clamp(r, 0.0, 1.0), 9.0);
    colour += vec3(0.16, 0.52, 0.70) * rim * (0.30 + 0.70 * day) * 0.85;
  }

  /* The halo outside the disc, premultiplied like the sphere so the canvas
     composites straight onto the section behind it. */
  float halo = exp(-max(r - 1.0, 0.0) * 11.0) * 0.40 * (1.0 - sphere);
  vec3 out_rgb = colour * sphere + vec3(0.11, 0.44, 0.58) * halo;

  gl_FragColor = vec4(out_rgb, min(sphere + halo, 1.0));
}`

type Vec3 = [number, number, number]

/** Earth-fixed unit vector, matching the convention the shader inverts. */
function toVector(lat: number, lng: number): Vec3 {
  const phi = (lat * Math.PI) / 180
  const lambda = (lng * Math.PI) / 180
  return [
    Math.cos(phi) * Math.sin(lambda),
    Math.sin(phi),
    Math.cos(phi) * Math.cos(lambda),
  ]
}

/**
 * Great-circle route from one place to another, lifted off the surface.
 *
 * Spherical interpolation gives the shortest path over the globe — the route
 * an aircraft actually flies — and the `sin(πt)` term raises its middle so it
 * arcs above the surface instead of lying flat on it. Longer journeys arc
 * higher, which is both how flight maps are drawn and what stops a dozen arcs
 * converging on Delhi from collapsing into one another.
 */
function arcPoints(from: Vec3, to: Vec3): Float64Array {
  const dot = Math.min(1, Math.max(-1, from[0] * to[0] + from[1] * to[1] + from[2] * to[2]))
  const omega = Math.acos(dot)
  const sinOmega = Math.sin(omega)
  /**
   * Longer journeys arc higher, which is how flight maps are drawn and what
   * stops a dozen routes converging on Delhi from collapsing into one another.
   *
   * THE CAP IS GEOMETRY, NOT TASTE. The sphere fills 88% of its box, so a
   * point may sit at most 1/0.88 ≈ 1.136 radii from the centre before it
   * leaves that box. An uncapped lift sent the long routes clean off the top
   * of the section.
   */
  const lift = Math.min(0.09, 0.04 + 0.08 * (omega / Math.PI))

  const points = new Float64Array((ARC_STEPS + 1) * 3)

  for (let i = 0; i <= ARC_STEPS; i++) {
    const t = i / ARC_STEPS
    // Degenerate case: the same point. Fall back to a straight blend.
    const a = sinOmega < 1e-6 ? 1 - t : Math.sin((1 - t) * omega) / sinOmega
    const b = sinOmega < 1e-6 ? t : Math.sin(t * omega) / sinOmega
    const radius = 1 + lift * Math.sin(Math.PI * t)

    points[i * 3] = (from[0] * a + to[0] * b) * radius
    points[i * 3 + 1] = (from[1] * a + to[1] * b) * radius
    points[i * 3 + 2] = (from[2] * a + to[2] * b) * radius
  }

  return points
}

/** Shortest signed route from one longitude to another, in degrees. */
function shortestDelta(from: number, to: number): number {
  return ((((to - from) % 360) + 540) % 360) - 180
}

function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function RealGlobe({
  markers,
  focus,
  onDrag,
}: {
  markers: ReachMarker[]
  /** The country being pointed at in the list, or null to drift. */
  focus: ReachMarker | null
  /**
   * Called when the viewer takes hold of the globe, so the list can drop
   * whatever it had pinned. A hand on the globe has to beat a chip tapped a
   * moment ago, or the easing drags it back out from under them.
   */
  onDrag: () => void
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /**
   * The frame loop reads these from refs rather than the props, so pointing at
   * another country does not tear down and rebuild the globe. Written in an
   * effect, not during render: a discarded render would leave the loop easing
   * toward a country nobody pointed at.
   */
  const focusRef = useRef<ReachMarker | null>(focus)
  const onDragRef = useRef(onDrag)

  useEffect(() => {
    focusRef.current = focus
    onDragRef.current = onDrag
  }, [focus, onDrag])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    let disposed = false
    let frame: number | null = null
    let gl: WebGLRenderingContext | null = null
    let resizeObserver: ResizeObserver | null = null

    /**
     * Presentational flags are DOM attributes, not React state: CSS alone
     * consumes them, and routing them through `setState` would re-render
     * without changing any markup.
     */
    const fail = () => wrap.setAttribute('data-globe-failed', '')

    const start = () => {
      const context = canvas.getContext('webgl', {
        antialias: false,
        alpha: true,
        premultipliedAlpha: true,
        powerPreference: 'low-power',
      })

      if (!context) {
        fail()
        return
      }
      gl = context

      const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
      const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
      const program = gl.createProgram()
      if (!vertex || !fragment || !program) {
        fail()
        return
      }

      gl.attachShader(program, vertex)
      gl.attachShader(program, fragment)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        fail()
        return
      }
      gl.useProgram(program)

      // One quad over the whole canvas. This is the entire geometry.
      const buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      )
      const attribute = gl.getAttribLocation(program, 'a_pos')
      gl.enableVertexAttribArray(attribute)
      gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0)

      const uSpin = gl.getUniformLocation(program, 'u_spin')
      const uTilt = gl.getUniformLocation(program, 'u_tilt')
      const uPx = gl.getUniformLocation(program, 'u_px')
      const uLight = gl.getUniformLocation(program, 'u_light')

      // Mostly from behind the viewer's left shoulder: enough shading to read
      // as a sphere, with only a thin unlit crescent on the right.
      const light: Vec3 = [-0.35, 0.3, 0.88]
      const length = Math.hypot(light[0], light[1], light[2])
      gl.uniform3f(uLight, light[0] / length, light[1] / length, light[2] / length)

      const image = new Image()
      image.decoding = 'async'
      image.onerror = fail

      image.onload = () => {
        if (disposed || !gl) return

        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
        /* Wrap east–west so the dateline seam closes; clamp north–south so the
           poles do not bleed round. Mipmaps because the whole 2048px texture
           is squeezed into a few hundred pixels — without them the coastlines
           sparkle as it turns. */
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.generateMipmap(gl.TEXTURE_2D)

        /* Everything below is computed once: the pins' Earth-fixed vectors and
           every arc's sample points. Each frame only rotates and projects
           them. */
        const home = toVector(homeMarker.location[0], homeMarker.location[1])

        const pins = Array.from(
          wrap.querySelectorAll<HTMLElement>('[data-globe-pin]'),
        ).map((element) => ({
          element,
          vector: toVector(Number(element.dataset.lat), Number(element.dataset.lng)),
        }))

        const arcs = Array.from(
          wrap.querySelectorAll<SVGPathElement>('[data-globe-arc]'),
        ).map((element) => ({
          element,
          glow: wrap.querySelector<SVGPathElement>(
            `[data-globe-arc-glow="${element.dataset.globeArc}"]`,
          ),
          points: arcPoints(
            toVector(Number(element.dataset.lat), Number(element.dataset.lng)),
            home,
          ),
        }))

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

        /* Centre longitude and latitude, in degrees. Opens on India. */
        let centreLng = homeMarker.location[1]
        let centreTilt = BASE_TILT
        let size = 0

        const measure = () => {
          const dpr = Math.min(window.devicePixelRatio || 1, 2)
          size = Math.round(wrap.clientWidth * dpr)
          canvas.width = size
          canvas.height = size
          if (gl) {
            gl.viewport(0, 0, size, size)
            /* A pixel is 2/size of the canvas, and the sphere fills 88% of it —
               so in sphere radii one pixel is 2/(size × 0.88). This is what
               keeps the horizon exactly one pixel soft at any size. */
            gl.uniform1f(uPx, size > 0 ? 2 / (size * FILL) : 0.01)
          }
        }
        measure()

        resizeObserver = new ResizeObserver(measure)
        resizeObserver.observe(wrap)

        wrap.setAttribute('data-globe-ready', '')

        // The pointer handlers can reach the rotation from here on.
        dragBy = (degrees: number) => {
          centreLng += degrees
        }

        const tick = () => {
          const target = pointer.down ? null : focusRef.current
          const ease = reduced.matches ? 1 : EASE

          if (target) {
            centreLng += shortestDelta(centreLng, target.location[1]) * ease
            // Follow the latitude, but only partway and never far enough to
            // tip the globe onto its side.
            const goal = Math.max(-38, Math.min(38, target.location[0] * 0.55))
            centreTilt += (goal - centreTilt) * ease
          } else {
            if (!pointer.down && !reduced.matches) centreLng += DRIFT + pointer.momentum
            // Momentum from a flick decays back into the idle drift.
            pointer.momentum *= 0.93
            centreTilt += (BASE_TILT - centreTilt) * (reduced.matches ? 1 : 0.03)
          }

          const spin = (-centreLng * Math.PI) / 180
          const tilt = (centreTilt * Math.PI) / 180

          if (gl) {
            gl.uniform1f(uSpin, spin)
            gl.uniform1f(uTilt, tilt)
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
          }

          /* The same rotation the shader applies, in reverse: Earth-fixed to
             view space. Everything drawn over the canvas goes through this, so
             a pin and an arc endpoint always agree. */
          const cs = Math.cos(spin)
          const ss = Math.sin(spin)
          const ct = Math.cos(tilt)
          const st = Math.sin(tilt)

          const project = (x: number, y: number, z: number) => {
            const mx = x * cs + z * ss
            const mz = -x * ss + z * cs
            return {
              x: mx,
              y: y * ct - mz * st,
              z: y * st + mz * ct,
            }
          }

          const radius = (wrap.clientWidth / 2) * FILL

          for (const pin of pins) {
            const p = project(pin.vector[0], pin.vector[1], pin.vector[2])

            // Fade and shrink toward the horizon, so pins read as sitting on a
            // surface curving away rather than floating in front of it.
            const visible = Math.max(0, Math.min(1, p.z / 0.22))
            pin.element.style.opacity = String(visible)
            // A pin on the far side must not swallow hover or a drag.
            pin.element.style.pointerEvents = visible > 0.45 ? 'auto' : 'none'
            pin.element.style.transform = `translate3d(${p.x * radius}px, ${-p.y * radius}px, 0) translate(-50%, -50%) scale(${0.72 + 0.28 * p.z})`
          }

          for (const arc of arcs) {
            let d = ''
            let drawing = false

            for (let i = 0; i < arc.points.length; i += 3) {
              const p = project(arc.points[i]!, arc.points[i + 1]!, arc.points[i + 2]!)

              /* Behind the globe: the point is on the far side AND inside the
                 silhouette. An arc high enough to clear the limb stays drawn,
                 which is exactly what gives the curve its depth. */
              if (p.z < 0 && Math.hypot(p.x, p.y) < 1) {
                drawing = false
                continue
              }

              const sx = Math.round(p.x * ARC_RADIUS * 100) / 100
              const sy = Math.round(-p.y * ARC_RADIUS * 100) / 100
              d += `${drawing ? 'L' : 'M'}${sx} ${sy}`
              drawing = true
            }

            arc.element.setAttribute('d', d)
            arc.glow?.setAttribute('d', d)
          }

          frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)
      }

      image.src = TEXTURE_SRC
    }

    /**
     * DRAGGING.
     *
     * The handlers sit on the wrapper, not the canvas, so a drag that starts
     * on a pin still turns the globe. Horizontal movement only — `touch-pan-y`
     * in the class list leaves vertical gestures to the browser, so a reader
     * swiping past the globe on a phone scrolls the page instead of being
     * trapped spinning it.
     */
    const pointer = { down: false, startX: 0, momentum: 0 }

    const onPointerDown = (event: PointerEvent) => {
      pointer.down = true
      pointer.startX = event.clientX
      pointer.momentum = 0
      wrap.setPointerCapture(event.pointerId)
      wrap.setAttribute('data-globe-dragging', '')
      onDragRef.current()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!pointer.down) return
      const delta = event.clientX - pointer.startX
      pointer.startX = event.clientX
      // A drag across the full width turns the globe roughly once.
      const degrees = (delta / Math.max(wrap.clientWidth, 1)) * 360
      dragBy(degrees)
      pointer.momentum = degrees * 0.12
    }

    const onPointerUp = () => {
      pointer.down = false
      wrap.removeAttribute('data-globe-dragging')
    }

    /**
     * The drag has to reach `centreLng`, which lives inside the texture's load
     * handler. Rather than hoist all of that out, the handler publishes a
     * setter here once it is running; before then a drag simply does nothing,
     * which is correct — there is no globe on screen yet.
     */
    let dragBy: (degrees: number) => void = () => {}

    wrap.addEventListener('pointerdown', onPointerDown)
    wrap.addEventListener('pointermove', onPointerMove)
    wrap.addEventListener('pointerup', onPointerUp)
    wrap.addEventListener('pointercancel', onPointerUp)

    /* Deferred: nothing is fetched or compiled until the section is close. */
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          try {
            start()
          } catch {
            fail()
          }
        }
      },
      { rootMargin: '400px' },
    )
    observer.observe(wrap)

    return () => {
      disposed = true
      observer.disconnect()
      resizeObserver?.disconnect()
      if (frame) cancelAnimationFrame(frame)
      wrap.removeEventListener('pointerdown', onPointerDown)
      wrap.removeEventListener('pointermove', onPointerMove)
      wrap.removeEventListener('pointerup', onPointerUp)
      wrap.removeEventListener('pointercancel', onPointerUp)
      // Hand the context back rather than waiting for GC; browsers cap how
      // many live WebGL contexts a page may hold.
      gl?.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [markers])

  const travellers = markers.filter(
    (marker) => marker.country !== homeMarker.country,
  )

  return (
    <div
      ref={wrapRef}
      className="group/globe relative aspect-square w-full max-w-xl cursor-grab touch-pan-y select-none data-[globe-dragging]:cursor-grabbing"
    >
      {/* Placeholder until the first frame, and the permanent backdrop if
          WebGL is unavailable. The radial shading reads as a lit sphere. */}
      <div
        aria-hidden
        className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_32%_28%,var(--color-brand-teal-600),var(--color-brand-teal-900)_58%,var(--color-brand-teal-950))] transition-opacity duration-700 group-data-[globe-ready]/globe:opacity-0"
      />

      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 size-full opacity-0 transition-opacity duration-700 group-data-[globe-ready]/globe:opacity-100"
      />

      {/* Travel arcs. The viewBox is centred on the sphere so the frame loop
          can emit coordinates in pixels from the middle. */}
      <svg
        aria-hidden
        viewBox="-50 -50 100 100"
        preserveAspectRatio="xMidYMid meet"
        /* No `overflow-visible`: the viewBox clip is the backstop that keeps
           a long arc from ever painting over the rest of the section. */
        className="pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-700 group-data-[globe-ready]/globe:opacity-100 group-data-[globe-failed]/globe:hidden"
      >
        {/* Two passes per arc: a steady line, and a brighter dashed one
            flowing along it toward India. The flow is what says the traffic
            moves in one direction. */}
        {travellers.map((marker) => (
          <path
            key={`glow-${marker.country}`}
            data-globe-arc-glow={marker.country}
            fill="none"
            stroke="var(--color-brand-teal-300)"
            strokeWidth={focus?.country === marker.country ? 2 : 1}
            strokeOpacity={focus?.country === marker.country ? 0.85 : 0.3}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {travellers.map((marker) => (
          <path
            key={marker.country}
            data-globe-arc={marker.country}
            data-lat={marker.location[0]}
            data-lng={marker.location[1]}
            className="arc-flow"
            fill="none"
            stroke="#ffffff"
            strokeWidth={focus?.country === marker.country ? 2.2 : 1.4}
            strokeOpacity={focus?.country === marker.country ? 1 : 0.55}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Pins. Positioned from the centre by the frame loop, and hidden
          entirely without WebGL since there is then no projection to pin them
          to. They are `aria-hidden` pointer affordances — every country is
          also a focusable chip in the list beside the globe. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 group-data-[globe-failed]/globe:hidden"
      >
        {markers.map((marker) => {
          const isHome = marker.country === homeMarker.country
          const isActive = focus?.country === marker.country

          return (
            <span
              key={marker.country}
              data-globe-pin
              data-lat={marker.location[0]}
              data-lng={marker.location[1]}
              /* The padding is the hit area: a 10px dot is a miserable hover
                 target, so the whole 36px box takes the pointer. */
              className="group/pin absolute left-1/2 top-1/2 p-3 opacity-0"
            >
              <span
                className={`block rounded-full transition-all duration-300 group-hover/pin:scale-125 ${
                  isActive
                    ? 'size-3.5 bg-white ring-4 ring-white/35'
                    : isHome
                      ? 'size-3 bg-brand-teal-200 ring-2 ring-white/40'
                      : 'size-2 bg-brand-teal-300/90 ring-1 ring-white/30'
                }`}
              />

              {/* The country's name, on hover. CSS only — no state, so it
                  cannot cost a re-render of the tree sixty times a second. */}
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 scale-95 whitespace-nowrap rounded-(--radius-pill) border border-white/25 bg-brand-teal-950/90 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-(--shadow-modal) backdrop-blur-md transition-all duration-200 group-hover/pin:scale-100 group-hover/pin:opacity-100">
                {marker.country}
              </span>
            </span>
          )
        })}
      </div>

      {/* Label for the country being pointed at in the list. `aria-hidden` —
          that list already announces the same thing on focus. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-2 flex justify-center transition-all duration-300 ${
          focus ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
        <span className="rounded-(--radius-pill) border border-white/25 bg-brand-teal-950/80 px-5 py-2.5 text-sm font-semibold text-white shadow-(--shadow-modal) backdrop-blur-md">
          {focus?.country === homeMarker.country ? (
            <>
              Our centre is in{' '}
              <span className="text-brand-teal-300">{homeMarker.country}</span>
            </>
          ) : (
            <>
              Patients from{' '}
              <span className="text-brand-teal-300">{focus?.country ?? ''}</span>
            </>
          )}
        </span>
      </div>
    </div>
  )
}
