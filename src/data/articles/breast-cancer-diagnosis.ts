import type { ArticlePageContent } from '@/types'

/**
 * BREAST CANCER DIAGNOSIS — RADIOLOGY
 * ----------------------------------------------------------------------------
 * Migrated from https://artofhealingcancer.com/breast-cancer-diagnosis/
 * and kept at that URL. Transcribed verbatim.
 *
 * ⚠️  THE SOURCE PAGE IS INCOMPLETE AND THE GAP IS VISIBLE TO A READER. It
 * sets out four radiology methods as headings — Mammogram, Ultrasound,
 * MRI, CECT — and then writes four paragraphs that cover mammogram,
 * ultrasound and MRI. CECT IS NEVER MENTIONED AGAIN. The heading on the
 * live page leads to nothing.
 *
 * Rendering four promised methods and explaining three would leave a
 * reader scrolling for a section that does not exist, so the methods are
 * carried as a short list of what the page covers and the prose follows as
 * written. CECT stays in the list because removing it would be editing
 * AOHC's clinical content rather than laying it out; it needs a paragraph,
 * and only a clinician can write it.
 *
 * ⚠️  BIRADS IS NAMED AND NOT EXPLAINED. "BIRADS system of classification
 * categories a breast lump according to the probability of it being
 * malignant" is the whole of it, and the next paragraph assumes the reader
 * knows what a BIRADS score is. On a page written for patients that is a
 * gap worth filling.
 *
 * ⚠️  THIS IS THE SHORTEST ARTICLE OF THE SEVEN — four paragraphs. It is
 * published as found rather than padded.
 */
export const breastCancerDiagnosis: ArticlePageContent = {
  hero: {
    title: 'Radiology Methods for Breast Cancer Diagnosis',
    body: [
      'In Breast Cancer Radiology plays an important role in screening, diagnosis, evaluation of Breast cancer etc.',
      'The first investigation advised after a breast lump is confirmed on clinical examination is mammogram for women of age 40 years and above, and ultrasound for women less than 40 years.',
    ],
  },

  lead: [
    'In Breast Cancer Radiology plays an important role in screening, diagnosis, evaluation of Breast cancer etc.',
  ],

  sections: [
    {
      title: 'Radiology methods for breast cancer diagnosis',
      items: ['Mammogram', 'Ultrasound', 'MRI', 'CECT'],
    },

    {
      body: [
        'The first investigation advised after a breast lump is confirmed on clinical examination is mammogram for women of age 40yrs and above; & Ultrasound for women less than 40 yrs. Mammogram is a X ray of the breast, in younger age women the breast density is high because of the presence of milk ductal tissue which undergoes atrophy with age.',
        'BIRADS system of classification categories a breast lump according to the probability of it being malignant.',
        'MRI is helpful to ascertain the correct BIRADS score in case the Mammogram and Ultrasound are not able to reach to a definitive conclusion.',
        'Also it is more sensitive in detecting any suspicious lesion in any other part or quadrant of ipsilateral or contralateral breast. Henceforth it is recommended to determine the eligibility for breast conservation.',
      ],
    },
  ],
}
