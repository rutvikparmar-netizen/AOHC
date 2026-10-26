/**
 * WHERE PATIENTS COME FROM
 * ----------------------------------------------------------------------------
 * ⚠️  ONE CLAIM TO VERIFY BEFORE LAUNCH.
 *
 * This list is presented on the page as countries AOHC has treated patients
 * from. Two of them are evidenced in AOHC's own published material: the
 * cervical-cancer testimonial captioned "FROM NEW ZEALAND TO HEALING IN JUST
 * 8 WEEKS", and the video titled "An Iraqi Patient's Life-Changing Journey".
 *
 * The rest come from the International Patients page, which invites enquiries
 * from "the United Kingdom, Australia, Canada, the United States, Europe, the
 * Middle East, Africa, Southeast Asia, and other regions" — wording that
 * describes who may get in touch rather than who has been treated.
 *
 * Presenting them together was an explicit instruction, and for a practice
 * of this size it is very likely accurate. It is nonetheless a factual claim
 * about the business that should be checked against patient records before
 * the site goes live, and corrected here if any country does not belong.
 *
 * Coordinates are capital cities, rounded — they position a marker on a
 * globe, nothing more.
 */

export interface ReachMarker {
  country: string
  /** [latitude, longitude] */
  location: [number, number]
  /** Larger dot for the home country. */
  size: number
}

/** India — where care is delivered. The anchor every arc returns to. */
export const homeMarker: ReachMarker = {
  country: 'India',
  location: [28.61, 77.21], // Delhi NCR — the Gurugram centre
  size: 0.1,
}

/** Countries patients have come from. See the warning above. */
export const patientCountries: ReachMarker[] = [
  { country: 'United States', location: [38.9, -77.04], size: 0.06 },
  { country: 'United Kingdom', location: [51.51, -0.13], size: 0.06 },
  { country: 'Canada', location: [45.42, -75.7], size: 0.06 },
  { country: 'Australia', location: [-35.28, 149.13], size: 0.06 },
  { country: 'New Zealand', location: [-41.29, 174.78], size: 0.06 },
  { country: 'Spain', location: [40.42, -3.7], size: 0.06 },
  { country: 'Iraq', location: [33.31, 44.37], size: 0.06 },
  { country: 'United Arab Emirates', location: [24.45, 54.38], size: 0.06 },
  { country: 'Kenya', location: [-1.29, 36.82], size: 0.06 },
  { country: 'Nigeria', location: [9.08, 7.4], size: 0.06 },
  { country: 'Singapore', location: [1.35, 103.82], size: 0.06 },
  { country: 'Bangladesh', location: [23.81, 90.41], size: 0.06 },
  { country: 'Nepal', location: [27.72, 85.32], size: 0.06 },
]

/**
 * Every marker on the globe, home first.
 *
 * A MODULE CONSTANT ON PURPOSE. The globe builds itself in an effect keyed on
 * its marker list. Composing that list inside the component would hand it a
 * new array on every render — and since hovering a country re-renders, the
 * WebGL context would be torn down and rebuilt on every mouse move.
 */
export const allMarkers: ReachMarker[] = [homeMarker, ...patientCountries]

export const reach = {
  eyebrow: 'International patients',
  title: 'Our Patients Come From Around the World',
  intro:
    'Care is delivered from our centre in Gurugram, India, and patients reach us from across Europe, the Middle East, Africa, Asia and the Americas. Point at a country below to turn the globe to it.',
}
