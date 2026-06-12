import { Partner } from "@/types/wecredit";
import { IMAGES } from "./images";
import { Testimonial } from "@/components/home/testimonials-section";
import { GlobalLink } from "@/types/strapi";

/**
 * Cache revalidation times for different data types
 * Optimized to reduce Vercel function costs while maintaining data freshness
 */
export const CACHE_TIMES = {
  HOUR_24: 86400, // 24 hours
  HOUR_1: 3600, // 1 hour
  MINUTE_5: 300, // 5 minutes

  STATIC_PAGES: 3600, // 1 hour
} as const;

/**
 * List of all partner logos
 * Images should be placed in /public/assets/images/partners/
 */
export const PARTNERS: Partner[] = [
  { name: "MoneyView", logo: `${IMAGES.PARTNERS.BASE_PATH}/moneyview.png` },
  { name: "KreditBee", logo: `${IMAGES.PARTNERS.BASE_PATH}/KB.png` },
  { name: "L&T Finance", logo: `${IMAGES.PARTNERS.BASE_PATH}/L&T.png` },
  { name: "Olyv", logo: `${IMAGES.PARTNERS.BASE_PATH}/OLYV.png` },
  { name: "Zype", logo: `${IMAGES.PARTNERS.BASE_PATH}/ZYPE.png` },
  { name: "mPokket", logo: `${IMAGES.PARTNERS.BASE_PATH}/MPOKKET.png` },
  {
    name: "Hero Fincorp",
    logo: `${IMAGES.PARTNERS.BASE_PATH}/HERO FINCORPV.png`,
  },
  {
    name: "Poonawalla Fincorp",
    logo: `${IMAGES.PARTNERS.BASE_PATH}/Poonawala fincorp.png`,
  },
  { name: "Ram Fincorp", logo: `${IMAGES.PARTNERS.BASE_PATH}/Ram fincorp.png` },
  { name: "Creditt+", logo: `${IMAGES.PARTNERS.BASE_PATH}/creditt.png` },
  { name: "True Balance", logo: `${IMAGES.PARTNERS.BASE_PATH}/truebalance.png` },
  {
    name: "Chintamani Finlease",
    logo: `${IMAGES.PARTNERS.BASE_PATH}/chintamani finlease.png`,
  },
  { name: "FLot", logo: `${IMAGES.PARTNERS.BASE_PATH}/Flot.png` },
  { name: "TrustPaisa", logo: `${IMAGES.PARTNERS.BASE_PATH}/Trust Paisa.png` },
  {
    name: "LendingPlate",
    logo: `${IMAGES.PARTNERS.BASE_PATH}/lending plate.png`,
  },
  { name: "FDPL Finance", logo: `${IMAGES.PARTNERS.BASE_PATH}/FDPL.png` },
  {
    name: "Salary On Time",
    logo: `${IMAGES.PARTNERS.BASE_PATH}/Salary on time.png`,
  },
  {
    name: "Emergency Paisa",
    logo: `${IMAGES.PARTNERS.BASE_PATH}/emergency paisa.png`,
  },
  { name: "BrightLoans", logo: `${IMAGES.PARTNERS.BASE_PATH}/Bright loans.png` },
  { name: "FatakPay", logo: `${IMAGES.PARTNERS.BASE_PATH}/FATAK PAY.png` },
  { name: "Dhanvarsha", logo: `${IMAGES.PARTNERS.BASE_PATH}/dhanvarsha.png` },
  { name: "Fatafat", logo: `${IMAGES.PARTNERS.BASE_PATH}/fatafat.png` },
  { name: "Loan Bazaar", logo: `${IMAGES.PARTNERS.BASE_PATH}/loan_bazaar.png` },
  { name: "TezCredit", logo: `${IMAGES.PARTNERS.BASE_PATH}/tezcredit.png` },
  { name: "Cashvia", logo: `${IMAGES.PARTNERS.BASE_PATH}/cashvia.png` },
  { name: "Branch", logo: `${IMAGES.PARTNERS.BASE_PATH}/branch.png` },
];


/**
 * Split partners into rows for the marquee display
 */
export const ROW_1_PARTNERS = PARTNERS.slice(0, 7);
export const ROW_2_PARTNERS = PARTNERS.slice(7, 14);
export const ROW_3_PARTNERS = PARTNERS.slice(14, 21);

/** Static testimonials data */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Rohit Sharma',
    subtitle: 'Software Engineer • Bengaluru, Karnataka',
    quote: 'TrustFin made the loan process surprisingly simple. Funds arrived quickly, and the entire experience felt transparent and stress-free.',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Pooja Verma',
    subtitle: 'Teacher • Jaipur, Rajasthan',
    quote: 'Mujhe emergency mein paise chahiye the. TrustFin ne bina zyada documents ke fast approval de diya.',
    rating: 4,
  },
  {
    id: 'testimonial-3',
    name: 'Aman Gupta',
    subtitle: 'Sales Executive • Noida, Uttar Pradesh',
    quote: 'The application process was smooth and easy. Customer support guided me throughout and answered every question patiently.',
    rating: 5,
  },
  {
    id: 'testimonial-4',
    name: 'Neha Patel',
    subtitle: 'Freelance Designer • Ahmedabad, Gujarat',
    quote: 'TrustFin se loan lena kaafi easy raha. Sab kuch online hua aur approval expected time se pehle mil gaya.',
    rating: 4,
  },
  {
    id: 'testimonial-5',
    name: 'Sandeep Yadav',
    subtitle: 'Business Owner • Lucknow, Uttar Pradesh',
    quote: 'I needed urgent funds for my business. TrustFin offered a quick solution with clear terms and no confusion.',
    rating: 5,
  },
  {
    id: 'testimonial-6',
    name: 'Kavita Singh',
    subtitle: 'HR Manager • Pune, Maharashtra',
    quote: 'Bahut achha experience raha. Process simple tha, updates timely milte rahe aur loan amount jaldi receive hua.',
    rating: 4,
  },
  {
    id: 'testimonial-7',
    name: 'Vikram Mehta',
    subtitle: 'Marketing Professional • Indore, Madhya Pradesh',
    quote: 'TrustFin helped me manage an unexpected expense. The entire journey was smooth, reliable, and completely hassle-free.',
    rating: 5,
  },
  {
    id: 'testimonial-8',
    name: 'Ritika Arora',
    subtitle: 'Chartered Accountant • Chandigarh',
    quote: 'TrustFin ne mujhe financial emergency mein support kiya. Fast processing aur professional service ne kaafi impress kiya.',
    rating: 4,
  },
];


export const UNITY_CONSENT = `I hereby give my consent to Unity Small Finance Bank Limited. as lender to collect, store and verify my credit report from Credit Bureaus and KYC details for the processing of my loan application and contact me through SMS / WhatsApp / Call with reference to my loan application.`

// Dedicated partner terms route for multi-lender consent UI.
export const MULTILENDER_PARTNER_TERMS_HREF = '/partner-terms-and-conditions';
export const BRAND_NAME = 'TrustFin.ai';


export const HEADER_LINKS: GlobalLink[] = [
  { id: 1, order: 1, label: 'Home', url: '/', openInNewTab: false, children: [] },
  // { id: 3, order: 3, label: 'Credit Cards', url: '/credit-cards', openInNewTab: false, children: [] },
];