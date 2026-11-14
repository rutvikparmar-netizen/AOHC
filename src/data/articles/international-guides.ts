import type { ArticlePageContent } from '@/types'

/**
 * THE SEVEN INTERNATIONAL-PATIENT GUIDES
 * ----------------------------------------------------------------------------
 * Migrated from the live WordPress pages and kept at their original URLs:
 *
 *   /payments-and-invoices                      Invoicing & Payments
 *   /accommodation                              Partner hotels
 *   /india-phone-sim                            Local phone SIM
 *   /insight/cash-to-carry                      Local currency & cash
 *   /insight/local-sight-seeing-shopping        Local sightseeing
 *   /insight/airport-pickup-and-local-travel    Airport pickup & local travel
 *   /insight/medical-visa-for-india             Medical visa
 *
 * The copy is the live pages' own (checked 14 Nov 2026). What changed:
 *
 *   - The billing desk email on the payments page is kept as on the live
 *     page (confirmed by AOHC, 14 Nov 2026).
 *   - Page furniture dropped: "Updated" dates, reading times, "On this page"
 *     lists (the article has its own table of contents), button labels such
 *     as "View Hotel", and the emoji in
 *     front of list items.
 *   - The live tables are tables here (`ArticleSection.table`), and the
 *     payments page's Day 0 / 3 / 6 / 7 timeline graphic is a small table.
 *   - The hotel photos and the Airtel / Jio logos are the live page's own
 *     files, resized to WebP in `public/images/guides/`.
 *   - FAQs are `h3` questions under a FAQ heading, so ArticleShell writes
 *     them into FAQPage schema.
 *
 * ⚠️  THESE ARE OPERATIONAL PROMISES — fees (3.5% card charge, ~1% FX
 * shortfall), timelines (7-day payment terms, ~10–11 days for a visa, 60-day
 * visa validity), hotel distances and what transport AOHC pays for. They are
 * reproduced exactly as the live site states them. Any change has to come
 * from the AOHC operations team, not from an edit here.
 */

/* ── Invoicing & Payments ──────────────────────────────────────────────── */
export const paymentsAndInvoices: ArticlePageContent = {
  hero: {
    title: 'Invoicing & Payments',
    body: ['A calm, clear guide to billing—so you can focus on healing while we keep finances predictable and transparent.'],
  },
  lead: ['Contact: subhasish.banerjee@artofhealingcancer.com (cc: connect@artofhealingcancer.com)'],
  sections: [
    {
      title: 'Overview',
      body: [
        'Our billing process is designed to reduce stress. You’ll always know what is billed, when to expect an invoice, and how to pay—no last-minute surprises.',
        'Invoices are always issued in Indian Rupees (INR). You may pay the equivalent in your local currency using our regional bank accounts. Any shortfall from currency conversion (typically ~1%) is adjusted in your next invoice.',
      ],
      items: ['Transparent', 'Predictable', 'Patient-first'],
    },
    {
      title: 'Invoicing Schedule (bi-monthly)',
      table: {
        head: ['Admission Window', 'Invoice Date', 'What it Covers'],
        rows: [
          ['Arrivals between 1st–15th', '16th of the same month', 'Care received from arrival date up to the 15th'],
          ['Arrivals between 16th–end of month', '1st of the next month', 'Care received from arrival date up to the last day of the month'],
          ['Ongoing patients', 'Repeat the 16th / 1st cycle', 'Every 1st–15th period billed on the 16th, every 16th–end billed on the 1st'],
        ],
      },
      outro: ['Every invoice itemizes treatments, medications, supplements, procedures, nursing, and allied services clearly.'],
    },
    {
      title: 'Examples (to make it easy)',
      items: [
        'Start on the 6th: invoice for 6th–15th is issued on the 16th. The next period 16th–30th/31st is billed on the 1st of the following month.',
        'Start on the 20th: invoice for 20th–month end is issued on the 1st of the next month.',
        'Continue multiple months: you keep receiving invoices on the 16th and the 1st, covering the respective periods.',
      ],
    },
    {
      title: 'Ongoing Invoicing (if you’re already in care)',
      body: ['For patients staying over several weeks or months, your cycle continues without disruption:'],
      items: ['1st–15th → invoice on the 16th', '16th–end → invoice on the 1st of the next month'],
      outro: [
        'If your care plan changes mid-cycle, the next invoice will reflect the updated plan. You only pay for services actually rendered (plus pre-agreed scheduled services that are clinically required).',
      ],
    },
    {
      title: 'Departure & Final Invoice (no last-minute stress)',
      body: ['When you are preparing to travel home, we make the financial close-out smooth and early.'],
      items: [
        'Your final invoice is issued 2 days before departure and covers the balance of days in the current cycle.',
        'Any services scheduled on your final day are pre-invoiced to avoid delays.',
        'Please share proof of payment before departure (screenshot or receipt). We’ll confirm right away.',
      ],
    },
    {
      title: 'Clear example',
      level: 3,
      body: [
        'If you are leaving on the 25th, your last invoice will be issued on the 23rd and will cover services from 16th–25th. We will include any treatments forecasted for the 25th in this invoice so you can settle everything before you fly.',
      ],
    },
    { title: 'Payment Methods (choose what’s easiest)' },
    {
      title: '1) Online Bank Transfer',
      level: 3,
      items: [
        'AOHC maintains local accounts in USA (USD), Canada (CAD), UK (GBP & Euro), Australia (AUD), and India (INR).',
        'Patients from these regions (or Europe) can pay directly into their local AOHC account—usually faster with lower fees.',
        'Patients from other countries may pay to the Indian account or any regional account they prefer.',
        'Invoices are always in INR. You may deposit the equivalent in your local currency.',
        'Any incoming FX shortfall (generally ~1%) is adjusted in your next invoice.',
      ],
    },
    {
      title: '2) Credit Card',
      level: 3,
      items: ['All major cards accepted.', 'A 3.5% processing charge applies to card payments.'],
      table: {
        head: ['Method', 'Typical Fees', 'Speed', 'Best For'],
        rows: [
          ['Bank Transfer', 'Low (FX shortfall ~1% if any)', '1–2 business days', 'Most international patients'],
          ['Credit Card', '3.5% processing charge', 'Instant', 'Urgent settlements / convenience'],
        ],
      },
    },
    {
      title: 'Payment Timelines (gentle reminders)',
      items: [
        'All invoices are due within 7 calendar days of issuance.',
        'Automated reminders on Day 3 and Day 6.',
        'For the final invoice (issued 2 days before departure), please share proof of payment before leaving India.',
      ],
      table: {
        head: ['Day', 'Step'],
        rows: [
          ['0', 'Invoice (Day 0)'],
          ['3', 'Reminder (Day 3)'],
          ['6', 'Reminder (Day 6)'],
          ['7', 'Payment Due (Day 7)'],
        ],
      },
    },
    {
      title: 'Receipts & Insurance Letters',
      items: [
        'Every payment is acknowledged with a receipt PDF sent to your registered email.',
        'On request, we provide treatment summaries and itemized invoices suitable for insurance/claims.',
        'If a correction is needed (name, passport number, etc.), reply to your invoice email and we’ll update it.',
      ],
    },
    {
      title: 'Refunds, Adjustments & Disputes',
      items: [
        'If a pre-scheduled service is clinically deferred or cancelled, it will be credited in your next invoice.',
        'Any currency conversion shortfall (~1%) that we receive is added as an adjustment line item in the next invoice.',
        'For disputes or questions, write to subhasish.banerjee@artofhealingcancer.com (cc connect@artofhealingcancer.com)—we aim to resolve within 2 business days.',
      ],
    },
    { title: 'FAQs' },
    {
      title: 'When will I get my first invoice?',
      level: 3,
      body: ['If you arrive between the 1st–15th, on the 16th; if you arrive between the 16th–end, on the 1st of next month.'],
    },
    {
      title: 'What if I’m leaving mid-month?',
      level: 3,
      body: [
        'Your final invoice arrives 2 days before you fly (e.g., leave on 25th → issued on 23rd), including any services forecasted on your last day. Please share proof of payment before you depart.',
      ],
    },
    {
      title: 'Can I pay in my home currency?',
      level: 3,
      body: [
        'AOHC maintains local accounts in USA (USD), Canada (CAD), UK (GBP & Euro), Australia (AUD), and India (INR).',
        'Patients from these regions (or Europe) can pay directly into their local AOHC account—usually faster with lower fees.',
      ],
    },
    {
      title: 'Do you accept credit cards?',
      level: 3,
      body: ['Yes. All major cards with a 3.5% processing charge.'],
    },
    {
      title: 'What if my payment is delayed?',
      level: 3,
      body: ['Please inform us. We send gentle reminders on Day 3 and Day 6. For unique situations, we’ll guide you compassionately case-by-case.'],
    },
    {
      title: 'Need help with billing?',
      body: [
        'We know finances can feel overwhelming during cancer care. You’re not alone—we’ll walk you through each step.',
        'Email Billing Desk — Primary: subhasish.banerjee@artofhealingcancer.com | CC: connect@artofhealingcancer.com',
        'Disclaimer: Bank details are shared securely on your invoice. Payment partners and processing times can vary by country. Policies may be updated; this page reflects the current AOHC process.',
      ],
    },
  ],
}

/* ── Accommodation ─────────────────────────────────────────────────────── */
export const accommodation: ArticlePageContent = {
  hero: {
    title: 'Recommended Partner Hotels for Our Patients',
    body: [
      'Trusted Hilton properties close to our centre in Gurugram — safe, hygienic, and supportive of medical needs, with hospital-managed commute and customized meals.',
    ],
  },
  sections: [
    {
      title: 'Why We Recommend These Hotels',
      body: ['A restful, safe stay is a vital part of healing. These properties are patient-friendly, internationally standardized, and within minutes of our centre.'],
      items: [
        'Hygiene & safety with Hilton standards',
        'Calm, secure environment with 24/7 support',
        'Chef teams open to doctor-recommended diets',
        'Close proximity to our centre',
        'Comfortable rooms for families & attendants',
        'Straightforward booking support from our team',
      ],
    },
    { title: 'Our Two Trusted Options' },
    {
      title: 'DoubleTree by Hilton Gurugram Baani Square (Sector 50)',
      level: 3,
      figures: [{ image: { src: '/images/guides/doubletree-baani-square.webp', alt: 'Exterior view of DoubleTree by Hilton Gurugram Baani Square in Sector 50', width: 474, height: 316 } }],
      body: [
        '~1.2 km from AOHC · ≈ 6 min by car',
        'Practically next door — the most convenient choice for daily visits. International Hilton standards, calm environment, and flexible kitchen for medical diets.',
      ],
      items: ['Comfortable rooms & quiet floors', 'Outdoor pool & fitness centre', 'Dining: Glasshouse, Café O’ Lait, Vibe – Sky Bar'],
    },
    {
      title: 'Hilton Gurugram Baani City Centre (Sector 63)',
      level: 3,
      figures: [{ image: { src: '/images/guides/hilton-baani-city-centre.webp', alt: 'Modern facade of Hilton Gurugram Baani City Centre in Sector 63', width: 474, height: 265 } }],
      body: [
        '~7 km from AOHC · ≈ 17–18 min by car',
        'A newer, larger property suitable for longer stays or families wanting extra space — with patient-friendly services and quiet, business-class ambience.',
      ],
      items: ['Modern rooms & suites', 'Dining: Kitchen Craft, Café O Lait, Tayles Lobby Bar', 'Spacious public areas and event spaces'],
    },
    {
      title: 'Commute To and From the Hospital',
      body: ['Transportation between your hotel and the Art of Healing Cancer Centre is arranged and managed directly by our team.'],
      items: [
        'Applies to both hotels — DoubleTree (Sector 50) and Hilton (Sector 63).',
        'Safe, reliable and timely transfers for all treatment sessions.',
        'Focus on healing while we handle the daily commute logistics.',
      ],
    },
    {
      title: 'How to Book',
      items: [
        'Confirm your travel dates with our coordination team.',
        'We will email an introduction connecting you directly with the hotel’s reservations team.',
        'You complete the reservation and payment directly with the hotel (transparent and flexible).',
      ],
      outro: ['Throughout the process, we remain available to relay dietary instructions, room preferences, and any special medical needs to the hotel.'],
    },
    {
      title: 'Quick Comparison',
      body: ['Key Differences at a Glance'],
      table: {
        head: ['Feature', 'DoubleTree (Sec 50)', 'Hilton (Sec 63)'],
        rows: [
          ['Distance from AOHC', '~1.2 km (≈6 min)', '~7 km (≈17–18 min)'],
          ['Best for', 'Maximum convenience for daily visits', 'Longer stays / larger spaces'],
          ['Dining (examples)', 'Glasshouse, Café O’ Lait, Vibe', 'Kitchen Craft, Café O Lait, Tayles'],
          ['Diet customization', 'Yes – coordinated via AOHC', 'Yes – coordinated via AOHC'],
          ['Commute', 'AOHC arranges transfers', 'AOHC arranges transfers'],
        ],
      },
      outro: [
        'Distances and travel times are approximate and may vary with traffic. Amenities listed are representative and may change per hotel policy.',
        'Note: Hotel reservations and payments are handled directly between the patient and the hotel. Art of Healing Cancer provides coordination support, dietary communication, and commute arrangements to simplify your stay.',
      ],
    },
  ],
}

/* ── Local Phone SIM ───────────────────────────────────────────────────── */
export const indiaPhoneSim: ArticlePageContent = {
  hero: {
    title: 'Local Phone SIM & Communication',
    body: [
      'Stay connected from day one — roam on Airtel/Jio 5G or get a local Indian SIM aligned to your medical-visa validity. Our team handles issuance, recharges, and support.',
    ],
  },
  sections: [
    {
      title: 'Quick Summary',
      body: [
        'Use your home-country SIM on roaming (connects to Airtel/Jio) or get a local prepaid SIM for the duration of your medical visa. We help with the entire process.',
      ],
      figureStyle: 'logo',
      figures: [
        { image: { src: '/images/guides/airtel-logo.webp', alt: 'Airtel logo', width: 320, height: 335 }, caption: 'Airtel 5G' },
        { image: { src: '/images/guides/jio-logo.webp', alt: 'Jio logo', width: 320, height: 320 }, caption: 'Jio 5G' },
      ],
      outro: ['Logos are trademarks of their respective owners and used for identification only.'],
    },
    {
      title: 'Option A — Use Your Home SIM (Roaming)',
      level: 3,
      items: [
        'Works immediately on arrival: your device connects to Airtel or Jio (5G/4G, coverage dependent).',
        'Best for short stays or if you already have an affordable roaming pack.',
        'Charges depend on your home carrier and plan.',
      ],
    },
    {
      title: 'Option B — Get a Local Indian SIM (Recommended)',
      level: 3,
      items: [
        'Validity: Issued for your medical-visa duration (expires when the visa expires).',
        'Cost: No issuance fee; pay only for recharges (~USD $5–$8 per 28–30 days).',
        'Typical plan: unlimited local calls + ~1–2 GB/day 5G/4G data.',
        'Tip: Buy two months of recharge upfront to avoid interruptions.',
      ],
    },
    {
      title: 'How to Request a Local SIM (Airtel Preferred)',
      items: [
        'Inform your AOHC coordinator that you need a local SIM.',
        'We schedule a quick visit to a nearby Airtel outlet (or equivalent).',
        'Bring your passport, Indian medical visa (for KYC scans), and your phone.',
        'The store issues the SIM aligned to your visa dates.',
        'We help choose a plan, purchase two months of recharge, and complete activation/eSIM setup.',
      ],
      outro: ['Activation: usually 15–60 minutes; in some cases up to 24 hours. We’ll monitor and confirm.'],
    },
    {
      title: 'What Your Plan Typically Includes',
      level: 3,
      items: [
        'Unlimited local calls (India-to-India)',
        'Daily high-speed data (1–2 GB/day; speed reduces after cap)',
        'Hotspot support (plan-dependent)',
      ],
    },
    {
      title: 'Using WhatsApp & International Calls',
      level: 3,
      items: ['WhatsApp/FaceTime/Zoom work over mobile data or Wi-Fi.', 'For direct international dialing, ask us to add an ISD pack.'],
    },
    {
      title: 'Device & Compatibility',
      level: 3,
      items: [
        'Modern iPhone/Android devices work on Airtel/Jio 4G/5G.',
        'Dual-SIM/eSIM: Keep your home SIM active for OTPs while using a local data SIM.',
      ],
    },
    {
      title: 'Good to Know',
      level: 3,
      items: [
        'Carry passport & visa for KYC on issuance day.',
        'Recharges are easy at stores or via apps; your coordinator can help.',
        'If you extend your visa, tell us so we can extend or reissue your SIM.',
        'Coverage is strong around our centre; we’ll pick the best network for you.',
      ],
    },
    { title: 'Frequently Asked Questions' },
    {
      title: 'Is there a fee to get the SIM?',
      level: 3,
      body: ['No issuance fee. You only pay for the prepaid recharge (typically USD $5–$8 per month, plan-dependent).'],
    },
    {
      title: 'Can I keep my home number active?',
      level: 3,
      body: ['Yes. If your phone supports dual-SIM or eSIM, we can keep your home number active for OTPs and calls while using local data.'],
    },
    {
      title: 'Who do I contact for help?',
      level: 3,
      body: ['Your assigned AOHC coordinator is your single point of contact for issuance, plan selection, recharges, and troubleshooting.'],
    },
    {
      body: [
        'Note: Network logos are for reference only; AOHC has no commercial affiliation unless explicitly stated. Plans, speeds, and pricing are operator-controlled and may change.',
      ],
    },
  ],
}

/* ── Local Currency & Cash to Carry ────────────────────────────────────── */
export const cashToCarry: ArticlePageContent = {
  hero: {
    title: 'Local Currency & Cash to Carry',
    body: ['Simple guidance for exchanging into INR, using cash locally, and paying larger bills by card or online transfer.'],
  },
  sections: [
    {
      title: 'Purpose of Cash in India',
      body: [
        'All medical and hotel payments are handled online (bank transfer or card). You will still need a reasonable amount of Indian Rupees (INR) for daily, personal expenses such as local transport, small cafés, groceries/pharmacy items, and tips.',
        'For international patients (UK, US, Canada, Europe, Australia, etc.), bring your home currency (or USD) for convenient exchange into INR on arrival.',
      ],
    },
    {
      title: 'What to Bring',
      items: [
        'Your home currency (GBP, USD, CAD, EUR, AUD, etc.) or US Dollars—both are easy to exchange for INR.',
        'At least one international credit/debit card (Visa / MasterCard / Amex) for larger payments and backup.',
        'A small mix of lower-denomination notes (after exchange) for day-to-day use.',
      ],
      outro: ['Tip: Inform your bank of international travel to avoid card security blocks.'],
    },
    {
      title: 'Where to Exchange',
      items: [
        'Airport exchange counters upon arrival (fastest for immediate INR needs).',
        'Authorized money changers near your hotel or in the city.',
        'Hotel reception (select hotels offer this service for guests).',
      ],
      outro: ['Always request and keep the exchange receipt if you plan to convert leftover INR back to your home currency when departing India.'],
    },
    {
      title: 'Where INR Cash Is Handy',
      items: ['Local taxis & metro', 'Cafés & small eateries', 'Groceries & pharmacy', 'Tips & small purchases', 'Short local errands'],
    },
    {
      title: 'Cards & ATMs',
      items: [
        'Cards widely accepted: Hospitals, hotels, restaurants, and malls usually accept international cards.',
        'ATMs available: You can withdraw INR using international cards; English instructions are standard.',
        'Security: Use bank-attached ATMs; avoid assistance from strangers; shield your PIN.',
      ],
    },
    {
      title: 'Safety & Good Practices',
      items: [
        'Avoid carrying large amounts of cash while moving around the city.',
        'Store extra currency and valuables in your hotel room safe.',
        'Keep a mix of smaller INR notes (e.g., ₹100–₹500) for quicker transactions.',
        'Exchange only at authorized counters to minimize counterfeit risk.',
      ],
    },
    {
      title: 'Quick Summary',
      table: {
        head: ['Topic', 'Guidance'],
        rows: [
          ['Medical & hotel bills', 'Paid online via bank transfer or card (no cash for bills).'],
          ['What to bring', 'Your home currency (or USD) + international card.'],
          ['Exchange into INR', 'At airport on arrival or authorized money changers; keep the receipt.'],
          ['Use of INR cash', 'Local transport, cafés, groceries/pharmacy, tips, small purchases.'],
          ['Cards & ATMs', 'Cards widely accepted; ATMs readily available—inform your bank before travel.'],
          ['Safety', 'Carry only what you need; use hotel safe; exchange at official counters.'],
        ],
      },
      outro: ['This guidance avoids prescribing fixed cash amounts. Adjust to your comfort and trip length.'],
    },
    { title: 'FAQs' },
    {
      title: 'Should I bring my home currency or USD?',
      level: 3,
      body: ['Either is fine. Bring the currency that is simplest for you; both your home currency and USD are easy to exchange for INR.'],
    },
    {
      title: 'Is it better to exchange at the airport or in the city?',
      level: 3,
      body: ['Exchange a reasonable amount at the airport for immediate needs, then use authorized counters or banks in the city if you require more.'],
    },
    {
      title: 'Can I rely only on cards?',
      level: 3,
      body: ['Cards work for most large transactions, but keep some INR cash for smaller, local expenses and any places that prefer cash.'],
    },
    {
      title: 'What if my card does not work?',
      level: 3,
      body: [
        'Try another card, use an ATM attached to a major bank, or contact your bank’s international support line. Notifying your bank before travel helps prevent blocks.',
      ],
    },
    {
      title: 'Do I need to keep exchange receipts?',
      level: 3,
      body: ['Yes—retain receipts if you plan to convert leftover INR back to your home currency on departure.'],
    },
    {
      title: 'On-Arrival Checklist',
      items: [
        'Exchange a reasonable amount into INR at the airport.',
        'Keep smaller notes handy for taxis and snacks.',
        'Confirm your card works with an initial small transaction.',
        'Save the exchange receipt.',
      ],
    },
    {
      title: 'Good to Know',
      body: [
        'International cards (Visa/MasterCard/Amex) are widely accepted at hospitals, hotels, and large stores. ATMs are common in Delhi & Gurugram.',
      ],
    },
    { title: 'Do & Don’t' },
    {
      title: 'Do',
      level: 3,
      items: ['Use authorized exchange counters.', 'Carry only the cash you need each day.', 'Store extra cash in the hotel safe.'],
    },
    {
      title: 'Don’t',
      level: 3,
      items: ['Depend solely on cash for large payments.', 'Accept help at ATMs from strangers.'],
    },
    {
      title: 'Disclaimer',
      body: [
        'This page provides general guidance for international patients regarding currency use in India. It does not prescribe fixed cash amounts. Practices can vary by bank and exchange provider; please follow official instructions and keep exchange receipts.',
        'Exact text preserved for patient clarity and accessibility.',
      ],
    },
  ],
}

/* ── Local Sightseeing ─────────────────────────────────────────────────── */
export const localSightseeing: ArticlePageContent = {
  hero: {
    title: 'Local Sightseeing from AOHC, Sector 51 (Gurugram)',
    body: [
      'A gentle, practical guide for patients and families to explore Gurugram, Delhi and nearby getaways between treatment days — prioritising comfort, shade, seating and accessible facilities.',
    ],
  },
  lead: ['AOHC Centre, Sector 51, Gurugram · Best: Oct–Mar · Wheelchair-aware, low exertion'],
  sections: [
    {
      title: 'At a glance',
      items: [
        'Base: AOHC Centre, Sector 51, Gurugram — well connected to Golf Course Road/Extension and HUDA City Centre metro.',
        'Best months: Oct–Mar for pleasant weather. Summers can be hot; monsoon brings showers.',
        'Patient focus: Choose short outings, shaded/indoor stops, frequent sit-downs; AOHC can arrange soft-ride, AC vehicles and wheelchair support.',
      ],
    },
    {
      title: 'Getting around',
      items: [
        'Chauffeur/Uber/Ola: Widely available; AOHC can provide trusted drivers and step-assist.',
        'Traffic tip: Aim for 8–11 am or 4–7 pm on weekdays. Keep plans flexible.',
      ],
    },
    {
      title: 'Quick distance & time guide (typical off-peak by car from AOHC, Sector 51)',
      body: ['Times are conservative off-peak estimates; add buffer for weekends, festivals or adverse weather.'],
      table: {
        head: ['Destination', 'Approx. one-way', 'Notes'],
        rows: [
          ['Worldmark Gurugram (Sector 65)', '20–35 min', 'Modern dining & retail hub with indoor promenades.'],
          ['DLF CyberHub', '30–45 min', 'Dense restaurant promenade; easy drop-offs.'],
          ['Ambience Mall (Gurugram)', '35–50 min', 'Large, fully indoor; lifts/ramps throughout.'],
          ['Worldmark, Aerocity (IGI Airport)', '45–70 min', 'Worldmark 1/2/3 dining clusters; airport-adjacent.'],
          ['32nd Avenue (32 Milestone), Sector 15', '30–50 min', 'Open-air gourmet courtyard; lively evenings.'],
          ['Golf Course Road — DLF Horizon Center (One/Two)', '20–35 min', 'Premium dining cluster (e.g., Comorin at Two Horizon Center).'],
          ['Qutub Minar (Mehrauli)', '50–75 min', 'UNESCO site; daylight hours; e-tickets available.'],
          ['Lodhi Garden', '50–70 min', 'Flat, shaded paths — great gentle stroll.'],
          ['Humayun’s Tomb & Sunder Nursery', '70–90 min', 'Mughal garden-tomb + heritage park/cafés.'],
          ['Lal Qila (Red Fort)', '70–90 min', 'ASI e-ticketing; sound & light show on select evenings.'],
          ['Purani Dilli / Chandni Chowk', '70–95 min', 'Heritage bazaar corridor; pair with rickshaw glide & Jama Masjid gate view.'],
          ['Sultanpur National Park', '45–70 min', 'Birding Oct–Mar; generally reopens after monsoon around Oct 1.'],
        ],
      },
    },
    {
      title: 'Patient-friendly half-day plans (2–4 hours)',
      items: [
        'Soft & Scenic (Gurugram): Aravalli photo stop → coffee at CyberHub → return.',
        'Indoor & Easy: Ambience Mall stroll + lunch → return.',
        'Old Delhi taster (low exertion): Lal Qila outer precinct photo stop → short Chandni Chowk rickshaw ride → Jama Masjid gate view → return. Avoid peak midday; plan drop-offs near gates.',
      ],
    },
    {
      title: 'Classic Delhi heritage (gentle full day, 6–8 hours)',
      items: [
        'Mehrauli Axis: Qutub Minar → lunch → Lodhi Garden → India Gate drive-by → return.',
        'Mughal Gardens & Crafts: Humayun’s Tomb → Sunder Nursery cafés/greenhouse stroll → return.',
        'Temple Architecture: Akshardham (no electronics inside; lockers; closed Mondays) → early dinner → return.',
      ],
    },
    {
      title: 'Purani Dilli (Old Delhi) essentials',
      items: [
        'Lal Qila (Red Fort): Iconic Mughal fort; book e-ticket time slots when possible.',
        'Chandni Chowk corridor: Pedestrian-friendly stretch (Red Fort ↔ Fatehpuri); brief rickshaw glide is ideal; sweets & heritage eateries.',
        'Jama Masjid: Dress modestly; prefer brief, seated breaks over long walks.',
      ],
    },
    {
      title: 'Rishikesh & surrounds (if you have time)',
      items: [
        'Who this suits: Patients/attendants with spare days seeking calm by the Ganges. Best in Oct–Apr.',
        'Distance/Time: ~235 km / ~6 hours by road from Delhi under good conditions; many choose 1–2 nights for comfort.',
        'Add-ons: Haridwar (evening aarti), Mussoorie (needs extra nights).',
        'Tips: Pick river-facing hotels with elevators; plan gentle aarti viewing instead of long walks.',
      ],
    },
    {
      title: 'Jungle places',
      items: [
        'Sariska Tiger Reserve (Alwar, Rajasthan): Feasible as a long day trip or 1 night. ~185–190 km, ~3–4.5 hours one-way depending on route/traffic. Book safaris on official portals; core zones typically reopen after monsoon (around Oct). Carry hats, ORS; avoid midday heat.',
      ],
    },
    {
      title: 'Forts & royal cities — easy by flight',
      items: [
        'Jaipur (Amber Fort, City Palace, Hawa Mahal): Non-stop from Delhi (~45–70 min). Great for 1–2 nights; accessible sightseeing with car support.',
        'Udaipur (City Palace, Lake Pichola): Non-stop from Delhi (~1 h 25 m). Best as 2–3 nights; lakeside hotels often have elevators and boat piers with handrails.',
      ],
    },
    {
      title: 'Where to eat (easy access, varied cuisines)',
      items: [
        'Golf Course Road — Two Horizon Center: Comorin (elevator access; modern Indian).',
        'DLF CyberHub: Promenade with dozens of sit-down restaurants/cafés; easy parking/valet.',
        'Worldmark Gurugram (Sec-65) & Aerocity Worldmark: Multiple indoor clusters; ramps/elevators.',
        'Ambience Mall (Gurugram): Food courts + seated dining; lifts/ramps throughout.',
        '32nd Avenue (32 Milestone), Sector 15: Curated gourmet courtyard with marquee restaurants; ideal for evening dining with short walks.',
        'Old Delhi: Prefer seated, air-conditioned eateries just off the main bazaar to avoid long standing.',
      ],
    },
    {
      title: 'Accessibility & comfort',
      items: [
        'Wheelchair focus: Lodhi Garden (flat), Sunder Nursery (flatter), malls/Worldmarks (lifts), Red Fort/Old Delhi with rickshaw assistance near gates.',
        'Health tips: ORS, hats/UV umbrellas, N95/FFP2 on poor-air days; 15-min rest every hour; pause/return if fatigued.',
      ],
    },
    {
      title: 'Tickets, timings & closures (always check day-of)',
      items: [
        'ASI sites (Qutub Minar, Red Fort, Humayun’s Tomb): Daylight hours with e-ticketing options.',
        'Sunder Nursery: Early-morning to late-evening entry (ticketed).',
        'Akshardham: Tue–Sun, last entry around 6:30 pm, closed Mondays.',
        'Sultanpur/Sariska: Wildlife zones close during monsoon; seasonal reopening usually around Oct.',
      ],
    },
    {
      title: 'Gentle reminder',
      body: [
        'These are optional local experiences to enhance your stay. Plans should be timed to treatment cycles and energy levels. AOHC does not charge or earn commissions; bookings are made directly with verified vendors.',
      ],
    },
  ],
}

/* ── Airport Pickup & Local Travel ─────────────────────────────────────── */
export const airportPickup: ArticlePageContent = {
  hero: {
    title: 'Logistics & Local Support',
    body: [
      'We make your arrival and stay in India seamless—from airport welcome and hotel transfers to all transport required for your treatment.',
    ],
  },
  lead: [
    'This page uses exact patient-facing language approved by the AOHC team. If you need this text in another language, our coordinators can assist.',
  ],
  sections: [
    {
      title: 'Airport Arrival & Hotel Transfer',
      body: [
        'From the moment you land in Delhi, a comfortable car with a courteous, experienced driver will be ready to receive you and your family. Our representative will be present in the arrivals area holding a placard with your name and the Art of Healing Cancer logo, making it easy to connect. You will then be safely escorted to your hotel, where our coordination team supports a smooth check-in and a restful start to your journey.',
      ],
      items: ['Airport pickup', 'Placard meet & greet', 'Escort to hotel', 'Check-in coordination'],
    },
    {
      title: 'Optional Airport Meet & Greet (Encalm Atithya)',
      body: [
        'If you would like additional assistance right from the aircraft gate, you can optionally book the Encalm Atithya Meet & Greet service. Trained airport staff will escort you from the aircraft gate to the terminal exit—assisting with immigration and customs, luggage collection, and smooth passage through the terminal. At the exit, our AOHC team will be waiting with your car and driver.',
      ],
      items: ['Gate-to-exit assistance', 'Immigration & customs', 'Luggage handling help'],
    },
    {
      title: 'Local Transport for Treatment (Included)',
      body: [
        'All transportation related to your medical care is managed by the Art of Healing Cancer team. This includes travel between your hotel and our hospital; visits to diagnostic centers and laboratories for tests and imaging; and trips to any specialized facilities in the city for scheduled interventions. Our goal is for you to focus entirely on healing while we handle the logistics.',
      ],
    },
    {
      title: 'Personal Travel (Not Included)',
      body: [
        'If you wish to explore the city or make personal visits beyond your treatment schedule, we’re happy to help with recommendations or arranging trusted local taxis and ride-hailing services such as Uber. Personal travel costs are borne by the patient.',
      ],
    },
    {
      title: 'Quick Summary',
      body: ['What AOHC covers vs. what you cover.'],
      table: {
        head: ['Service', 'Included by AOHC', 'Optional / Patient-paid'],
        rows: [
          ['Airport pickup to hotel (placard meet)', '✔ Yes', '—'],
          ['Gate-to-exit assistance (immigration, luggage)', '—', 'Encalm Atithya Meet & Greet (optional)'],
          ['Hotel ⇄ Hospital transfers for appointments', '✔ Yes', '—'],
          ['Hotel ⇄ Diagnostics / specialized facilities', '✔ Yes', '—'],
          ['Personal sightseeing or non-medical trips', '—', 'Uber / Taxi (patient-paid)'],
        ],
      },
    },
    { title: 'FAQs' },
    {
      title: 'How will I find your representative at the airport?',
      level: 3,
      body: [
        'Our representative will be in the arrivals area holding a placard with your name and the Art of Healing Cancer logo. If you have any difficulty connecting, your coordinator’s phone/WhatsApp number is provided in advance.',
      ],
    },
    {
      title: 'Can you help me book the Encalm service?',
      level: 3,
      body: [
        'Yes, we can guide you on the process, or you may book directly on the Encalm Atithya website. Please share your flight details with us so we can align timing at the terminal exit.',
      ],
    },
    {
      title: 'Is local treatment transport available on weekends?',
      level: 3,
      body: ['Yes. Your schedule determines the service window. We’ll confirm pickup times for each appointment in your daily plan.'],
    },
    {
      title: 'Disclaimer',
      body: [
        'This page outlines standard logistics support. Variations may apply based on clinical requirements, security protocols at the airport, or city-wide advisories. Your coordinator will confirm specifics prior to arrival.',
      ],
    },
  ],
}

/* ── Medical Visa for India ────────────────────────────────────────────── */
export const medicalVisa: ArticlePageContent = {
  hero: {
    title: 'Medical Visa for India',
    body: ['A simple, guided two-step process for international patients traveling to AOHC.'],
  },
  sections: [
    {
      title: 'Is a Medical Visa Mandatory?',
      body: [
        'Yes. A Medical Visa is mandatory for every international patient who wishes to travel to India for treatment at Art of Healing Cancer (AOHC). Our team ensures the entire process is simple, guided, and stress-free for you and your family.',
      ],
    },
    {
      title: 'Your Problems Are Taken Care of by Art of Healing Cancer',
      body: [
        'From preparing the medical invitation letter to helping you apply for visa extension, AOHC handles every step. We coordinate directly with the authorities and guide you at each stage—so you can focus entirely on your health and recovery.',
      ],
    },
    { title: 'Medical Visa Process — A Simple Two-Step Journey' },
    {
      title: 'Step 1: Medical Invitation Letter (Government of India)',
      level: 3,
      body: [
        'The AOHC team applies for the Medical Invitation Letter issued by the Government of India. This is the first and most important step before applying for your visa and takes 1 working day once all required documents are received.',
        'Required Documents from Patient Side (for each traveler — patient and caregiver):',
      ],
      items: ['Passport copy (front and back)', 'Passport-size photograph', 'Filled visa request form shared by AOHC'],
      outro: ['Each person traveling must submit their own copies. Once received, AOHC initiates the invitation request.'],
    },
    {
      title: 'Step 2: Applying for the Medical Visa',
      level: 3,
      body: [
        'As mentioned in Step 1, once the Government of India Medical Invitation Letter is issued (usually within 24 working hours of submission), the AOHC team assists you in applying for the Medical Visa. The visa approval typically takes 7–8 working days.',
        'Total Estimated Time: ~10–11 days from receipt of complete documents (1 day invitation + 7–8 days visa approval).',
      ],
    },
    {
      title: 'Visa Validity & Extension',
      items: [
        'The Medical Visa is issued for 60 days from your date of arrival.',
        'If your treatment requires a longer stay, AOHC will apply for your visa extension via FRRO.',
        'AOHC’s admin team manages all paperwork and appointments for the extension.',
      ],
    },
    {
      title: 'Key Highlights',
      items: [
        'AOHC applies for the Government of India Medical Invitation Letter and supports visa filing.',
        'Typical timeline: ~10–11 days total.',
        'Initial visa validity: 60 days from entry, extendable via FRRO.',
        'Assistance for both patient and accompanying family/caregivers.',
      ],
    },
    {
      title: 'Summary Table',
      table: {
        head: ['Item', 'Details'],
        rows: [
          ['Step 1', 'AOHC applies for Medical Invitation Letter. (~1 working day)'],
          ['Step 2', 'As mentioned in Step 1, after the invitation letter, AOHC assists with Medical Visa application. (~7–8 working days)'],
          ['Total Time', '~10–11 days from receipt of documents.'],
          ['Documents', 'Passport (front/back), photo, AOHC form.'],
          ['Validity', '60 days from entry into India.'],
          ['Extension', 'Handled by AOHC via FRRO.'],
        ],
      },
      outro: ['Timelines may vary by nationality, embassy workload, or holidays.'],
    },
    { title: 'Quick FAQs' },
    {
      title: 'Is a Medical Visa mandatory?',
      level: 3,
      body: ['Yes, it is required for all international patients coming to AOHC.'],
    },
    {
      title: 'How long does the full process take?',
      level: 3,
      body: ['Typically 10–11 days total (1 day invitation + 7–8 days visa approval).'],
    },
    {
      title: 'What if my treatment exceeds 60 days?',
      level: 3,
      body: ['AOHC applies for a visa extension via FRRO on your behalf.'],
    },
    {
      title: 'Important Disclaimer',
      body: [
        'Visa issuance and validity are at the discretion of the Government of India. AOHC provides documentation and process support but cannot guarantee approval or timelines in cases of embassy backlogs or compliance issues.',
      ],
      outro: ['© Art of Healing Cancer — Patient Logistics • Medical Visa. All information provided for patient assistance only.'],
    },
  ],
}

/** For the blog index and the routes — path, card title and summary. */
export const internationalGuides = [
  { slug: 'payments-and-invoices', href: '/payments-and-invoices', title: 'Invoicing & Payments', content: paymentsAndInvoices,
    summary: 'When invoices are issued, how to pay from your home country, card and transfer fees, and how the final invoice works before you fly home.' },
  { slug: 'accommodation', href: '/accommodation', title: 'Recommended Partner Hotels for Our Patients', content: accommodation,
    summary: 'Two Hilton properties close to our Gurugram centre, with hospital-managed commute and diet support, and how to book them.' },
  { slug: 'india-phone-sim', href: '/india-phone-sim', title: 'Local Phone SIM & Communication', content: indiaPhoneSim,
    summary: 'Roam on your home SIM or get a local Indian SIM for the length of your medical visa — what it costs and how our team sets it up.' },
  { slug: 'cash-to-carry', href: '/insight/cash-to-carry', title: 'Local Currency & Cash to Carry', content: cashToCarry,
    summary: 'What currency to bring, where to exchange it into INR, where cash is handy, and how cards and ATMs work in India.' },
  { slug: 'local-sight-seeing-shopping', href: '/insight/local-sight-seeing-shopping', title: 'Local Sightseeing from AOHC, Sector 51 (Gurugram)', content: localSightseeing,
    summary: 'Gentle, accessible outings in Gurugram and Delhi between treatment days, with travel times, half-day plans and places to eat.' },
  { slug: 'airport-pickup-and-local-travel', href: '/insight/airport-pickup-and-local-travel', title: 'Logistics & Local Support', content: airportPickup,
    summary: 'Airport meet and greet, hotel transfers and all treatment-related transport arranged by AOHC — and what is not included.' },
  { slug: 'medical-visa-for-india', href: '/insight/medical-visa-for-india', title: 'Medical Visa for India', content: medicalVisa,
    summary: 'The two-step medical visa process for international patients: invitation letter, visa application, timelines and extension via FRRO.' },
] as const
