const screens = {
  landing: document.getElementById("landingScreen"),
  analysis: document.getElementById("analysisScreen"),
  meeting: document.getElementById("meetingScreen"),
  outcome: document.getElementById("outcomeScreen"),
};

const progressLabel = document.getElementById("progressLabel");
const nameForm = document.getElementById("nameForm");
const playerNameInput = document.getElementById("playerName");
const identityShift = document.getElementById("identityShift");
const analysisPhaseTag = document.getElementById("analysisPhaseTag");
const analysisTitle = document.getElementById("analysisTitle");
const analysisIntro = document.getElementById("analysisIntro");
const analysisStateBadge = document.getElementById("analysisStateBadge");
const analysisDiscoveryView = document.getElementById("analysisDiscoveryView");
const hostNameLabel = document.getElementById("hostNameLabel");
const hostInitial = document.getElementById("hostInitial");
const situationNarrative = document.getElementById("situationNarrative");
const summariseButton = document.getElementById("summariseButton");
const summaryPanel = document.getElementById("summaryPanel");
const analysisProgressPill = document.getElementById("analysisProgressPill");
const analysisCaptureStatus = document.getElementById("analysisCaptureStatus");
const analysisActionTitle = document.getElementById("analysisActionTitle");
const analysisActionHelper = document.getElementById("analysisActionHelper");
const analysisSignalHint = document.getElementById("analysisSignalHint");
const analysisConflictCallout = document.getElementById("analysisConflictCallout");
const enterMeetingButton = document.getElementById("enterMeetingButton");
const reviewSignalsButton = document.getElementById("reviewSignalsButton");
const traceNote = document.getElementById("traceNote");
const tensionPill = document.getElementById("tensionPill");
const meetingStatusLabel = document.getElementById("meetingStatusLabel");
const meetingStepTag = document.getElementById("meetingStepTag");
const meetingStageTitle = document.getElementById("stageTitle");
const meetingStageSubtitle = document.getElementById("meetingStageSubtitle");
const meetingRoom = document.getElementById("meetingRoom");
const meetingIntroOverlay = document.getElementById("meetingIntroOverlay");
const meetingIntroPrimary = document.getElementById("meetingIntroPrimary");
const meetingIntroSecondary = document.getElementById("meetingIntroSecondary");
const hostCard = document.getElementById("hostCard");
const conversationTitle = document.getElementById("conversationTitle");
const conversationFeed = document.getElementById("conversationFeed");
const decisionPanel = document.getElementById("decisionPanel");
const assistantHeading = document.getElementById("assistantHeading");
const assistantContent = document.getElementById("assistantContent");
const aiAssistButton = document.getElementById("aiAssistButton");
const notesList = document.getElementById("notesList");
const tensionLabel = document.getElementById("tensionLabel");
const scoreGrid = document.getElementById("scoreGrid");
const outcomeSummaryText = document.getElementById("outcomeSummaryText");
const strengthsList = document.getElementById("strengthsList");
const improvementsList = document.getElementById("improvementsList");
const emailPreview = document.getElementById("emailPreview");
const tryAgainButton = document.getElementById("tryAgainButton");
const returnHomeButton = document.getElementById("returnHomeButton");
const optionTemplate = document.getElementById("optionTemplate");
const insightSteps = Array.from(document.querySelectorAll("[data-insight-step]"));
const analysisSourceCards = Array.from(document.querySelectorAll("[data-source-card]"));
const traceChips = Array.from(document.querySelectorAll("[data-trace-source]"));

const stakeholderCards = {
  tester: document.querySelector('[data-stakeholder-card="tester"]'),
  techLead: document.querySelector('[data-stakeholder-card="techLead"]'),
  productOwner: document.querySelector('[data-stakeholder-card="productOwner"]'),
  projectManager: document.querySelector('[data-stakeholder-card="projectManager"]'),
};

const reactionChips = {
  tester: document.querySelector('[data-reaction="tester"]'),
  techLead: document.querySelector('[data-reaction="techLead"]'),
  productOwner: document.querySelector('[data-reaction="productOwner"]'),
  projectManager: document.querySelector('[data-reaction="projectManager"]'),
};

const missionLabels = {
  landing: "Mission Phase 1: Briefing",
  analysis: "Mission Phase 2: Signal Analysis",
  meeting: "Mission Phase 4: Live Meeting",
  outcome: "Mission Phase 5: Debrief",
};

const analysisSourceLabels = {
  defect: "Defect Report",
  chat: "Team Chat",
  email: "Stakeholder Emails",
};

const defaultState = () => ({
  playerName: "Sarah",
  notes: [],
  scores: {
    trust: 50,
    risk: 50,
    business: 50,
  },
  reactions: {
    tester: { text: "Awaiting input", tone: "neutral" },
    techLead: { text: "Awaiting input", tone: "neutral" },
    productOwner: { text: "Awaiting input", tone: "neutral" },
    projectManager: { text: "Waiting for final alignment", tone: "neutral" },
  },
  firstSpeaker: "",
  speakerQueue: [],
  currentRound: 0,
  stage: "kickoff",
  reviewedSources: [],
  lastAnalysisFeedback: "",
  conversationLog: [],
  selections: {
    opening: null,
    problem: null,
    outcome: null,
    recommendation: null,
  },
  aiSummaryShown: false,
});

let state = defaultState();
let hesitationTimer;
let meetingIntroTimers = [];

function renderProgressLabel(screenKey) {
  let label = missionLabels[screenKey];

  if (screenKey === "analysis" && state.aiSummaryShown) {
    label = "Mission Phase 3: Signal Synthesis";
  }

  progressLabel.innerHTML = `
    <span class="phase-icon" aria-hidden="true">&#128752;&#65039;</span>
    ${label}
  `;
}

const kickoffSequence = [
  {
    id: "opening",
    title: "How would you like to open the meeting?",
    prompt:
      "Choose an opening that sets direction and shows the room you are leading with structure.",
    options: [
      {
        label: "Structured Opening",
        headline: "Frame the room around readiness, risk, and decision-making.",
        preview: "Calm, directive, and confidence-building.",
        text:
          "Thanks everyone for joining.\n\nToday we're here to review the readiness of the upcoming release.\n\nWe have representatives from product and technology.\n\nOur goal is to assess risks and agree on the best path forward.",
        feedback: "Stakeholders react calmly and stay attentive to your direction.",
        copilotAfter: "This approach sets a clear structure and lowers room friction.",
        impacts: { trust: 10, risk: 0, business: 4 },
        reactions: {
          tester: { text: "Feels heard", tone: "positive" },
          techLead: { text: "Aligned on structure", tone: "positive" },
          productOwner: { text: "Listening closely", tone: "neutral" },
        },
      },
      {
        label: "Quick Check-in",
        headline: "Open lightly and invite the room in without much structure.",
        preview: "Neutral tone, but lighter control of the discussion.",
        text:
          "Hi everyone, thanks for joining.\n\nWe have some issues to discuss before release.",
        feedback: "The room stays neutral, but your direction feels light.",
        copilotAfter: "You acknowledged the room, but it may still need firmer structure.",
        impacts: { trust: 3, risk: 0, business: 2 },
        reactions: {
          tester: { text: "Neutral", tone: "neutral" },
          techLead: { text: "Waiting for clarity", tone: "neutral" },
          productOwner: { text: "Focused on timing", tone: "neutral" },
        },
      },
      {
        label: "Direct Challenge",
        headline: "Push immediately for status and urgency.",
        preview: "High-pressure opening that may raise room tension.",
        text: "Let's keep this quick. What's the status?",
        feedback: "Some tension appears as stakeholders sense missing structure.",
        copilotAfter: "This creates urgency, but you may need to rebuild trust quickly.",
        impacts: { trust: -8, risk: 4, business: -2 },
        reactions: {
          tester: { text: "Tension rising", tone: "negative" },
          techLead: { text: "Less confident", tone: "negative" },
          productOwner: { text: "Impatient energy", tone: "negative" },
        },
      },
    ],
  },
  {
    id: "problem",
    title: "How do you frame the problem?",
    prompt: "Define the issue clearly so the discussion starts from the same facts.",
    options: [
      {
        label: "Risk-First Framing",
        preview: "Anchors the room in evidence and customer impact.",
        text:
          "There are several high-severity defects identified, and we need to assess their impact on release.",
        feedback: "You anchor the conversation in evidence and impact.",
        copilotAfter: "You positioned the discussion around facts, risk, and consequence.",
        impacts: { trust: 8, risk: -6, business: 2 },
        reactions: {
          tester: { text: "Clear framing", tone: "positive" },
          techLead: { text: "Technical risk acknowledged", tone: "positive" },
          productOwner: { text: "Pressure still visible", tone: "neutral" },
        },
      },
      {
        label: "Deadline-First Framing",
        preview: "Moves attention toward schedule pressure and delivery urgency.",
        text: "We are under pressure to deliver this on time.",
        feedback: "Delivery urgency is clear, but the risk picture becomes blurred.",
        copilotAfter: "Delivery pressure is visible now, but risk may feel secondary.",
        impacts: { trust: -2, risk: 8, business: 6 },
        reactions: {
          tester: { text: "Risk underplayed", tone: "negative" },
          techLead: { text: "Concerned", tone: "negative" },
          productOwner: { text: "Deadline recognised", tone: "positive" },
        },
      },
      {
        label: "Open Issue Scan",
        preview: "Keeps the problem broad and less decisive.",
        text: "There are some issues we need to go through.",
        feedback: "The room keeps listening, but the problem remains vague.",
        copilotAfter: "The room may need a sharper definition of the problem.",
        impacts: { trust: -1, risk: 3, business: 0 },
        reactions: {
          tester: { text: "Needs specifics", tone: "neutral" },
          techLead: { text: "Waiting on detail", tone: "neutral" },
          productOwner: { text: "Still unclear", tone: "neutral" },
        },
      },
    ],
  },
  {
    id: "outcome",
    title: "What outcome do you want from this meeting?",
    prompt: "Set the decision standard early so the conversation has a destination.",
    options: [
      {
        label: "Decision-Led Close",
        preview: "Gives the room a clear destination and decision frame.",
        text:
          "By the end of this meeting, we should have a clear recommendation on whether to proceed, delay, or adjust the release.",
        feedback: "You establish a crisp decision frame and improve confidence.",
        copilotAfter: "This sets up a structured route to a recommendation.",
        impacts: { trust: 10, risk: -2, business: 5 },
        reactions: {
          tester: { text: "Decision path is clear", tone: "positive" },
          techLead: { text: "Good structure", tone: "positive" },
          productOwner: { text: "Knows the decision goal", tone: "positive" },
        },
      },
      {
        label: "Collaborative Explore",
        preview: "Keeps the room open and collaborative, but less tight.",
        text: "Let's hear everyone's thoughts and decide.",
        feedback: "The approach feels collaborative, but it leaves room for drift.",
        copilotAfter: "The room has flexibility, but you may need firmer guardrails.",
        impacts: { trust: 4, risk: 1, business: 2 },
        reactions: {
          tester: { text: "Collaborative", tone: "neutral" },
          techLead: { text: "Acceptable", tone: "neutral" },
          productOwner: { text: "Moderately aligned", tone: "neutral" },
        },
      },
      {
        label: "Loose Discussion",
        preview: "Invites conversation without defining how it should end.",
        text: "Let's just talk through the issues first.",
        feedback: "The discussion risks staying open-ended and harder to land.",
        copilotAfter: "You may need to tighten the decision goal to keep the room focused.",
        impacts: { trust: -4, risk: 6, business: -1 },
        reactions: {
          tester: { text: "May lose focus", tone: "negative" },
          techLead: { text: "Concerned about drift", tone: "negative" },
          productOwner: { text: "Wants direction", tone: "negative" },
        },
      },
    ],
  },
];

const discussionOrder = ["tester", "productOwner", "techLead"];

const discussionContent = {
  tester: {
    speaker: "Tester",
    dialogue:
      "There are still 3 high-severity defects not fixed.\n\nTwo of them may affect existing customer outcomes if we release without further action.",
    options: [
      {
        label: "Recommend Delay",
        preview: "Protects customers, but raises delivery pressure immediately.",
        text: "We should delay release until these are resolved.",
        feedback: "The Tester appreciates the clarity, but business impact pressure rises.",
        copilotAfter: "You reduced risk quickly, but the room will feel the delivery impact.",
        impacts: { trust: 4, risk: -10, business: -8 },
        reactions: {
          tester: { text: "Feels supported", tone: "positive" },
          productOwner: { text: "Concerned about delay", tone: "negative" },
        },
      },
      {
        label: "Test Acceptable Risk",
        preview: "Keeps the timeline alive while probing tolerance for release.",
        text: "Can we assess whether these risks are acceptable for release?",
        feedback: "You keep options open, but the Tester wants deeper clarity.",
        copilotAfter: "You preserved flexibility, but the room may still want sharper risk detail.",
        impacts: { trust: 1, risk: 4, business: 4 },
        reactions: {
          tester: { text: "Needs more depth", tone: "neutral" },
          productOwner: { text: "Timeline may still hold", tone: "positive" },
        },
      },
      {
        label: "Clarify Impact First",
        preview: "Balances caution with structured assessment.",
        text: "Let's understand the impact of each defect before making a decision.",
        feedback: "You balance caution with structure and improve room confidence.",
        copilotAfter: "This keeps the room analytical and lowers unnecessary tension.",
        impacts: { trust: 8, risk: -7, business: 3 },
        reactions: {
          tester: { text: "Feels heard", tone: "positive" },
          techLead: { text: "Supports structured assessment", tone: "positive" },
          productOwner: { text: "Aware of trade-off", tone: "neutral" },
        },
      },
    ],
    noteLines: [
      "Tester raised 3 unresolved high severity defects.",
      "2 may impact existing customers.",
      "Draft action: confirm impact and severity of each defect.",
    ],
    aiSuggestion:
      "Suggested approach:\nClarify impact first before recommending release or delay.",
  },
  productOwner: {
    speaker: "Product Owner",
    dialogue:
      "We've already communicated the expected release timing to stakeholders.\n\nIf we delay now, it will create delivery impact and raise questions from the business side.",
    options: [
      {
        label: "Re-center on Stability",
        preview: "Pushes the room back toward customer impact and stability.",
        text: "We should still prioritise stability and customer impact.",
        feedback: "You protect customer outcomes, though delivery pressure remains sharp.",
        copilotAfter: "You protected the risk conversation, but business pressure will stay active.",
        impacts: { trust: 4, risk: -7, business: -6 },
        reactions: {
          productOwner: { text: "Understands the stance, but frustrated", tone: "negative" },
          tester: { text: "Risk is being respected", tone: "positive" },
        },
      },
      {
        label: "Accept Timeline Risk",
        preview: "Signals willingness to absorb risk for schedule protection.",
        text: "We may need to accept some level of risk to meet the timeline.",
        feedback: "Business urgency is acknowledged, but trust with technical stakeholders dips.",
        copilotAfter: "You validated the timeline, but technical confidence may drop.",
        impacts: { trust: -5, risk: 9, business: 8 },
        reactions: {
          productOwner: { text: "Timeline prioritised", tone: "positive" },
          techLead: { text: "Risk concern grows", tone: "negative" },
          tester: { text: "Feels risk is underweighted", tone: "negative" },
        },
      },
      {
        label: "Name the Trade-off",
        preview: "Makes the tension explicit without taking sides too early.",
        text: "Let's align on the trade-off between delivery impact and release risk.",
        feedback: "You acknowledge pressure while keeping the group focused on trade-offs.",
        copilotAfter: "This helps the room surface the real tension without escalating it.",
        impacts: { trust: 9, risk: -3, business: 6 },
        reactions: {
          productOwner: { text: "Feels heard", tone: "positive" },
          techLead: { text: "Trade-off is visible", tone: "positive" },
          tester: { text: "Balanced framing", tone: "positive" },
        },
      },
    ],
    noteLines: [
      "Product Owner raised delivery impact and stakeholder expectation concerns.",
      "Draft action: clarify timeline impact and communication approach.",
    ],
    aiSuggestion:
      "Suggested approach:\nAcknowledge delivery pressure while guiding the group back to risk and impact.",
  },
  techLead: {
    speaker: "Tech Lead",
    dialogue:
      "From a technology perspective, releasing now could create avoidable risk.\n\nIf the defects behave differently in production, we may affect existing users and create follow-up incidents.",
    options: [
      {
        label: "Reduce Risk Before Release",
        preview: "Prioritises technical certainty over release timing.",
        text: "We should delay until the risks are reduced.",
        feedback: "You reduce technical exposure, though business impact becomes heavier.",
        copilotAfter: "You backed the technical risk view, but timing pressure will rise.",
        impacts: { trust: 3, risk: -10, business: -7 },
        reactions: {
          techLead: { text: "Feels backed", tone: "positive" },
          productOwner: { text: "Worried about missed timing", tone: "negative" },
        },
      },
      {
        label: "Explore Release Controls",
        preview: "Looks for mitigation while keeping the release alive.",
        text: "Can we put controls in place and proceed carefully?",
        feedback: "Mitigation is considered, but unresolved uncertainty stays in play.",
        copilotAfter: "You kept a controlled-release path open, but detail will matter now.",
        impacts: { trust: 3, risk: 2, business: 5 },
        reactions: {
          techLead: { text: "Wants more detail on controls", tone: "neutral" },
          productOwner: { text: "Sees a path forward", tone: "positive" },
        },
      },
      {
        label: "Ask for Worst Case",
        preview: "Surfaces the real downside before a recommendation is made.",
        text: "What is the worst-case impact if we release as planned?",
        feedback: "You draw out technical risk clearly before pushing toward a decision.",
        copilotAfter: "This strengthens decision confidence by forcing the risk into the open.",
        impacts: { trust: 8, risk: -8, business: 4 },
        reactions: {
          techLead: { text: "Supports the deeper analysis", tone: "positive" },
          tester: { text: "Risk is being surfaced", tone: "positive" },
          productOwner: { text: "Waiting for recommendation", tone: "neutral" },
        },
      },
    ],
    noteLines: [
      "Tech Lead raised production risk and potential downstream incidents.",
      "Draft action: assess mitigation options and release controls.",
    ],
    aiSuggestion:
      "Suggested approach:\nAsk for worst-case impact and possible mitigation before making a final recommendation.",
  },
};

const finalDecision = {
  title: "Project Manager",
  prompt:
    "We need to leave this meeting with a clear direction.\n\nBased on everything discussed, what is your recommendation?",
  helper:
    "Your recommendation will affect stakeholder trust, system risk, and business impact.",
  options: [
    {
      label: "Proceed as Planned",
      preview: "Protects delivery timing, but leaves the room carrying more risk.",
      text: "Proceed with release as planned",
      value: "Proceed with release as planned",
      copilotAfter: "This keeps momentum, but the room may question unresolved customer risk.",
      impacts: { trust: -6, risk: 12, business: 10 },
    },
    {
      label: "Delay Release",
      preview: "Reduces risk exposure, but raises delivery consequences.",
      text: "Delay the release",
      value: "Delay the release",
      copilotAfter: "This reduces technical risk, but business impact will be more visible.",
      impacts: { trust: 2, risk: -14, business: -10 },
    },
    {
      label: "Controlled Release",
      preview: "Balances progress with mitigation and tighter controls.",
      text: "Proceed with a partial or controlled release",
      value: "Partial release",
      copilotAfter: "This gives the room a balanced path between risk and commitment.",
      impacts: { trust: 8, risk: -5, business: 6 },
    },
  ],
};

const assistantKickoff = [
  "State purpose",
  "Confirm who is represented in the room",
  "Define the problem",
  "Set the expected outcome",
];

const kickoffStageMeta = {
  opening: {
    tag: "Opening Move",
    subtitle: "Choose how you want the room to hear you first.",
    status: "Awaiting your opening",
    cue: "All stakeholders have joined. The room is waiting for your opening.",
    nudge: [
      "You may want to clarify the purpose first.",
      "A structured opening will help the room settle quickly.",
    ],
  },
  problem: {
    tag: "Problem Framing",
    subtitle: "Define the issue clearly before the room starts debating solutions.",
    status: "Problem being framed",
    cue: "The room is listening for how you define the problem.",
    nudge: [
      "Anchor the room in evidence, not just pressure.",
      "Make the release risk explicit before the debate widens.",
    ],
  },
  outcome: {
    tag: "Outcome Framing",
    subtitle: "Set the decision standard so the discussion has a destination.",
    status: "Decision frame forming",
    cue: "Stakeholders need to know what this meeting must achieve.",
    nudge: [
      "A clear end-state will make the rest of the discussion easier to control.",
      "Signal how the room will know when it has enough to decide.",
    ],
  },
};

function showScreen(screenKey) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.classList.toggle("screen-active", key === screenKey);
  });
  renderProgressLabel(screenKey);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function clampScore(value) {
  return Math.max(0, Math.min(100, value));
}

function applyImpacts(impacts) {
  state.scores.trust = clampScore(state.scores.trust + impacts.trust);
  state.scores.risk = clampScore(state.scores.risk + impacts.risk);
  state.scores.business = clampScore(state.scores.business + impacts.business);
  updateTension();
}

function updateTension() {
  const average = (state.scores.trust + (100 - state.scores.risk) + state.scores.business) / 3;
  const tension = average >= 62 ? "Low" : average >= 44 ? "Medium" : "High";
  tensionLabel.textContent = tension;
  tensionPill.dataset.level = tension.toLowerCase();
}

function setStakeholderReactions(reactions) {
  Object.entries(reactions).forEach(([key, value]) => {
    state.reactions[key] = value;
  });
  renderReactions();
}

function renderReactions() {
  Object.entries(reactionChips).forEach(([key, chip]) => {
    const current = state.reactions[key];
    chip.textContent = current.text;
    chip.dataset.tone = current.tone;
  });
}

function highlightSpeaker(stakeholderKey) {
  hostCard.classList.toggle("is-speaking", !stakeholderKey || stakeholderKey === "host");
  Object.entries(stakeholderCards).forEach(([key, card]) => {
    card.classList.toggle("is-speaking", key === stakeholderKey);
  });
}

function clearHesitationNudge() {
  clearTimeout(hesitationTimer);
}

function clearMeetingIntroSequence() {
  meetingIntroTimers.forEach((timerId) => clearTimeout(timerId));
  meetingIntroTimers = [];
}

function setMeetingStage({ tag, title, subtitle, status }) {
  if (tag) {
    meetingStepTag.textContent = tag;
  }
  if (title) {
    meetingStageTitle.textContent = title;
  }
  if (subtitle) {
    meetingStageSubtitle.textContent = subtitle;
  }
  if (status) {
    meetingStatusLabel.textContent = status;
  }
}

function addConversationEntry(entry) {
  if (entry.id && state.conversationLog.some((item) => item.id === entry.id)) {
    return;
  }

  state.conversationLog.push(entry);
}

function renderConversation(title, entries = state.conversationLog.slice(-4)) {
  conversationTitle.textContent = title;
  conversationFeed.innerHTML = "";

  entries.forEach((entry) => {
    const article = document.createElement("article");
    article.className = `conversation-message ${entry.variant}`;
    article.innerHTML = `
      <span class="conversation-speaker">${entry.speaker}</span>
      <p>${entry.text.replaceAll("\n", "<br><br>")}</p>
    `;
    conversationFeed.appendChild(article);
  });
}

function scheduleCopilotNudge(lines, title = "AI Copilot", delay = 4200) {
  clearHesitationNudge();
  hesitationTimer = setTimeout(() => {
    renderAssistant(title, lines);
  }, delay);
}

function renderResponseShell({ eyebrow, title, prompt, helper, options }) {
  decisionPanel.innerHTML = "";

  if (eyebrow) {
    const eyebrowNode = document.createElement("p");
    eyebrowNode.className = "response-eyebrow";
    eyebrowNode.textContent = eyebrow;
    decisionPanel.appendChild(eyebrowNode);
  }

  const titleNode = document.createElement("h3");
  titleNode.textContent = title;
  decisionPanel.appendChild(titleNode);

  if (prompt) {
    const promptNode = document.createElement("p");
    promptNode.textContent = prompt;
    decisionPanel.appendChild(promptNode);
  }

  if (helper) {
    const helperNode = document.createElement("p");
    helperNode.className = "helper-text";
    helperNode.textContent = helper;
    decisionPanel.appendChild(helperNode);
  }

  if (options) {
    decisionPanel.appendChild(options);
  }
}

function buildConversationCue(text) {
  return {
    speaker: "Room",
    text,
    variant: "system",
  };
}

function updateHostLabels() {
  const playerName = state.playerName.trim() || "Sarah";
  hostNameLabel.textContent = playerName;
  hostInitial.textContent = playerName.charAt(0).toUpperCase();
  situationNarrative.textContent = "You now have enough context to lead the meeting.";
}

function updateIdentityShift() {
  const playerName = playerNameInput.value.trim();

  if (!playerName) {
    identityShift.textContent = "";
    identityShift.classList.remove("is-visible");
    return;
  }

  identityShift.textContent = `${playerName}, you'll be leading this meeting.`;
  identityShift.classList.add("is-visible");
}

function renderAnalysisSources() {
  analysisSourceCards.forEach((card) => {
    const sourceId = card.dataset.sourceCard;
    const toggle = card.querySelector("[data-source-toggle]");
    const reviewChip = card.querySelector(".source-review-chip");
    const isReviewed = state.reviewedSources.includes(sourceId);

    card.classList.toggle("is-reviewed", isReviewed);
    card.classList.toggle("is-expanded", isReviewed);
    toggle?.setAttribute("aria-expanded", String(isReviewed));
    if (reviewChip) {
      reviewChip.textContent = isReviewed ? "Signal captured" : "Reviewed";
    }
  });
}

function renderAnalysisHeader() {
  if (state.aiSummaryShown) {
    analysisPhaseTag.textContent = "Mission Phase 3";
    analysisTitle.textContent = "AI Summary";
    analysisIntro.textContent =
      "The system has reviewed the signals and identified the core tensions shaping this meeting.";
    analysisProgressPill.classList.add("hidden");
    analysisStateBadge.classList.remove("hidden");
    return;
  }

  analysisPhaseTag.textContent = "Mission Phase 2";
  analysisTitle.textContent = "Signal Analysis";
  analysisIntro.textContent = "Review the signals before making a decision.";
  analysisProgressPill.classList.remove("hidden");
  analysisStateBadge.classList.add("hidden");
}

function renderAnalysisAction() {
  const reviewedCount = state.reviewedSources.length;
  const canSummarise = reviewedCount === 3;

  analysisProgressPill.textContent = `${reviewedCount}/3 reviewed`;
  analysisCaptureStatus.textContent = state.lastAnalysisFeedback;
  summariseButton.disabled = !canSummarise;
  summariseButton.setAttribute("aria-disabled", String(!canSummarise));
  analysisConflictCallout.classList.toggle("hidden", !canSummarise || state.aiSummaryShown);

  if (state.aiSummaryShown) {
    analysisActionTitle.textContent = "AI Summary generated. Review the consolidated view below.";
    analysisActionHelper.textContent =
      "You can still inspect the source signals before entering the meeting room.";
    analysisSignalHint.textContent = "";
    return;
  }

  if (canSummarise) {
    analysisActionTitle.textContent = "Let AI connect the dots.";
    analysisActionHelper.textContent = "All key signals reviewed. Use AI to Summarise.";
    analysisSignalHint.textContent = "";
    return;
  }

  analysisActionTitle.textContent =
    "Investigate the signals before asking AI to consolidate the picture.";
  analysisActionHelper.textContent = "Review all 3 sources to continue.";
  analysisSignalHint.textContent = "Other signals may provide additional context.";
}

function renderAnalysisView() {
  renderAnalysisHeader();
  renderAnalysisSources();
  renderAnalysisAction();
  analysisDiscoveryView.classList.toggle("hidden", state.aiSummaryShown);
  summaryPanel.classList.toggle("hidden", !state.aiSummaryShown);
  if (!state.aiSummaryShown) {
    traceNote.textContent = "";
    traceNote.classList.add("hidden");
  }
  if (screens.analysis.classList.contains("screen-active")) {
    renderProgressLabel("analysis");
  }
}

function handleSourceReview(sourceId) {
  state.lastAnalysisFeedback = `Insight recorded: ${analysisSourceLabels[sourceId]}.`;
  if (!state.reviewedSources.includes(sourceId)) {
    state.reviewedSources = [...state.reviewedSources, sourceId];
  }

  renderAnalysisView();
}

function addNotes(noteLines) {
  noteLines.forEach((line) => {
    if (!state.notes.includes(line)) {
      state.notes.push(line);
    }
  });
  renderNotes();
}

function renderNotes() {
  notesList.innerHTML = "";
  state.notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = note;
    notesList.appendChild(li);
  });
}

function renderAssistant(title, contentLines) {
  assistantHeading.textContent = title;
  assistantContent.innerHTML = "";
  contentLines.forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    assistantContent.appendChild(li);
  });
}

function buildOptionButton(option, handler) {
  const button = optionTemplate.content.firstElementChild.cloneNode(true);
  const headline = option.headline || option.text;
  const preview = option.preview ? `<span class="option-preview">${option.preview}</span>` : "";
  button.innerHTML = `
    <span class="option-badge">${option.label}</span>
    <strong>${headline.replaceAll("\n", "<br>")}</strong>
    ${preview}
  `;
  button.addEventListener("click", () => {
    if (button.disabled) {
      return;
    }

    const siblings = button.parentElement?.querySelectorAll("button") || [];
    siblings.forEach((sibling) => {
      sibling.disabled = true;
    });

    handler(option);
  });
  return button;
}

function getKickoffNotes(stepId) {
  const noteMap = {
    opening: ["Meeting started.", "Purpose being defined.", "Stakeholders aligned: partial."],
    problem: ["Problem framing being clarified."],
    outcome: ["Decision path being defined."],
  };

  return noteMap[stepId] || [];
}

function renderKickoffStep() {
  const step = kickoffSequence[state.currentRound];
  const meta = kickoffStageMeta[step.id];
  const playerName = state.playerName.trim() || "You";

  highlightSpeaker("host");
  setMeetingStage({
    tag: meta.tag,
    title: step.id === "opening" ? "Everyone is looking at you to begin." : step.title,
    subtitle: meta.subtitle,
    status: meta.status,
  });

  addConversationEntry({ id: `cue-${step.id}`, ...buildConversationCue(meta.cue) });
  renderConversation("Room feed");
  renderAssistant("AI Copilot", step.id === "opening" ? assistantKickoff : meta.nudge);
  scheduleCopilotNudge(meta.nudge);

  const options = document.createElement("div");
  options.className = "option-list";

  step.options.forEach((option) => {
    options.appendChild(
      buildOptionButton(option, (selectedOption) => {
        clearHesitationNudge();
        state.selections[step.id] = selectedOption.text;
        addConversationEntry({
          id: `host-${step.id}`,
          speaker: playerName,
          text: selectedOption.text,
          variant: "host",
        });
        addNotes(getKickoffNotes(step.id));
        applyImpacts(selectedOption.impacts);
        setStakeholderReactions(selectedOption.reactions);
        renderConversation("Room feed");
        renderAssistant("AI Copilot", [
          selectedOption.copilotAfter || "This choice changes how the room reads your intent.",
          `Tension now: ${tensionLabel.textContent}.`,
        ]);
        renderFeedback(selectedOption.feedback, () => {
          state.currentRound += 1;
          if (state.currentRound < kickoffSequence.length) {
            renderKickoffStep();
          } else {
            state.stage = "speakerSelection";
            renderSpeakerSelection();
          }
        });
      })
    );
  });

  renderResponseShell({
    eyebrow: "Your response options",
    title: step.title,
    prompt: step.prompt,
    options,
  });
}

function renderFeedback(message, callback) {
  const feedback = document.createElement("div");
  feedback.className = "response-feedback";
  feedback.textContent = message;

  const continueButton = document.createElement("button");
  continueButton.className = "primary-button";
  continueButton.type = "button";
  continueButton.textContent = "Continue";
  continueButton.addEventListener("click", callback);

  decisionPanel.append(feedback, continueButton);
}

function renderSpeakerSelection() {
  highlightSpeaker("host");
  setMeetingStage({
    tag: "Speaker Selection",
    title: "Choose who should speak first.",
    subtitle: "Guide the discussion by surfacing the signal you want the room to examine next.",
    status: "Selecting first voice",
  });

  addConversationEntry({
    id: "cue-speaker-selection",
    ...buildConversationCue("The room is ready. Choose the first stakeholder to hear from."),
  });
  renderConversation("Room feed");
  renderAssistant("AI Copilot", [
    "Select the first voice based on the risk you want to surface first.",
    "You will align on the final decision with the Project Manager later in the meeting.",
  ]);
  scheduleCopilotNudge([
    "Starting with the strongest risk signal can help the room focus quickly.",
    "You can always bring the Project Manager in for final alignment later.",
  ]);

  const options = document.createElement("div");
  options.className = "option-list";

  [
    {
      label: "Tester First",
      headline: "Surface customer-impacting defects immediately.",
      preview: "Best for grounding the room in risk early.",
      value: "tester",
    },
    {
      label: "Tech Lead First",
      headline: "Bring technology feasibility and risk to the front.",
      preview: "Useful if you want the room to think in mitigation terms.",
      value: "techLead",
    },
    {
      label: "Product Owner First",
      headline: "Bring delivery commitment and business pressure into view.",
      preview: "Useful if you want to expose the timeline tension early.",
      value: "productOwner",
    },
  ].forEach((choice) => {
    options.appendChild(
      buildOptionButton(choice, () => {
        clearHesitationNudge();
        const playerName = state.playerName.trim() || "You";
        state.firstSpeaker = choice.value;
        state.speakerQueue = [
          choice.value,
          ...discussionOrder.filter((speaker) => speaker !== choice.value),
        ];
        state.currentRound = 0;
        addConversationEntry({
          id: `host-speaker-${choice.value}`,
          speaker: playerName,
          text: `Let's hear from the ${choice.value === "productOwner" ? "Product Owner" : choice.value === "techLead" ? "Tech Lead" : "Tester"} first.`,
          variant: "host",
        });
        addNotes([
          `${choice.value === "productOwner" ? "Product Owner" : choice.value === "techLead" ? "Tech Lead" : "Tester"} invited to speak first.`,
        ]);
        renderConversation("Room feed");
        renderAssistant("AI Copilot", [
          "This choice will shape which tension lands first in the room.",
          "Listen for the trade-off you want to surface next.",
        ]);
        renderFeedback("The room turns toward the first stakeholder you selected.", () => {
          state.stage = "discussion";
          renderDiscussionRound();
        });
      })
    );
  });

  renderResponseShell({
    eyebrow: "Discussion control",
    title: "Who would you like to hear from first?",
    prompt: "Choose intentionally. The first voice will shape the energy of the discussion.",
    helper: "You will align on the final decision with the Project Manager later in the meeting.",
    options,
  });
}

function renderDiscussionRound() {
  const currentKey = state.speakerQueue[state.currentRound];
  const config = discussionContent[currentKey];
  const playerName = state.playerName.trim() || "You";

  highlightSpeaker(currentKey);
  setMeetingStage({
    tag: `${config.speaker} speaking`,
    title: `${config.speaker} has the floor.`,
    subtitle: "Listen, read the room, and respond in a way that keeps the discussion moving.",
    status: "Discussion active",
  });

  addConversationEntry({
    id: `speaker-${currentKey}`,
    speaker: config.speaker,
    text: config.dialogue,
    variant: "stakeholder",
  });
  renderConversation(`${config.speaker} is speaking`);
  renderAssistant("AI Copilot", config.aiSuggestion.split("\n").slice(1));
  scheduleCopilotNudge(config.aiSuggestion.split("\n").slice(1));
  addNotes(config.noteLines);

  const options = document.createElement("div");
  options.className = "option-list";

  config.options.forEach((option) => {
    options.appendChild(
      buildOptionButton(option, (selectedOption) => {
        clearHesitationNudge();
        addConversationEntry({
          id: `host-response-${currentKey}`,
          speaker: playerName,
          text: selectedOption.text,
          variant: "host",
        });
        applyImpacts(selectedOption.impacts);
        setStakeholderReactions(selectedOption.reactions);
        renderConversation(`${config.speaker} is speaking`);
        renderAssistant("AI Copilot", [
          selectedOption.copilotAfter || "This response changes the tone and direction of the room.",
          `Tension now: ${tensionLabel.textContent}.`,
        ]);
        renderFeedback(selectedOption.feedback, () => {
          state.currentRound += 1;
          if (state.currentRound < state.speakerQueue.length) {
            renderDiscussionRound();
          } else {
            state.stage = "finalDecision";
            renderFinalDecision();
          }
        });
      })
    );
  });

  renderResponseShell({
    eyebrow: "Your response options",
    title: `How do you respond to ${config.speaker}?`,
    prompt: "Choose a response that manages the tension and keeps the discussion moving.",
    options,
  });
}

function renderFinalDecision() {
  const playerName = state.playerName.trim() || "You";

  highlightSpeaker("projectManager");
  setMeetingStage({
    tag: "Final Alignment",
    title: "The room needs your recommendation.",
    subtitle: "Bring the discussion to a clear direction the team can act on.",
    status: "Decision point",
  });

  addConversationEntry({
    id: "project-manager-final",
    speaker: "Project Manager",
    text: finalDecision.prompt,
    variant: "stakeholder",
  });
  renderConversation("Final alignment");
  renderAssistant("AI Copilot", [
    "You are at the critical decision moment.",
    "Balance stakeholder trust, system risk, and business impact.",
    "You can still choose any recommendation independently.",
  ]);
  scheduleCopilotNudge([
    "Summarise the trade-off clearly before choosing the path forward.",
    "The strongest recommendations name both risk and delivery consequence.",
  ]);

  const options = document.createElement("div");
  options.className = "option-list";

  finalDecision.options.forEach((option) => {
    options.appendChild(
      buildOptionButton(option, (selectedOption) => {
        clearHesitationNudge();
        state.selections.recommendation = selectedOption.value;
        addConversationEntry({
          id: "host-final-recommendation",
          speaker: playerName,
          text: selectedOption.text,
          variant: "host",
        });
        addNotes([`Recommendation shared: ${selectedOption.value}.`]);
        applyImpacts(selectedOption.impacts);
        setStakeholderReactions({
          projectManager: { text: "Decision recorded", tone: "positive" },
        });
        renderConversation("Final alignment");
        renderAssistant("AI Copilot", [
          selectedOption.copilotAfter || "A recommendation has now been put on the table.",
          `Final room tension: ${tensionLabel.textContent}.`,
        ]);
        renderOutcome();
      })
    );
  });

  renderResponseShell({
    eyebrow: "Your recommendation",
    title: "What is your recommendation?",
    prompt: "The Project Manager needs a clear direction before the room can close.",
    helper: finalDecision.helper,
    options,
  });
}

function getStrengths() {
  const strengths = [];

  if (state.scores.trust >= 60) {
    strengths.push("Structured meeting facilitation");
    strengths.push("Clear stakeholder management");
  }

  if (state.scores.risk <= 45) {
    strengths.push("Balanced decision framing");
  }

  if (state.scores.business >= 58) {
    strengths.push("Awareness of delivery impact");
  }

  return strengths.length ? strengths.slice(0, 4) : ["You kept the discussion moving toward a decision."];
}

function getImprovements() {
  const opportunities = [];

  if (state.scores.risk > 45) {
    opportunities.push("Surface risk earlier");
  }

  if (state.scores.trust < 60) {
    opportunities.push("Drive alignment sooner");
  }

  if (state.scores.business < 55) {
    opportunities.push("Translate discussion into actions more quickly");
  }

  if (!opportunities.length) {
    opportunities.push("Continue balancing delivery pressure with customer impact.");
  }

  return opportunities.slice(0, 4);
}

function getOutcomeSummary() {
  const strongTrust = state.scores.trust >= 62;
  const lowerRisk = state.scores.risk <= 46;
  const strongBusiness = state.scores.business >= 58;

  if (strongTrust && lowerRisk && strongBusiness) {
    return "You balanced stakeholder perspectives well and helped the team move toward a confident decision. Your facilitation showed structure, trade-off awareness, and practical judgement under pressure.";
  }

  if (strongTrust && lowerRisk) {
    return "You guided the group with solid structure and reduced uncertainty, although sharper attention to delivery impact could have improved the final balance.";
  }

  if (strongTrust && strongBusiness) {
    return "You balanced stakeholder perspectives reasonably well and helped the team move toward a decision. Earlier clarification of risk may have improved confidence in the final recommendation.";
  }

  return "You helped the meeting reach a direction, but stronger framing of risk, trade-offs, and explicit actions would improve confidence in future high-stakes discussions.";
}

function renderScoreCard(title, description, score) {
  const card = document.createElement("article");
  card.className = "score-card";
  card.innerHTML = `
    <h4>${title}</h4>
    <p>${description}</p>
    <div class="score-meter">
      <div class="score-fill" style="width: ${score}%;"></div>
    </div>
    <span class="score-value">${score}/100</span>
  `;
  return card;
}

function renderOutcome() {
  clearHesitationNudge();
  clearMeetingIntroSequence();
  showScreen("outcome");
  highlightSpeaker("");

  scoreGrid.innerHTML = "";
  scoreGrid.append(
    renderScoreCard(
      "Stakeholder Trust",
      "How well you balanced perspectives and kept the group aligned.",
      state.scores.trust
    ),
    renderScoreCard(
      "System Risk",
      "The level of unresolved delivery or technical risk in your chosen path.",
      state.scores.risk
    ),
    renderScoreCard(
      "Business Impact",
      "The effect of your recommendation on timeline and delivery expectations.",
      state.scores.business
    )
  );

  outcomeSummaryText.textContent = getOutcomeSummary();

  strengthsList.innerHTML = "";
  getStrengths().forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    strengthsList.appendChild(li);
  });

  improvementsList.innerHTML = "";
  getImprovements().forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    improvementsList.appendChild(li);
  });

  emailPreview.textContent = buildEmail();
}

function buildEmail() {
  const playerName = state.playerName.trim() || "Sarah";
  const decision = state.selections.recommendation || "Partial release";
  const greetingName = playerName;

  return `Subject: Release Decision - Meeting Summary

Hi Team,

Thanks for today's discussion.

Summary:

3 critical defects were identified
The team discussed customer impact, delivery expectations, and technology risk
Agreed decision: ${decision}

Actions:

Tech team to provide daily status updates on defect resolution
Product Owner to communicate updated release scope and timeline impact
Project Manager to track agreed actions and next checkpoints

Regards,
${greetingName}`;
}

function getMeetingParticipants() {
  return [
    hostCard,
    stakeholderCards.tester,
    stakeholderCards.techLead,
    stakeholderCards.productOwner,
    stakeholderCards.projectManager,
  ].filter(Boolean);
}

function resetMeetingRoomVisuals() {
  clearHesitationNudge();
  clearMeetingIntroSequence();
  meetingIntroOverlay.classList.remove("is-active");
  meetingIntroPrimary.textContent = "Connecting the room...";
  meetingIntroSecondary.textContent = "Mission control is preparing the discussion space.";
  conversationTitle.textContent = "Room feed";
  conversationFeed.innerHTML = "";
  getMeetingParticipants().forEach((card) => {
    card.classList.remove("is-present", "is-speaking");
  });
}

function renderRoomHoldingPattern() {
  renderConversation("Room feed", [
    {
      speaker: "System",
      text: "All stakeholder stations are syncing into the room.",
      variant: "system",
    },
  ]);
  renderResponseShell({
    eyebrow: "Mission control",
    title: "Preparing the room",
    prompt: "All stakeholders are joining the discussion space.",
  });
}

function runMeetingIntroSequence() {
  const participants = getMeetingParticipants();
  meetingIntroOverlay.classList.add("is-active");
  meetingStatusLabel.textContent = "Room coming online";

  participants.forEach((card, index) => {
    meetingIntroTimers.push(
      setTimeout(() => {
        card.classList.add("is-present");
      }, 180 * index + 160)
    );
  });

  meetingIntroTimers.push(
    setTimeout(() => {
      meetingIntroPrimary.textContent = "All stakeholders have joined";
      meetingIntroSecondary.textContent = "Everyone is looking at you...";
      meetingStatusLabel.textContent = "All stakeholders have joined";
    }, 980)
  );

  meetingIntroTimers.push(
    setTimeout(() => {
      meetingIntroOverlay.classList.remove("is-active");
      renderKickoffStep();
    }, 2300)
  );
}

function getManualAssistContext() {
  if (state.stage === "kickoff") {
    const step = kickoffSequence[state.currentRound];
    const meta = kickoffStageMeta[step.id];
    return {
      title: "AI Copilot",
      lines: step.id === "opening" ? assistantKickoff : meta.nudge,
    };
  }

  if (state.stage === "speakerSelection") {
    return {
      title: "AI Copilot",
      lines: [
        "Choose the first speaker based on the tension you want to surface first.",
        "You will align on the final decision with the Project Manager later in the meeting.",
      ],
    };
  }

  if (state.stage === "discussion") {
    const currentKey = state.speakerQueue[state.currentRound];
    return {
      title: "AI Copilot",
      lines: currentKey
        ? discussionContent[currentKey].aiSuggestion.split("\n").slice(1)
        : assistantKickoff,
    };
  }

  if (state.stage === "finalDecision") {
    return {
      title: "AI Copilot",
      lines: [
        "Summarise the trade-off clearly.",
        "Connect the recommendation to customer impact, delivery expectations, and risk controls.",
      ],
    };
  }

  return {
    title: "AI Copilot",
    lines: assistantKickoff,
  };
}

function resetSimulation({ destination = "landing", preserveName = false } = {}) {
  const preservedName = preserveName ? state.playerName : "";
  state = defaultState();
  if (preservedName) {
    state.playerName = preservedName;
  }
  playerNameInput.value = destination === "landing" ? "" : state.playerName;
  summaryPanel.classList.add("hidden");
  resetMeetingRoomVisuals();
  renderNotes();
  renderReactions();
  renderAssistant("AI Copilot", assistantKickoff);
  updateTension();
  decisionPanel.innerHTML = "";
  highlightSpeaker("");
  setMeetingStage({
    tag: "Meeting Kick-Off",
    title: "Everyone is looking at you to begin.",
    subtitle: "Guide the discussion, frame the trade-offs, and use AI support when it helps.",
    status: "Room coming online",
  });
  updateHostLabels();
  updateIdentityShift();
  renderAnalysisView();
  if (destination === "landing") {
    showScreen("landing");
  } else {
    showScreen("analysis");
  }
}

function startMeeting() {
  showScreen("meeting");
  resetMeetingRoomVisuals();
  state.stage = "kickoff";
  state.currentRound = 0;
  state.conversationLog = [
    {
      id: "intro-joined",
      speaker: "System",
      text: "All stakeholders have joined the meeting.",
      variant: "system",
    },
    {
      id: "intro-focus",
      speaker: "System",
      text: "Everyone is looking at you to open the discussion.",
      variant: "system",
    },
  ];
  state.notes = [
    "Meeting started.",
    "All stakeholders joined.",
    "Purpose being defined.",
    "Stakeholders aligned: partial.",
  ];
  renderNotes();
  renderReactions();
  updateTension();
  renderAssistant("AI Copilot", [
    "Room calibration underway.",
    "Prepare to set the purpose clearly before the discussion broadens.",
  ]);
  setMeetingStage({
    tag: "Mission Arrival",
    title: "Everyone is taking their seats.",
    subtitle: "Mission control is bringing the room online for a critical discussion.",
    status: "Room coming online",
  });
  renderRoomHoldingPattern();
  runMeetingIntroSequence();
}

function cycleSystemInsights() {
  if (!insightSteps.length) {
    return;
  }

  let activeIndex = 0;
  let revealTimer;

  const activateStep = (index) => {
    clearTimeout(revealTimer);
    insightSteps.forEach((step, stepIndex) => {
      step.classList.toggle("active", stepIndex === index);
      step.classList.remove("is-revealed");
    });

    revealTimer = setTimeout(() => {
      insightSteps[index].classList.add("is-revealed");
    }, 900);
  };

  activateStep(activeIndex);

  setInterval(() => {
    activeIndex = (activeIndex + 1) % insightSteps.length;
    activateStep(activeIndex);
  }, 3600);
}

function initialiseLandingParallax() {
  const landingScreen = screens.landing;

  if (!landingScreen || !window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  landingScreen.addEventListener("mousemove", (event) => {
    const bounds = landingScreen.getBoundingClientRect();
    const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16;
    const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 16;

    landingScreen.style.setProperty("--parallax-x", `${offsetX.toFixed(2)}px`);
    landingScreen.style.setProperty("--parallax-y", `${offsetY.toFixed(2)}px`);
  });

  landingScreen.addEventListener("mouseleave", () => {
    landingScreen.style.setProperty("--parallax-x", "0px");
    landingScreen.style.setProperty("--parallax-y", "0px");
  });
}

playerNameInput.addEventListener("input", () => {
  updateIdentityShift();
});

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.playerName = playerNameInput.value.trim() || "Sarah";
  updateHostLabels();
  renderAnalysisView();
  showScreen("analysis");
});

analysisSourceCards.forEach((card) => {
  const sourceId = card.dataset.sourceCard;
  const toggle = card.querySelector("[data-source-toggle]");

  toggle?.addEventListener("click", () => {
    handleSourceReview(sourceId);
  });

  card.addEventListener("click", (event) => {
    if (event.target.closest("[data-source-toggle]")) {
      return;
    }

    handleSourceReview(sourceId);
  });
});

summariseButton.addEventListener("click", () => {
  if (summariseButton.disabled) {
    return;
  }

  state.aiSummaryShown = true;
  renderAnalysisView();
  summaryPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

reviewSignalsButton?.addEventListener("click", () => {
  state.aiSummaryShown = false;
  renderAnalysisView();
  analysisDiscoveryView.scrollIntoView({ behavior: "smooth", block: "start" });
});

enterMeetingButton.addEventListener("click", () => {
  startMeeting();
});

traceChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const sourceId = chip.dataset.traceSource;
    const sourceLabel = analysisSourceLabels[sourceId] || "source";
    traceNote.textContent = `Referenced from reviewed ${sourceLabel}.`;
    traceNote.classList.remove("hidden");
  });
});

aiAssistButton.addEventListener("click", () => {
  clearHesitationNudge();
  const assistContext = getManualAssistContext();
  renderAssistant(assistContext.title, assistContext.lines);
});

tryAgainButton.addEventListener("click", () => {
  resetSimulation({ destination: "analysis", preserveName: true });
});

returnHomeButton.addEventListener("click", () => {
  resetSimulation({ destination: "landing", preserveName: false });
});

renderReactions();
renderAssistant("AI Copilot", assistantKickoff);
updateTension();
updateHostLabels();
updateIdentityShift();
renderAnalysisView();
cycleSystemInsights();
renderProgressLabel("landing");
initialiseLandingParallax();
