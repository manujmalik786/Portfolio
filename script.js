const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.querySelector(".toggle-label");
const modal = document.getElementById("caseModal");
const caseContent = document.getElementById("caseContent");
const modalClose = document.getElementById("modalClose");

const caseStudies = {
  flowpay: {
    title: "FlowPay Merchant Onboarding",
    overview: "SaaS fintech platform. Role: Lead Product Designer. Timeline: 10 weeks.",
    problem: "Merchants were dropping out across 12 disconnected setup steps, with little visibility into what came next.",
    research: "15 onboarding interviews and session replays showed ambiguity around verification requirements and setup order.",
    ideation: "I mapped a progressive disclosure flow, tested two onboarding narratives, and iterated from low-fi to interactive prototypes.",
    finalDesign: "We introduced a guided setup spine, clear completion states, and contextual help at each decision point.",
    impact: "Activation increased from 41% to 76%, and support tickets during onboarding dropped by 38%.",
    reflection: "A transparent process model outperformed visual polish alone. Confidence was the key conversion lever.",
    before: "Before: Users saw all setup tasks at once and abandoned early.",
    after: "After: Users completed one meaningful step at a time with clear progress and expected effort."
  },
  mednest: {
    title: "MedNest Care Dashboard",
    overview: "Healthcare operations tool. Role: Senior Product Designer. Timeline: 12 weeks.",
    problem: "Clinicians navigated multiple panels to complete a single patient task, increasing cognitive load and delay.",
    research: "Contextual inquiries in two clinics revealed repeated cross-panel checks for meds, vitals, and alerts.",
    ideation: "I tested information grouping models and task-first layouts with paper prototypes and rapid usability rounds.",
    finalDesign: "The final dashboard used a persistent patient context rail, adaptive alerts, and role-aware actions.",
    impact: "Documentation time dropped 34% and severity-2 charting errors declined by 22%.",
    reflection: "Operational products need ruthless prioritization. We removed noise to improve safety.",
    before: "Before: Fragmented tabs forced memory-based navigation.",
    after: "After: Context and actions sat together, reducing switching cost."
  },
  atlas: {
    title: "Atlas Commerce Checkout",
    overview: "D2C ecommerce platform. Role: UX/UI Lead. Timeline: 8 weeks.",
    problem: "Checkout completion dropped sharply at the shipping-to-payment handoff on mobile.",
    research: "Funnel analysis + moderated tests found trust and fee surprises as the primary blockers.",
    ideation: "I explored three checkout architectures and validated a single-column mobile-first sequence.",
    finalDesign: "Implemented transparent pricing checkpoints, smart defaults, and inline reassurance patterns.",
    impact: "Checkout conversion rose 29%, and payment-related support tickets reduced 31%.",
    reflection: "Trust cues are UX infrastructure. They must be embedded at decision points, not bolted on.",
    before: "Before: Users encountered hidden costs late in checkout.",
    after: "After: Costs and shipping expectations were visible from the first decision step."
  },
  kernel: {
    title: "Kernel Design System",
    overview: "Multi-product B2B suite. Role: Product Design Lead. Timeline: 16 weeks.",
    problem: "Each squad rebuilt UI patterns from scratch, creating inconsistency and slowing release speed.",
    research: "UI audit across 4 products found 70+ duplicate components and conflicting interaction behavior.",
    ideation: "I facilitated component governance sessions and prototyped token-based foundations with engineering.",
    finalDesign: "Delivered a scalable component library, documented interaction standards, and usage playbooks.",
    impact: "Implementation speed improved 43%, UI bugs dropped 27%, and onboarding for new designers got faster.",
    reflection: "Systems work succeeds when governance is lightweight, explicit, and shared by engineering.",
    before: "Before: Teams had inconsistent patterns and repeat implementation effort.",
    after: "After: Shared primitives and clear ownership improved quality and velocity."
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
