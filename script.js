const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.querySelector(".toggle-label");
const modal = document.getElementById("caseModal");
const caseContent = document.getElementById("caseContent");
const modalClose = document.getElementById("modalClose");

const caseStudies = {
  flowpay: {
    title: "FlowPay: Fintech Onboarding at Enterprise Scale",
    overview: "Series B SaaS fintech platform. Role: Lead Product Designer & Design Strategist. Timeline: 14 weeks.",
    problem: "Merchant activation was 41% due to fragmented setup flows, unclear verification requirements, and poor task sequencing across 12 disconnected steps. This created both UX friction and compliance risk.",
    research: "Conducted 22 merchant interviews, analyzed 180 session replays, performed competitive analysis of 8 fintech onboarding models, and worked with compliance to map verification dependencies.",
    ideation: "Facilitated 8 cross-functional design workshops to map mental models. Tested 5 progressive disclosure architectures and 3 guidance narratives through interactive prototypes with 12 merchants.",
    finalDesign: "Implemented a guided setup spine with context-aware verification, progressive disclosure, persistent progress visibility, and role-based decision trees. Documented entire system in design tokens and component library.",
    impact: "Activation improved from 41% to 76% (+85% improvement). Support tickets dropped 38%. Compliance risk decreased. Enabled $14M additional GMV in first quarter.",
    reflection: "Enterprise fintech requires balancing regulatory rigor with user clarity. We solved this by making verification logic transparent rather than hidden. Process design outperformed visual design.",
    before: "Before: Merchants faced all tasks at once without context or clear next steps.",
    after: "After: Role and status determined personalized flow; each step built confidence."
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
