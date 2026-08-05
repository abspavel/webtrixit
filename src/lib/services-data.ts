
import {
  Rocket, ShoppingCart, GraduationCap, Code2, Layers, Cpu, Server,
  Video, Facebook, Target, Palette, type LucideIcon,
  Search, ShieldCheck, Heart, Sparkles, UserCheck, Stethoscope
} from "lucide-react";

export type ServiceItem = {
  slug: string;
  icon: LucideIcon;
  title: string;
  titleBn: string;
  subject: string;
  desc: string;
  tagline: string;
  why: string[];
  effectiveness: string[];
  benefits: string[];
  useCases: string[];
  process: { title: string; desc: string }[];
  features: string[];
  demoUrl: string;
  demoLabel: string;
};

export const services: ServiceItem[] = [
  {
    slug: "skin-consultation",
    icon: Search,
    title: "Skin Consultation",
    titleBn: "স্কিন কনসালটেশন",
    subject: "Skin Consultation",
    desc: "Expert dermatological analysis to identify your skin's unique needs and concerns.",
    tagline: "The first step toward a radiant glow starts with understanding your skin.",
    why: [
      "Generic products often fail because they don't target your specific skin type or underlying issues.",
      "A professional consultation identifies sensitivity, dehydration, or conditions you might miss.",
      "Receive a data-driven routine that saves you time and money on ineffective products."
    ],
    effectiveness: [
      "Visual assessment using high-definition imaging technology.",
      "Personalized history review covering lifestyle, diet, and environment.",
      "Diagnostic approach to identify acne, hyperpigmentation, or early signs of aging."
    ],
    benefits: [
      "Customized roadmap for long-term skin health.",
      "Prevention of irreversible damage through early detection.",
      "Expert guidance on ingredient compatibility and usage."
    ],
    useCases: [
      "Stubborn acne concerns",
      "Signs of premature aging",
      "Chronic skin sensitivity",
      "Establishing a base routine"
    ],
    process: [
      { title: "Deep Scan", desc: "We use clinical imaging to look beneath the surface of your skin." },
      { title: "Personal History", desc: "Our specialists discuss your lifestyle and current product usage." },
      { title: "Goal Setting", desc: "We define realistic milestones for your skin transformation." },
      { title: "Prescription", desc: "Receive a curated list of products and treatments specifically for you." },
      { title: "Follow-up Plan", desc: "A 3-month roadmap to track progress and adjust your routine." }
    ],
    features: [
      "HD Skin Analysis",
      "Certified Dermatologist Review",
      "Personalized Routine Builder",
      "Ingredient Sensitivity Report",
      "3-Month Progress Tracker",
      "Priority Treatment Booking",
      "Direct Specialist Chat"
    ],
    demoUrl: "/demo/skin-analysis",
    demoLabel: "View Sample Analysis"
  },
  {
    slug: "skin-care-products",
    icon: ShoppingCart,
    title: "Skin Care Products",
    titleBn: "স্কিন কেয়ার প্রোডাক্টস",
    subject: "Skin Care Products",
    desc: "Premium, clinically-tested formulas designed to nourish, protect, and rejuvenate.",
    tagline: "Science-backed formulas for the skin you deserve.",
    why: [
      "Mass-market products often contain harsh fillers that damage the skin barrier over time.",
      "Our products use high-potency actives like stabilized Vitamin C, Niacinamide, and Peptides.",
      "Every formula is pH-balanced and dermatologically tested for maximum safety."
    ],
    effectiveness: [
      "Bio-available ingredients that penetrate deeper into the epidermis.",
      "Synergistic formulations where ingredients enhance each other's performance.",
      "Rigorous clinical trials showing visible results in 28 days."
    ],
    benefits: [
      "Visible improvement in texture and tone.",
      "Stronger skin barrier resistant to environmental stressors.",
      "Healthy, natural glow without reliance on heavy makeup."
    ],
    useCases: [
      "Daily maintenance routines",
      "Targeted spot treatments",
      "Sun protection and recovery",
      "Post-procedural healing"
    ],
    process: [
      { title: "R&D Formulation", desc: "Years of laboratory research go into every single drop." },
      { title: "Ingredient Sourcing", desc: "We only use premium, sustainable ingredients from ethical sources." },
      { title: "Clinical Testing", desc: "Independent dermatologists verify every claim we make." },
      { title: "Fresh Batch Production", desc: "Small-batch manufacturing ensures maximum potency when it reaches you." },
      { title: "Eco-Friendly Packaging", desc: "Sustainable glass and airless pumps to protect active ingredients." }
    ],
    features: [
      "Paraben & Sulfate Free",
      "Cruelty-Free Formulas",
      "Airless Pump Technology",
      "Stabilized Actives",
      "pH-Balanced 5.5",
      "Recyclable Packaging",
      "Subscription Savings",
      "Free Nationwide Shipping"
    ],
    demoUrl: "/demo/product-range",
    demoLabel: "Browse Collection"
  },
  {
    slug: "anti-aging-treatment",
    icon: Sparkles,
    title: "Anti-Aging Treatment",
    titleBn: "এন্টি-এজিং ট্রিটমেন্ট",
    subject: "Anti-Aging Treatment",
    desc: "Non-invasive, advanced procedures to restore elasticity and smooth out fine lines.",
    tagline: "Age gracefully with technology that turns back the clock.",
    why: [
      "Collagen production drops by 1% every year after 25; our treatments stimulate natural regrowth.",
      "Topical creams can only do so much; clinical treatments reach the dermis layer.",
      "Safe, quick, and effective with minimal to no downtime."
    ],
    effectiveness: [
      "Micro-needling and Radio Frequency to stimulate deep collagen synthesis.",
      "Laser resurfacing to remove sun damage and uneven pigmentation.",
      "Hydra-facial technology to deep-clean and plump the skin simultaneously."
    ],
    benefits: [
      "Smoother, firmer skin texture.",
      "Reduction in fine lines and deep wrinkles.",
      "Lifted appearance without the need for surgery."
    ],
    useCases: [
      "Loss of skin elasticity",
      "Crows feet and forehead lines",
      "Age spots and sun damage",
      "Prevention for late 20s"
    ],
    process: [
      { title: "Clinical Assessment", desc: "We map your facial structure and identify areas needing lifting." },
      { title: "Deep Cleansing", desc: "Preparation to ensure maximum treatment efficacy." },
      { title: "Advanced Procedure", desc: "Administered by certified medical professionals using state-of-the-art tools." },
      { title: "Soothing Recovery", desc: "Post-treatment masks and LED therapy to accelerate healing." },
      { title: "Home Care Support", desc: "Specific products to maintain and enhance clinical results." }
    ],
    features: [
      "FDA-Approved Technology",
      "Certified Medical Staff",
      "Zero-Downtime Options",
      "Painless Procedures",
      "Collagen Mapping",
      "Customized Treatment Cycles",
      "LED Photo-Therapy Included"
    ],
    demoUrl: "/demo/anti-aging-results",
    demoLabel: "See Before/After"
  },
  {
    slug: "dermatological-care",
    icon: Stethoscope,
    title: "Dermatological Care",
    titleBn: "ডার্মাটোলজিক্যাল কেয়ার",
    subject: "Dermatological Care",
    desc: "Medical-grade solutions for complex skin conditions like acne, eczema, and psoriasis.",
    tagline: "Your health is our priority. Expert care for complex skin.",
    why: [
      "Chronic conditions require medical expertise, not just cosmetic products.",
      "Our dermatologists treat the root cause, not just the symptoms.",
      "Evidence-based medicine tailored to your body's specific response."
    ],
    effectiveness: [
      "Prescription-strength ingredients combined with clinical protocols.",
      "Holistic approach addressing inflammation from the inside out.",
      "Continuous monitoring to manage flare-ups and maintain remission."
    ],
    benefits: [
      "Relief from chronic pain and irritation.",
      "Improved self-confidence through clearer skin.",
      "Reduced scarring and long-term damage."
    ],
    useCases: [
      "Severe cystic acne",
      "Eczema and Psoriasis flare-ups",
      "Rosacea and redness",
      "Unidentified skin rashes"
    ],
    process: [
      { title: "Medical Diagnosis", desc: "Thorough examination to identify the specific dermatological condition." },
      { title: "Laboratory Tests", desc: "If needed, we perform allergy or biopsy tests for absolute certainty." },
      { title: "Targeted Therapy", desc: "Personalized medical plan including prescriptions and in-clinic care." },
      { title: "Bi-Weekly Monitoring", desc: "Closely tracking response to medication and adjusting dosages." },
      { title: "Maintenance Phase", desc: "Developing a long-term strategy to prevent recurrence." }
    ],
    features: [
      "Medical Grade Prescriptions",
      "Expert Dermatologists",
      "Emergency Appointment Slots",
      "Scar Management Programs",
      "Dietary Guidance Integration",
      "Family Skin History Review",
      "Safe for Sensitive Skin"
    ],
    demoUrl: "/demo/clinical-success",
    demoLabel: "Clinical Success Cases"
  }
];
