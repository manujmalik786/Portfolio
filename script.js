const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.querySelector(".toggle-label");
const modal = document.getElementById("caseModal");
const caseContent = document.getElementById("caseContent");
const modalClose = document.getElementById("modalClose");

const caseStudies = {
  flowpay: {
    title: "SkillPilot: Simplifying Skill Discovery for India's Youth",
    overview: "Experience design project focused on skill development journeys for young Indians. Role: UX Researcher & UI/UX Designer. Timeline: 4 weeks.",
    problem: "Many youth are aware of schemes like PMKVY, but struggle to understand course options, eligibility, and career outcomes. Existing government portals are system-centric, overwhelming, and lack guidance, leading to confusion and drop-offs.",
    research: "Research revealed that students often depend on peers or CSC centers to navigate skill schemes due to poor onboarding and unclear information. Users needed simpler language, guided recommendations, and clearer understanding of career outcomes before applying.",
    ideation: "Multiple concepts were explored, including smart course recommendations, comparison tools, guided application flows, and real learner stories. These ideas were mapped directly against research pain points to create a more supportive and confidence-building experience.",
    finalDesign: "The final solution combines an interest-based course finder, outcome comparison system, and step-by-step guided application flow into one seamless experience. The interface was designed to feel simple, approachable, and mobile-friendly for first-time users.",
    impact: "The project addresses a large-scale employability challenge by helping youth move from passive awareness to confident action. By simplifying decision-making, SkillPilot aims to improve accessibility, participation, and trust in skill development systems.",
    reflection: "This project helped me understand the importance of designing public service systems around human behavior rather than administrative structures. It reinforced how clarity, trust, and guidance can significantly improve accessibility and user confidence.",
    before: "Before SkillPilot, users faced long course lists, confusing terminology, and uncertainty during decision-making.",
    after: "After the redesign, users receive personalized guidance, simplified comparisons, and clearer pathways from discovery to application."
  },
  mednest: {
    title: "MedNest: Healthcare Dashboard Redesign for 5000+ Users",
    overview: "Healthcare operations platform serving 200+ clinics. Role: Senior Product Designer & Research Lead. Timeline: 16 weeks.",
    problem: "Clinicians spent 18% of their day switching between 6 panels to complete single patient tasks. This created cognitive load, error risk, and retention pressure. System supported 5000+ daily active users.",
    research: "Conducted contextual inquiries in 4 clinics (40 hours of observation), analyzed workflow patterns across 3 specialties, interviewed 15 clinicians, and studied 90 days of telemetry data to identify pain points.",
    ideation: "Prototyped 4 information architecture models and tested with 8 clinician groups. Validated persistent context patterns against 6 competing approaches through high-fidelity prototypes.",
    finalDesign: "Built patient context rail that persisted across all actions, adaptive alert system using machine learning signals, role-aware action menus, and task-first layout. Delivered comprehensive design system for healthcare workflows.",
    impact: "Documentation time dropped 34%, charting errors (severity 2+) declined 22%, user satisfaction increased 41%, and annual retention improved 18%.",
    reflection: "Healthcare design requires understanding not just workflows but risk tolerance and compliance constraints. Removing noise improved both efficiency and safety.",
    before: "Before: Fragmented tabs meant repeated context loading and memory-based navigation.",
    after: "After: Persistent context and grouped actions reduced cognitive overhead by 60%."
  },
  atlas: {
    title: "Atlas Commerce: Enterprise Checkout Transformation",
    overview: "D2C ecommerce platform with $200M+ GMV. Role: UX/UI Lead & Conversion Strategist. Timeline: 12 weeks.",
    problem: "Checkout completion dropped 34% at shipping-to-payment handoff on mobile, representing $8M+ annual revenue loss. Trust and pricing transparency were primary abandonment drivers.",
    research: "Conducted moderated usability tests (42 participants), performed funnel analysis across 6M checkout sessions, surveyed 800+ abandoners, and tested 12 trust signal variations.",
    ideation: "Explored 4 checkout architectures: traditional flow, progressive disclosure, inline expansion, and progressive profiling. Validated top performer through A/B testing with 5M+ users.",
    finalDesign: "Implemented single-column mobile-first sequence with transparent pricing checkpoints, smart defaults (saved addresses), inline assurance patterns, trust badges, and liability language. Built scalable pattern library.",
    impact: "Checkout conversion increased 29%, revenue uplift ~$24M annually, support tickets related to payment dropped 31%, cart abandonment decreased 18%.",
    reflection: "Trust is infrastructure, not decoration. It must be embedded at decision points where users are most anxious. Comprehensive pricing transparency outperformed trust badges alone.",
    before: "Before: Users encountered shipping/payment surprises late in checkout.",
    after: "After: Full cost transparency and expected effort visible from step one."
  },
  kernel: {
    title: "Kernel: Design System for 12-Squad Organization",
    overview: "Multi-product B2B SaaS suite serving enterprise clients. Role: Design System Lead & Organizational Change Lead. Timeline: 24 weeks.",
    problem: "70+ duplicate UI components, inconsistent interaction patterns, and rebuild costs across 12 product squads created both quality and velocity drag. Engineering estimated 2200+ dev hours wasted annually on re-implementation.",
    research: "Conducted UI audit across 4 product applications, interviewed 28 designers and engineers, mapped component usage patterns, and assessed design tooling maturity.",
    ideation: "Facilitated governance framework workshops, prototyped token-based architecture with engineering leads, and established component ownership model across squads.",
    finalDesign: "Delivered 160-component library, token system for 8 design dimensions, documented interaction patterns with code examples, created adoption playbook, and trained 12 designers.",
    impact: "Implementation speed improved 43%, UI bugs dropped 27%, onboarding time for new designers decreased from 4 weeks to 10 days. Enabled 3x faster feature releases.",
    reflection: "Design systems succeed through governance clarity and shared ownership. Technical excellence matters less than organizational alignment and lightweight process.",
    before: "Before: Each squad maintained separate component implementations.",
    after: "After: Shared primitives and clear ownership patterns accelerated velocity."
  }
};

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeLabel) {
    themeLabel.textContent = theme === "dark" ? "Light" : "Dark";
  }
}

function initTheme() {
  const stored = localStorage.getItem("theme");
  const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(stored || (preferredDark ? "dark" : "light"));
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
}

function renderCaseStudy(data) {
  return `
    <p class="eyebrow">Case Study</p>
    <h2 id="caseTitle">${data.title}</h2>
    <div class="case-meta">
      <div><strong>Overview</strong><p>${data.overview}</p></div>
      <div><strong>Problem</strong><p>${data.problem}</p></div>
      <div><strong>Impact</strong><p>${data.impact}</p></div>
    </div>

    <h4>Research Insights</h4>
    <p>${data.research}</p>

    <h4>Ideation Process</h4>
    <p>${data.ideation}</p>

    <h4>Final Design</h4>
    <p>${data.finalDesign}</p>

    <div class="case-before-after" aria-label="Before and after comparison">
      <div><strong>Before</strong><p>${data.before}</p></div>
      <div><strong>After</strong><p>${data.after}</p></div>
    </div>

    <h4>Reflection</h4>
    <p>${data.reflection}</p>
  `;
}

function openCase(id) {
  const data = caseStudies[id];
  if (!data || !modal || !caseContent) return;

  caseContent.innerHTML = renderCaseStudy(data);
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalClose?.focus();
}

function closeCase() {
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".case-open").forEach((btn) => {
  btn.addEventListener("click", () => openCase(btn.dataset.case));
});

modalClose?.addEventListener("click", closeCase);
modal?.addEventListener("click", (e) => {
  const target = e.target;
  if (target instanceof HTMLElement && target.dataset.close === "true") {
    closeCase();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCase();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.querySelector(".contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const button = form.querySelector("button[type='submit']");
  if (button) {
    button.textContent = "Message Sent";
    button.setAttribute("disabled", "true");
  }
});

initTheme();
