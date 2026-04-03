const screens = {
  landing: document.getElementById("landingScreen"),
  analysis: document.getElementById("analysisScreen"),
  meeting: document.getElementById("meetingScreen"),
  outcome: document.getElementById("outcomeScreen"),
};

const backgroundMusic = document.getElementById("backgroundMusic");
const progressLabel = document.getElementById("progressLabel");
const soundToggleButton = document.getElementById("soundToggleButton");
const soundToggleIcon = document.getElementById("soundToggleIcon");
const nameForm = document.getElementById("nameForm");
const playerNameInput = document.getElementById("playerName");
const identityShift = document.getElementById("identityShift");
const analysisPhaseTag = document.getElementById("analysisPhaseTag");
const analysisTitle = document.getElementById("analysisTitle");
const analysisIntro = document.getElementById("analysisIntro");
const analysisStateBadge = document.getElementById("analysisStateBadge");
const analysisDiscoveryView = document.getElementById("analysisDiscoveryView");
const situationNarrative = document.getElementById("situationNarrative");
const summariseButton = document.getElementById("summariseButton");
const summaryPanel = document.getElementById("summaryPanel");
const summaryProgressPill = document.getElementById("summaryProgressPill");
const briefingLaunchCard = document.getElementById("briefingLaunchCard");
const revealInsightButton = document.getElementById("revealInsightButton");
const summaryTensionValue = document.getElementById("summaryTensionValue");
const summarySignalsReviewedValue = document.getElementById("summarySignalsReviewedValue");
const summaryConfidenceValue = document.getElementById("summaryConfidenceValue");
const summaryContradictionValue = document.getElementById("summaryContradictionValue");
const analysisProgressPill = document.getElementById("analysisProgressPill");
const analysisCaptureStatus = document.getElementById("analysisCaptureStatus");
const analysisActionTitle = document.getElementById("analysisActionTitle");
const analysisActionHelper = document.getElementById("analysisActionHelper");
const analysisSignalHint = document.getElementById("analysisSignalHint");
const analysisConflictCallout = document.getElementById("analysisConflictCallout");
const enterMeetingButton = document.getElementById("enterMeetingButton");
const reviewSignalsButton = document.getElementById("reviewSignalsButton");
const backToBriefingButton = document.getElementById("backToBriefingButton");
const traceNote = document.getElementById("traceNote");
const tensionPill = document.getElementById("tensionPill");
const meetingStatusLabel = document.getElementById("meetingStatusLabel");
const meetingStepTag = document.getElementById("meetingStepTag");
const meetingStageTitle = document.getElementById("stageTitle");
const meetingStageSubtitle = document.getElementById("meetingStageSubtitle");
const meetingRoom = document.getElementById("meetingRoom");
const stakeholderStrip = document.getElementById("stakeholderStrip");
const meetingIntroOverlay = document.getElementById("meetingIntroOverlay");
const meetingIntroPrimary = document.getElementById("meetingIntroPrimary");
const meetingIntroSecondary = document.getElementById("meetingIntroSecondary");
const conversationTitle = document.getElementById("conversationTitle");
const conversationFeed = document.getElementById("conversationFeed");
const decisionPanel = document.getElementById("decisionPanel");
const assistantPanel = document.getElementById("assistantPanel");
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
const summarySegments = Array.from(document.querySelectorAll("[data-summary-card]"));
const summarySourceNotes = Array.from(document.querySelectorAll(".signal-source-note"));

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
  playerName: "",
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
  stage: "opening",
  tension: 2,
  testerMood: "concerned",
  poMood: "impatient",
  techLeadMood: "analytical",
  pmMood: "neutral",
  stakeholderTrust: 0,
  riskFocus: 0,
  deliveryFocus: 0,
  facilitationScore: 0,
  reviewedSources: [],
  lastAnalysisFeedback: "",
  synthesisStep: 0,
  summaryMetricsAnimated: false,
  conversationLog: [],
  typingIndicators: [],
  activePrompt: null,
  activeSpeakerKey: "",
  copilotOpen: false,
  stageStatus: "Room coming online",
  lastAssistContext: {
    title: "AI Copilot",
    lines: [],
  },
  meetingContext: {
    opening: "",
    recovery: "",
    followUp: "",
    bridge: "",
    framing: "",
    path: "",
  },
  selections: {
    opening: null,
    recovery: null,
    followUp: null,
    framing: null,
    recommendation: null,
  },
  aiSummaryShown: false,
  latestConversationEntryId: "",
});

let state = defaultState();
let hesitationTimer;
let meetingIntroTimers = [];
let summaryMetricTimers = [];
let conversationFlowTimers = [];
let conversationFlowToken = 0;
let tensionShiftTimer;
let mediaFadeFrame = 0;
let conversationEntrySerial = 0;
let lastAnimatedConversationEntryId = "";

const soundState = {
  enabled: false,
  context: null,
  masterGain: null,
  suspendTimer: 0,
};

function updateSoundToggleUI() {
  if (!soundToggleButton || !soundToggleIcon) {
    return;
  }

  const soundLabel = `Sound: ${soundState.enabled ? "On" : "Off"}`;
  soundToggleButton.setAttribute("aria-pressed", String(soundState.enabled));
  soundToggleButton.setAttribute("aria-label", soundLabel);
  soundToggleButton.setAttribute("title", soundLabel);
  soundToggleIcon.textContent = soundState.enabled ? "🔊" : "🔇";
}

function getBackgroundTrackSource() {
  if (!backgroundMusic) {
    return "";
  }

  return backgroundMusic.currentSrc || backgroundMusic.getAttribute("src") || "";
}

function fadeMediaTrack(targetVolume) {
  if (!backgroundMusic) {
    return;
  }

  const startVolume = Number(backgroundMusic.volume || 0);
  const animationStart = performance.now();
  const fadeDuration = 900;

  window.cancelAnimationFrame(mediaFadeFrame);

  if (targetVolume > 0) {
    backgroundMusic.loop = true;
    backgroundMusic.play().catch(() => {});
  }

  const animate = (now) => {
    const progress = Math.min((now - animationStart) / fadeDuration, 1);
    backgroundMusic.volume = startVolume + (targetVolume - startVolume) * progress;

    if (progress < 1) {
      mediaFadeFrame = window.requestAnimationFrame(animate);
      return;
    }

    if (targetVolume === 0) {
      backgroundMusic.pause();
    }
  };

  mediaFadeFrame = window.requestAnimationFrame(animate);
}

function createAmbientSoundscape() {
  if (soundState.context) {
    return soundState.context;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  const context = new AudioContextClass();
  const masterGain = context.createGain();
  const filter = context.createBiquadFilter();
  const shimmerOscillator = context.createOscillator();
  const shimmerDepth = context.createGain();
  const padFrequencies = [174.61, 220, 261.63];
  const padLevels = [0.18, 0.08, 0.05];

  masterGain.gain.value = 0;
  masterGain.connect(context.destination);

  filter.type = "lowpass";
  filter.frequency.value = 760;
  filter.Q.value = 0.5;
  filter.connect(masterGain);

  padFrequencies.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const oscillatorGain = context.createGain();
    const vibrato = context.createOscillator();
    const vibratoDepth = context.createGain();

    oscillator.type = index === 0 ? "sine" : "triangle";
    oscillator.frequency.value = frequency;
    oscillatorGain.gain.value = padLevels[index];

    vibrato.type = "sine";
    vibrato.frequency.value = 0.035 + index * 0.01;
    vibratoDepth.gain.value = frequency * 0.008;

    oscillator.connect(oscillatorGain);
    oscillatorGain.connect(filter);

    vibrato.connect(vibratoDepth);
    vibratoDepth.connect(oscillator.frequency);

    oscillator.start();
    vibrato.start();
  });

  shimmerOscillator.type = "sine";
  shimmerOscillator.frequency.value = 0.028;
  shimmerDepth.gain.value = 140;
  shimmerOscillator.connect(shimmerDepth);
  shimmerDepth.connect(filter.frequency);
  shimmerOscillator.start();

  soundState.context = context;
  soundState.masterGain = masterGain;

  return context;
}

function fadeAmbientSound(targetGain) {
  if (!soundState.context || !soundState.masterGain) {
    return;
  }

  const now = soundState.context.currentTime;
  const currentGain = soundState.masterGain.gain.value;

  soundState.masterGain.gain.cancelScheduledValues(now);
  soundState.masterGain.gain.setValueAtTime(currentGain, now);
  soundState.masterGain.gain.linearRampToValueAtTime(targetGain, now + 1.1);
}

function setSoundEnabled(enabled) {
  soundState.enabled = enabled;
  updateSoundToggleUI();

  if (soundState.suspendTimer) {
    window.clearTimeout(soundState.suspendTimer);
    soundState.suspendTimer = 0;
  }

  if (getBackgroundTrackSource()) {
    fadeMediaTrack(enabled ? 0.42 : 0);
    return;
  }

  const context = createAmbientSoundscape();
  if (!context) {
    return;
  }

  if (enabled) {
    context.resume().catch(() => {});
    fadeAmbientSound(0.18);
    return;
  }

  fadeAmbientSound(0);
  soundState.suspendTimer = window.setTimeout(() => {
    soundState.context?.suspend().catch(() => {});
  }, 1200);
}

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

function updateStakeholderStripState() {
  if (!stakeholderStrip) {
    return;
  }

  if (!screens.meeting.classList.contains("screen-active")) {
    stakeholderStrip.classList.remove("is-stuck");
    return;
  }

  const stripTop = stakeholderStrip.getBoundingClientRect().top;
  stakeholderStrip.classList.toggle("is-stuck", stripTop <= 12);
}

const stakeholderDirectory = {
  tester: {
    role: "Tester",
    name: "Sarah Chen",
    shortName: "Sarah",
  },
  productOwner: {
    role: "Product Owner",
    name: "James Carter",
    shortName: "James",
  },
  projectManager: {
    role: "Project Manager",
    name: "Emily Wong",
    shortName: "Emily",
  },
  techLead: {
    role: "Tech Lead",
    name: "Daniel Novak",
    shortName: "Daniel",
  },
};

const meetingReactionCopy = {
  tester: {
    concerned: { text: "Concerned about defects", tone: "neutral" },
    engaged: { text: "Walking through defect risk", tone: "positive" },
    supported: { text: "Feels customer risk is recognised", tone: "positive" },
    frustrated: { text: "Feels risk is being minimised", tone: "negative" },
  },
  productOwner: {
    impatient: { text: "Watching delivery pressure", tone: "neutral" },
    engaged: { text: "Explaining commitment pressure", tone: "positive" },
    supported: { text: "Feels delivery is recognised", tone: "positive" },
    defensive: { text: "Defending release commitment", tone: "negative" },
  },
  techLead: {
    analytical: { text: "Evaluating technical impact", tone: "neutral" },
    engaged: { text: "Clarifying feasibility", tone: "positive" },
    withdrawn: { text: "Needs more precise framing", tone: "negative" },
  },
  projectManager: {
    neutral: { text: "Holding the room together", tone: "neutral" },
    aligned: { text: "Alignment is improving", tone: "positive" },
    active: { text: "Stepping in to steady the room", tone: "negative" },
  },
};

const assistantKickoff = [
  "Your opening will shape the tone of the discussion.",
  "Keep customer risk, delivery pressure, and decision structure visible.",
  "Guide the room toward a recommendation instead of a circular debate.",
];

const openingChoices = [
  {
    id: "structured",
    label: "Structured Opening",
    headline:
      "Let's align first on release readiness, key risks, and the decision we need to make today.",
    preview: "Best for calm structure, trust, and lower tension.",
    text:
      "Let's align first on release readiness, key risks, and the decision we need to make today.",
    feedback: "The room settles quickly because your opening gives everyone a shared structure.",
    assistant: [
      "This opening gives the room a clear structure.",
      "Choose deliberately which pressure you want to surface next.",
    ],
    delta: {
      facilitationScore: 2,
      stakeholderTrust: 1,
      riskFocus: 1,
      tension: -1,
      pmMood: "aligned",
    },
    reactions: [
      { speaker: "Emily", text: "That gives us a good structure.", variant: "stakeholder" },
      {
        speaker: "Sarah",
        text: "Thanks. I'd like to start with the defect risk.",
        variant: "stakeholder",
      },
      {
        speaker: "James",
        text: "Fine, but we also need to stay grounded in delivery impact.",
        variant: "stakeholder",
      },
      {
        speaker: "Daniel",
        text: "That works. Let's be clear on what is actually at risk.",
        variant: "stakeholder",
      },
    ],
    notes: [
      "Opening created a clear structure for the room.",
      "Release readiness, risk, and the decision were named early.",
    ],
  },
  {
    id: "quick",
    label: "Quick Check-in",
    headline: "Quick check-in from everyone — how are we looking for release?",
    preview: "Faster and lighter, but the room still needs firmer control.",
    text: "Quick check-in from everyone — how are we looking for release?",
    feedback: "The room answers, but it is still looking to you for stronger facilitation.",
    assistant: [
      "This keeps momentum, but the room may drift without more structure.",
      "Use your next move to take control of the discussion.",
    ],
    delta: {
      deliveryFocus: 1,
    },
    reactions: [
      {
        speaker: "Emily",
        text: "We may need more structure if views differ.",
        variant: "stakeholder",
      },
      {
        speaker: "Sarah",
        text: "From my side, there are still some serious defects.",
        variant: "stakeholder",
      },
      {
        speaker: "James",
        text: "We're close, and we need to keep momentum.",
        variant: "stakeholder",
      },
      {
        speaker: "Daniel",
        text: "It depends how we define readiness.",
        variant: "stakeholder",
      },
    ],
    notes: [
      "Opening kept the room moving, but structure remained light.",
      "Delivery momentum was acknowledged early.",
    ],
  },
  {
    id: "direct",
    label: "Direct Challenge",
    headline: "Why are we still considering release when there are unresolved issues?",
    preview: "Raises pressure quickly and can reduce trust if not recovered.",
    text: "Why are we still considering release when there are unresolved issues?",
    feedback: "The room feels the pressure immediately, and Emily steps in to keep it constructive.",
    assistant: [
      "The risk concern is visible now, but the room needs a more balanced tone.",
      "Recover with structure or use a precise technical question to regain trust.",
    ],
    delta: {
      facilitationScore: -1,
      stakeholderTrust: -1,
      riskFocus: 2,
      tension: 1,
      testerMood: "supported",
      poMood: "defensive",
      pmMood: "active",
    },
    reactions: [
      { speaker: "Emily", text: "Let's keep this constructive.", variant: "stakeholder" },
      {
        speaker: "Sarah",
        text: "I agree the risks need attention.",
        variant: "stakeholder",
      },
      {
        speaker: "James",
        text: "That's not a balanced way to frame this.",
        variant: "stakeholder",
      },
      {
        speaker: "Daniel",
        text: "We should avoid jumping to conclusions before reviewing impact.",
        variant: "stakeholder",
      },
    ],
    notes: [
      "Opening sharply raised concern about unresolved issues.",
      "Room tension increased and the framing felt less balanced.",
    ],
  },
];

const challengeRecoveryChoices = [
  {
    id: "reframe",
    label: "Reframe More Neutrally",
    headline: "Reset the tone without losing sight of the risk.",
    preview: "Best for restoring balance and trust after the challenge.",
    text:
      "Let me reframe that. We need to review the impact clearly before we decide the release path.",
    feedback: "The room responds better once you reset the tone and bring the discussion back to impact.",
    assistant: [
      "That helps steady the room.",
      "Now choose the pressure you want to surface first.",
    ],
    delta: {
      facilitationScore: 1,
      stakeholderTrust: 1,
      tension: -1,
      poMood: "impatient",
      pmMood: "neutral",
    },
    reactions: [
      { speaker: "Emily", text: "That's a better way to frame it.", variant: "stakeholder" },
      { speaker: "James", text: "Fine. Let's stay balanced then.", variant: "stakeholder" },
      {
        speaker: "Daniel",
        text: "Good. Then let's be precise about the impact.",
        variant: "stakeholder",
      },
    ],
    notes: ["Direct challenge was reframed into a more balanced discussion."],
    next: "followupChoice",
  },
  {
    id: "double_down",
    label: "Double Down on Risk",
    headline: "Keep pressing on customer risk even if the room stiffens.",
    preview: "Strengthens the risk lens, but raises tension further.",
    text:
      "The customer risk is still the main concern here, so let's stay with that for a moment.",
    feedback: "The risk stance is clear, but James becomes more defensive and Emily wants the room grounded again.",
    assistant: [
      "You kept the risk lens front and center.",
      "Bring in evidence quickly or the room may split harder.",
    ],
    delta: {
      riskFocus: 1,
      stakeholderTrust: -1,
      tension: 1,
      testerMood: "supported",
      poMood: "defensive",
      pmMood: "active",
    },
    reactions: [
      {
        speaker: "Sarah",
        text: "I'm glad we're not moving past that too quickly.",
        variant: "stakeholder",
      },
      {
        speaker: "James",
        text: "We're still talking as if delay is already decided.",
        variant: "stakeholder",
      },
      {
        speaker: "Emily",
        text: "Let's make sure this still comes back to a decision.",
        variant: "stakeholder",
      },
    ],
    notes: ["Risk remained the dominant frame, increasing pressure in the room."],
    next: "testerFollowup",
  },
  {
    id: "invite_tech",
    label: "Invite Tech Lead to Provide Context",
    headline: "Use Daniel's technical view to regain precision.",
    preview: "Best for calming the room with feasibility detail.",
    text: "Daniel, give us the technical context before we take a position.",
    feedback: "The room becomes more analytical once Daniel is invited in with a precise question.",
    assistant: [
      "This redirects the room toward facts and feasibility.",
      "Use Daniel's answer to decide whether to widen the trade-off discussion.",
    ],
    delta: {
      facilitationScore: 1,
      stakeholderTrust: 1,
      tension: -1,
      techLeadMood: "engaged",
      pmMood: "neutral",
    },
    reactions: [
      {
        speaker: "Daniel",
        text: "Good. Let's talk about the actual impact rather than assumptions.",
        variant: "stakeholder",
      },
      {
        speaker: "Emily",
        text: "That helps bring the conversation back into structure.",
        variant: "stakeholder",
      },
    ],
    notes: ["Tech context was brought in to stabilise the conversation."],
    next: "techLeadFollowup",
  },
];

const followUpPromptCopy = {
  structured: {
    title: "Who do you respond to first?",
    prompt: "Choose which pressure you want the room to examine first.",
  },
  quick: {
    title: "How do you take control of the discussion?",
    prompt: "The room has spoken. Now decide how you will structure the next part.",
  },
  recovered: {
    title: "How do you steady the room now?",
    prompt: "You have reset the tone. Choose the pressure you want to surface next.",
  },
};

const followUpBranches = {
  tester: {
    speakerKey: "tester",
    stageTag: "Tester Concern",
    title: "Sarah is detailing the defect risk.",
    subtitle: "Customer impact is now the clearest signal in the room.",
    status: "Risk signal under review",
    titleForFeed: "Tester concern",
    hostText:
      "Sarah, can you walk us through the defect severity and what may impact customers?",
    delta: {
      testerMood: "engaged",
      riskFocus: 2,
      stakeholderTrust: 1,
      facilitationScore: 1,
    },
    reactions: [
      {
        speaker: "Sarah",
        text:
          "There are three high severity defects. Two could affect existing customers if we release without further action.",
        variant: "stakeholder",
      },
      {
        speaker: "James",
        text: "Are we sure they're severe enough to justify delay?",
        variant: "stakeholder",
      },
      {
        speaker: "Daniel",
        text: "We should separate confirmed impact from possible impact.",
        variant: "stakeholder",
      },
      {
        speaker: "Emily",
        text: "Let's capture the customer-facing risk clearly.",
        variant: "stakeholder",
      },
    ],
    assistant: [
      "You've surfaced the strongest risk signal in the room.",
      "Now validate the technical impact, explore the delivery consequence, or summarise the trade-off.",
    ],
    notes: [
      "Sarah detailed three high severity defects.",
      "Two defects may affect existing customers.",
    ],
    options: [
      {
        id: "tester_to_tech",
        label: "Ask Daniel to Validate Technical Impact",
        headline: "Pressure-test the production risk before the room decides.",
        preview: "Tightens the evidence behind the risk case.",
        text:
          "Daniel, can you validate the technical impact and what the worst-case production behaviour might be?",
        delta: {
          techLeadMood: "engaged",
          riskFocus: 1,
          facilitationScore: 1,
        },
        reactions: [
          {
            speaker: "Daniel",
            text:
              "Yes. Two of these defects could alter production behaviour, but we need to stay precise about the worst-case impact.",
            variant: "stakeholder",
          },
          {
            speaker: "Emily",
            text: "That gives us a firmer technical footing for the decision.",
            variant: "stakeholder",
          },
        ],
        notes: ["Daniel was asked to validate the production impact of the defects."],
        assistant: [
          "Good move. The room now has a stronger technical basis for the risk discussion.",
          "Use that clarity to frame the overall trade-off next.",
        ],
      },
      {
        id: "tester_to_po",
        label: "Ask James to Explain Delivery Consequences",
        headline: "Bring the cost of delay into view before the room hardens.",
        preview: "Balances the risk discussion with delivery pressure.",
        text:
          "James, what would a delay mean for the release commitment and stakeholder confidence?",
        delta: {
          poMood: "engaged",
          deliveryFocus: 1,
          facilitationScore: 1,
        },
        reactions: [
          {
            speaker: "James",
            text:
              "A delay would create immediate pressure with stakeholders and raise questions about delivery confidence.",
            variant: "stakeholder",
          },
          {
            speaker: "Emily",
            text: "That helps keep the business consequence visible too.",
            variant: "stakeholder",
          },
        ],
        notes: ["Delivery consequence of delay was brought into the discussion."],
        assistant: [
          "Now the room can see both the customer risk and the delivery consequence.",
          "This is a good setup for explicit trade-off framing.",
        ],
      },
      {
        id: "tester_to_tradeoff",
        label: "Summarise the Risk and Move Toward Trade-off Discussion",
        headline: "Show the room you are integrating what you heard.",
        preview: "Builds trust by moving from detail into decision framing.",
        text:
          "So far, we have credible customer risk on the table. Let's move toward the trade-off explicitly.",
        delta: {
          facilitationScore: 1,
          stakeholderTrust: 1,
        },
        reactions: [
          {
            speaker: "Emily",
            text: "That summary helps. We can work from that.",
            variant: "stakeholder",
          },
          {
            speaker: "Daniel",
            text: "Agreed. We should keep the trade-off specific.",
            variant: "stakeholder",
          },
        ],
        notes: ["Risk was summarised and linked to the coming trade-off discussion."],
        assistant: [
          "You're moving the room from evidence into facilitation.",
          "Make the trade-off explicit next.",
        ],
      },
    ],
  },
  techLead: {
    speakerKey: "techLead",
    stageTag: "Technical View",
    title: "Daniel is outlining the technical impact.",
    subtitle: "The room is now focusing on technical feasibility and worst-case behaviour.",
    status: "Technical impact under review",
    titleForFeed: "Tech Lead view",
    hostText: "Daniel, from a technical perspective, how significant is the release risk?",
    delta: {
      techLeadMood: "engaged",
      riskFocus: 1,
      facilitationScore: 1,
      stakeholderTrust: 1,
    },
    reactions: [
      {
        speaker: "Daniel",
        text:
          "Two of the defects could affect production behaviour, but we need to be precise about worst-case impact.",
        variant: "stakeholder",
      },
      {
        speaker: "Sarah",
        text: "That still points to material customer risk.",
        variant: "stakeholder",
      },
      {
        speaker: "James",
        text: "If there's uncertainty, we shouldn't overreact either.",
        variant: "stakeholder",
      },
      {
        speaker: "Emily",
        text: "Let's keep both risk and delivery impact visible.",
        variant: "stakeholder",
      },
    ],
    assistant: [
      "Daniel has put the risk on a more precise footing.",
      "Now decide whether you want more customer detail, more delivery consequence, or direct trade-off framing.",
    ],
    notes: [
      "Daniel clarified that two defects could affect production behaviour.",
      "The room still needs precision about worst-case impact.",
    ],
    options: [
      {
        id: "tech_to_tester",
        label: "Ask Sarah to Clarify Customer Risk",
        headline: "Bring the customer-facing consequence into sharper focus.",
        preview: "Best for grounding the technical point in user impact.",
        text: "Sarah, can you clarify what the customer-facing risk actually looks like?",
        delta: {
          testerMood: "engaged",
          riskFocus: 1,
          facilitationScore: 1,
        },
        reactions: [
          {
            speaker: "Sarah",
            text:
              "The payment issue is the clearest customer risk. If it appears in production, it affects live outcomes immediately.",
            variant: "stakeholder",
          },
          {
            speaker: "Emily",
            text: "That makes the customer impact more concrete.",
            variant: "stakeholder",
          },
        ],
        notes: ["Customer-facing impact was clarified after the technical view."],
        assistant: [
          "Good. The room now has both technical and customer language for the risk.",
          "Use that to frame the broader decision.",
        ],
      },
      {
        id: "tech_to_po",
        label: "Ask James What a Delay Would Mean",
        headline: "Balance the technical picture with delivery consequence.",
        preview: "Best for surfacing the business pressure without losing structure.",
        text: "James, what would a delay mean in practical terms for this release?",
        delta: {
          poMood: "engaged",
          deliveryFocus: 1,
          facilitationScore: 1,
        },
        reactions: [
          {
            speaker: "James",
            text:
              "It means immediate stakeholder pressure, replanning, and a loss of confidence in the release commitment.",
            variant: "stakeholder",
          },
          {
            speaker: "Emily",
            text: "That helps keep the delivery consequence explicit.",
            variant: "stakeholder",
          },
        ],
        notes: ["Delivery impact of a delay was made explicit after the technical view."],
        assistant: [
          "Now both sides of the trade-off are visible.",
          "Frame the decision so the room can compare them clearly.",
        ],
      },
      {
        id: "tech_to_balance",
        label: "Frame a Balanced Trade-off Discussion",
        headline: "Move the room from technical detail into decision framing.",
        preview: "Best for facilitation quality and room alignment.",
        text:
          "Let's put both the technical risk and the delivery impact on the table together before we decide.",
        delta: {
          facilitationScore: 1,
          stakeholderTrust: 1,
          riskFocus: 1,
          deliveryFocus: 1,
        },
        reactions: [
          {
            speaker: "Emily",
            text: "That's a useful shift from evidence into decision framing.",
            variant: "stakeholder",
          },
          {
            speaker: "James",
            text: "As long as delivery impact stays visible, that's fair.",
            variant: "stakeholder",
          },
        ],
        notes: ["The discussion moved from technical detail into trade-off framing."],
        assistant: [
          "Strong facilitation move.",
          "Make the trade-off explicit next so the room can align around it.",
        ],
      },
    ],
  },
  productOwner: {
    speakerKey: "productOwner",
    stageTag: "Delivery Pressure",
    title: "James is outlining the delivery commitment.",
    subtitle: "The business consequence of delay is now active in the room.",
    status: "Delivery pressure under review",
    titleForFeed: "Product Owner pressure",
    hostText:
      "James, can you talk us through the delivery commitment and what happens if we delay?",
    delta: {
      poMood: "engaged",
      deliveryFocus: 2,
      stakeholderTrust: 1,
      facilitationScore: 1,
    },
    reactions: [
      {
        speaker: "James",
        text:
          "The release timing has already been communicated. Any delay will create pressure with stakeholders and reduce confidence in delivery.",
        variant: "stakeholder",
      },
      {
        speaker: "Sarah",
        text: "That doesn't remove the customer risk.",
        variant: "stakeholder",
      },
      {
        speaker: "Daniel",
        text: "We still need to understand what releasing now actually means technically.",
        variant: "stakeholder",
      },
      {
        speaker: "Emily",
        text: "We're clearly balancing competing pressures.",
        variant: "stakeholder",
      },
    ],
    assistant: [
      "The delivery pressure is now explicit.",
      "Bring risk back in, test feasibility, or summarise the trade-off before the room polarises.",
    ],
    notes: [
      "James confirmed the release commitment has already been communicated.",
      "Delay would reduce confidence in delivery.",
    ],
    options: [
      {
        id: "po_to_risk",
        label: "Bring Risk Back into the Discussion",
        headline: "Rebalance the room before delivery pressure takes over.",
        preview: "Best for showing that business pressure does not erase customer risk.",
        text:
          "We also need to bring the customer risk back into focus before we decide anything.",
        delta: {
          testerMood: "supported",
          riskFocus: 1,
          facilitationScore: 1,
        },
        reactions: [
          {
            speaker: "Sarah",
            text: "Yes. That's the part I'm most concerned about.",
            variant: "stakeholder",
          },
          {
            speaker: "Emily",
            text: "Good. That keeps both sides visible.",
            variant: "stakeholder",
          },
        ],
        notes: ["Customer risk was brought back in after delivery pressure surfaced."],
        assistant: [
          "You prevented the discussion from becoming one-sided.",
          "Now frame the trade-off clearly for the room.",
        ],
      },
      {
        id: "po_to_tech",
        label: "Ask Daniel for Feasibility View",
        headline: "Use technical precision to test what release now would really mean.",
        preview: "Best for grounding the delivery pressure in feasibility.",
        text: "Daniel, from a feasibility perspective, what would releasing now actually mean?",
        delta: {
          techLeadMood: "engaged",
          riskFocus: 1,
          facilitationScore: 1,
        },
        reactions: [
          {
            speaker: "Daniel",
            text:
              "It means accepting real uncertainty around production behaviour. That's workable only if we tighten the scope or controls.",
            variant: "stakeholder",
          },
          {
            speaker: "Emily",
            text: "That gives us a more grounded view of the feasible options.",
            variant: "stakeholder",
          },
        ],
        notes: ["Daniel was asked to test the feasibility of releasing under pressure."],
        assistant: [
          "Good. The room now has a more defensible technical basis.",
          "Use that to frame the trade-off explicitly.",
        ],
      },
      {
        id: "po_to_tradeoff",
        label: "Summarise the Delivery Trade-off",
        headline: "Show the room you are integrating delivery pressure into the decision frame.",
        preview: "Best for staying balanced without reacting too quickly.",
        text:
          "So the delivery pressure is real. Let's make sure we frame the trade-off clearly before we decide.",
        delta: {
          deliveryFocus: 1,
          facilitationScore: 1,
          stakeholderTrust: 1,
        },
        reactions: [
          {
            speaker: "Emily",
            text: "That's the right move. We need the trade-off clearly on the table.",
            variant: "stakeholder",
          },
          {
            speaker: "James",
            text: "Agreed, as long as the delivery impact stays visible.",
            variant: "stakeholder",
          },
        ],
        notes: ["Delivery pressure was summarised and linked to decision framing."],
        assistant: [
          "You're keeping the room out of a binary argument.",
          "Frame the trade-off clearly next.",
        ],
      },
    ],
  },
};

function showScreen(screenKey) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.classList.toggle("screen-active", key === screenKey);
  });
  backToBriefingButton?.classList.toggle("hidden", screenKey !== "analysis");
  renderProgressLabel(screenKey);
  updateStakeholderStripState();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function clampScore(value) {
  return Math.max(0, Math.min(100, value));
}

function clampGauge(value, min = -8, max = 12) {
  return Math.max(min, Math.min(max, value));
}

function getTensionText() {
  return {
    1: "Low",
    2: "Medium",
    3: "High",
  }[state.tension] || "Medium";
}

function applyMeetingDelta(delta = {}) {
  state.tension = Math.max(1, Math.min(3, state.tension + (delta.tension || 0)));
  state.stakeholderTrust = clampGauge(
    state.stakeholderTrust + (delta.stakeholderTrust || 0),
    -6,
    12
  );
  state.riskFocus = clampGauge(state.riskFocus + (delta.riskFocus || 0), 0, 12);
  state.deliveryFocus = clampGauge(state.deliveryFocus + (delta.deliveryFocus || 0), 0, 12);
  state.facilitationScore = clampGauge(
    state.facilitationScore + (delta.facilitationScore || 0),
    -4,
    12
  );

  if (delta.testerMood) {
    state.testerMood = delta.testerMood;
  }

  if (delta.poMood) {
    state.poMood = delta.poMood;
  }

  if (delta.techLeadMood) {
    state.techLeadMood = delta.techLeadMood;
  }

  if (delta.pmMood) {
    state.pmMood = delta.pmMood;
  }

  updateTension();
}

function updateTension() {
  const tension = getTensionText();
  const previous = tensionLabel.textContent;
  tensionLabel.textContent = tension;
  tensionPill.dataset.level = tension.toLowerCase();
  if (previous && previous !== tension) {
    tensionPill.classList.remove("is-shifting");
    void tensionPill.offsetWidth;
    tensionPill.classList.add("is-shifting");
    clearTimeout(tensionShiftTimer);
    const direction =
      (previous === "Low" && tension !== "Low") ||
      (previous === "Medium" && tension === "High")
        ? "\u2191"
        : "\u2193";
    meetingStatusLabel.textContent = `Tension ${direction} ${tension}`;
    tensionShiftTimer = setTimeout(() => {
      tensionPill.classList.remove("is-shifting");
      meetingStatusLabel.textContent = state.stageStatus || "Room active";
    }, 1200);
  }
}

function buildRoomReactions(overrides = {}) {
  const baseReactions = {
    tester:
      meetingReactionCopy.tester[state.testerMood] || meetingReactionCopy.tester.concerned,
    techLead:
      meetingReactionCopy.techLead[state.techLeadMood] || meetingReactionCopy.techLead.analytical,
    productOwner:
      meetingReactionCopy.productOwner[state.poMood] || meetingReactionCopy.productOwner.impatient,
    projectManager:
      meetingReactionCopy.projectManager[state.pmMood] ||
      meetingReactionCopy.projectManager.neutral,
  };

  return {
    ...baseReactions,
    ...overrides,
  };
}

function syncRoomReactions(overrides = {}) {
  setStakeholderReactions(buildRoomReactions(overrides));
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
  state.activeSpeakerKey = stakeholderKey || "";
  renderStakeholderActivity();
}

function getPlayerName() {
  return state.playerName.trim() || "You";
}

function clearHesitationNudge() {
  clearTimeout(hesitationTimer);
}

function clearMeetingIntroSequence() {
  meetingIntroTimers.forEach((timerId) => clearTimeout(timerId));
  meetingIntroTimers = [];
}

function clearConversationFlow() {
  conversationFlowToken += 1;
  conversationFlowTimers.forEach((timerId) => clearTimeout(timerId));
  conversationFlowTimers = [];
  state.typingIndicators = [];
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
    state.stageStatus = status;
    meetingStatusLabel.textContent = status;
  }
}

function addConversationEntry(entry) {
  if (entry.id && state.conversationLog.some((item) => item.id === entry.id)) {
    return;
  }

  const conversationEntry = {
    ...entry,
    _conversationId: `conversation-${++conversationEntrySerial}`,
  };

  state.latestConversationEntryId = conversationEntry._conversationId;
  state.conversationLog.push(conversationEntry);
}

function addConversationEntries(entries) {
  entries.forEach((entry) => addConversationEntry(entry));
}

function getSpeakerKey(speaker) {
  const map = {
    Sarah: "tester",
    James: "productOwner",
    Daniel: "techLead",
    Emily: "projectManager",
  };

  return map[speaker] || "";
}

function renderStakeholderActivity() {
  const typingKeys = state.typingIndicators.map((indicator) => indicator.key).filter(Boolean);
  const focusKey = state.activeSpeakerKey || typingKeys[0] || "";

  Object.entries(stakeholderCards).forEach(([key, card]) => {
    const isPreactive = typingKeys.includes(key);
    const isActive = key === state.activeSpeakerKey;
    const isDimmed = Boolean(focusKey) && !isPreactive && !isActive;
    const isIdle = !isPreactive && !isActive && !isDimmed;

    card.classList.toggle("is-speaking", isActive);
    card.classList.toggle("is-typing", isPreactive);
    card.classList.toggle("speaker-active", isActive);
    card.classList.toggle("speaker-preactive", isPreactive);
    card.classList.toggle("speaker-dimmed", isDimmed);
    card.classList.toggle("speaker-idle", isIdle);
  });
}

function setTypingIndicators(indicators = []) {
  state.typingIndicators = indicators;
  renderStakeholderActivity();
  renderConversation(conversationTitle.textContent || "Room feed");
}

function scrollConversationToBottom() {
  requestAnimationFrame(() => {
    conversationFeed.scrollTo({
      top: conversationFeed.scrollHeight,
      behavior: "smooth",
    });
  });
}

function renderConversationPrompt() {
  if (!state.activePrompt) {
    return null;
  }

  const wrapper = document.createElement("section");
  wrapper.className = "conversation-prompt-card";

  const promptMarkup = [];
  if (state.activePrompt.eyebrow) {
    promptMarkup.push(`<p class="conversation-prompt-eyebrow">${state.activePrompt.eyebrow}</p>`);
  }
  if (state.activePrompt.title) {
    promptMarkup.push(`<h4>${state.activePrompt.title}</h4>`);
  }
  if (state.activePrompt.prompt) {
    promptMarkup.push(`<p>${state.activePrompt.prompt}</p>`);
  }
  if (state.activePrompt.helper) {
    promptMarkup.push(`<p class="conversation-prompt-helper">${state.activePrompt.helper}</p>`);
  }

  wrapper.innerHTML = promptMarkup.join("");

  const actions = document.createElement("div");
  actions.className = "conversation-choice-list";
  state.activePrompt.options.forEach((optionNode) => {
    optionNode.classList.add("conversation-choice-button");
    actions.appendChild(optionNode);
  });
  wrapper.appendChild(actions);
  return wrapper;
}

function renderConversation(title, entries = state.conversationLog) {
  conversationTitle.textContent = title;
  conversationFeed.innerHTML = "";

  entries.forEach((entry, index) => {
    const article = document.createElement("article");
    const previousEntry = entries[index - 1];
    const speakerKey = getSpeakerKey(entry.speaker);
    const speakerLabel =
      entry.variant === "host" ? `You (${entry.speaker})` : entry.speaker;
    article.className = `conversation-message ${entry.variant}`;
    if (entry.variant === "stakeholder" && previousEntry?.variant === "stakeholder") {
      article.classList.add("is-interrupt");
    }
    if (entry.variant === "stakeholder" && speakerKey) {
      article.classList.add(`speaker-${speakerKey}`);
    }
    if (
      entry._conversationId &&
      entry._conversationId === state.latestConversationEntryId &&
      entry._conversationId !== lastAnimatedConversationEntryId
    ) {
      article.classList.add("message-enter");
      if (entry.variant === "host") {
        article.classList.add("message-enter-user");
      }
      lastAnimatedConversationEntryId = entry._conversationId;
    }
    article.innerHTML = `
      <span class="conversation-speaker">${speakerLabel}</span>
      <p>${entry.text.replaceAll("\n", "<br><br>")}</p>
    `;
    conversationFeed.appendChild(article);
  });

  const promptNode = renderConversationPrompt();
  if (promptNode) {
    conversationFeed.appendChild(promptNode);
  }

  renderStakeholderActivity();
  scrollConversationToBottom();
}

function scheduleCopilotNudge(lines, title = "AI Copilot", delay = 4200) {
  clearHesitationNudge();
  hesitationTimer = setTimeout(() => {
    renderAssistant(title, lines);
    if (
      state.tension >= 3 ||
      ["riskEscalation", "deliveryPressure", "technicalClarification"].includes(state.stage)
    ) {
      setCopilotOpen(true);
    } else {
      aiAssistButton?.classList.add("has-alert");
    }
  }, delay);
}

function renderResponseShell({ eyebrow, title, prompt, helper, options }) {
  state.activePrompt = {
    eyebrow,
    title,
    prompt,
    helper,
    options: Array.from(options?.children || []),
  };
  decisionPanel.hidden = true;
  renderConversation(conversationTitle.textContent || "Room feed");
}

function waitForConversationStep(ms, token = conversationFlowToken) {
  return new Promise((resolve) => {
    const timerId = setTimeout(() => {
      resolve(token === conversationFlowToken);
    }, ms);
    conversationFlowTimers.push(timerId);
  });
}

function getConversationPaceFactor() {
  return {
    1: 1.08,
    2: 1,
    3: 0.88,
  }[state.tension] || 1;
}

function getConversationTimings(entry, previousEntry) {
  const paceFactor = getConversationPaceFactor();
  const isInterruptStyle =
    entry.variant === "stakeholder" &&
    previousEntry?.variant === "stakeholder" &&
    state.tension >= 2;

  if (entry.variant === "system") {
    return {
      pre: Math.round(520 * paceFactor),
      hold: Math.round(420 * paceFactor),
      settle: 0,
    };
  }

  if (entry.variant === "host") {
    return {
      pre: Math.round(180 * paceFactor),
      hold: Math.round(430 * paceFactor),
      settle: 0,
    };
  }

  return {
    pre: Math.round((isInterruptStyle ? 280 : 340) * paceFactor),
    hold: Math.round((isInterruptStyle ? 720 : 940) * paceFactor),
    settle: Math.round((isInterruptStyle ? 260 : 380) * paceFactor),
  };
}

async function playConversationSequence(title, entries) {
  const token = ++conversationFlowToken;
  state.activePrompt = null;
  setTypingIndicators([]);
  renderConversation(title);

  for (const [index, entry] of entries.entries()) {
    const speakerKey = getSpeakerKey(entry.speaker);
    const previousEntry = entries[index - 1];
    const timings = getConversationTimings(entry, previousEntry);

    if (entry.variant === "stakeholder") {
      setTypingIndicators([{ key: speakerKey, speaker: entry.speaker }]);
      const keepGoing = await waitForConversationStep(timings.pre, token);
      if (!keepGoing) {
        return false;
      }
    } else if (timings.pre > 0) {
      const keepGoing = await waitForConversationStep(timings.pre, token);
      if (!keepGoing) {
        return false;
      }
    }

    setTypingIndicators([]);
    addConversationEntry(entry);
    highlightSpeaker(speakerKey);
    renderConversation(title);

    const keepGoing = await waitForConversationStep(timings.hold, token);
    if (!keepGoing) {
      return false;
    }

    if (entry.variant === "stakeholder" && timings.settle > 0) {
      highlightSpeaker("");
      renderStakeholderActivity();
      const settled = await waitForConversationStep(timings.settle, token);
      if (!settled) {
        return false;
      }
    }
  }

  setTypingIndicators([]);
  highlightSpeaker("");
  return true;
}

function buildConversationCue(text) {
  return {
    speaker: "Room",
    text,
    variant: "system",
  };
}

function updateHostLabels() {
  situationNarrative.textContent = "You now have enough context to lead the meeting.";
}

function clearSummaryMetricAnimation() {
  summaryMetricTimers.forEach((timerId) => clearTimeout(timerId));
  summaryMetricTimers = [];
}

function formatSourceTrace(sourceIds) {
  const sourceLabels = sourceIds
    .map((sourceId) => analysisSourceLabels[sourceId])
    .filter(Boolean);

  if (!sourceLabels.length) {
    return "Referenced from reviewed source signals.";
  }

  if (sourceLabels.length === 1) {
    return `Referenced from reviewed ${sourceLabels[0]}.`;
  }

  return `Referenced from reviewed ${sourceLabels.slice(0, -1).join(", ")} and ${sourceLabels.at(-1)}.`;
}

function showTraceSources(sourceIds) {
  traceNote.textContent = formatSourceTrace(sourceIds);
  traceNote.classList.remove("hidden");
  traceNote.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function resetSummarySourceNotes() {
  summarySourceNotes.forEach((note) => {
    note.textContent = "";
    note.classList.add("hidden");
  });
}

function setSummaryMetricsStatic() {
  if (summarySignalsReviewedValue) {
    summarySignalsReviewedValue.textContent = "3/3";
  }
  if (summaryConfidenceValue) {
    summaryConfidenceValue.textContent = "High";
  }
  if (summaryContradictionValue) {
    summaryContradictionValue.textContent = "Yes";
    summaryContradictionValue.classList.add("is-live");
  }
}

function animateSummaryMetrics() {
  clearSummaryMetricAnimation();

  if (summarySignalsReviewedValue) {
    summarySignalsReviewedValue.textContent = "0/3";
  }
  if (summaryConfidenceValue) {
    summaryConfidenceValue.textContent = "Calibrating";
  }
  if (summaryContradictionValue) {
    summaryContradictionValue.textContent = "Scanning";
    summaryContradictionValue.classList.remove("is-live");
  }

  ["1/3", "2/3", "3/3"].forEach((value, index) => {
    summaryMetricTimers.push(
      setTimeout(() => {
        if (summarySignalsReviewedValue) {
          summarySignalsReviewedValue.textContent = value;
        }
      }, 240 * (index + 1))
    );
  });

  summaryMetricTimers.push(
    setTimeout(() => {
      if (summaryConfidenceValue) {
        summaryConfidenceValue.textContent = "High";
      }
    }, 860)
  );

  summaryMetricTimers.push(
    setTimeout(() => {
      if (summaryContradictionValue) {
        summaryContradictionValue.textContent = "Yes";
        summaryContradictionValue.classList.add("is-live");
      }
    }, 1080)
  );

  state.summaryMetricsAnimated = true;
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
  const enteredName = playerNameInput.value.trim();
  analysisIntro.textContent = enteredName
    ? `${enteredName}, please review the signals before making a decision.`
    : "Please review the signals before making a decision.";
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

function renderSummarySequence() {
  const revealedInsightCount = Math.max(0, Math.min(state.synthesisStep, 4));

  if (summaryProgressPill) {
    summaryProgressPill.textContent = `${revealedInsightCount}/4 insights revealed`;
  }

  if (briefingLaunchCard) {
    briefingLaunchCard.classList.toggle("hidden", state.synthesisStep > 0);
  }

  if (summaryTensionValue) {
    summaryTensionValue.textContent = tensionLabel.textContent;
  }

  summarySegments.forEach((segment) => {
    const step = Number(segment.dataset.summaryCard || "0");
    const isRevealed = state.synthesisStep >= step;
    const isCurrent = step > 0 && state.synthesisStep === step && step < 5;
    const isComplete = isRevealed && state.synthesisStep > step;

    segment.classList.toggle("hidden", !isRevealed);
    segment.classList.toggle("is-revealed", isRevealed);
    segment.classList.toggle("is-current", isCurrent);
    segment.classList.toggle("is-complete", isComplete);
  });

  if (!state.summaryMetricsAnimated) {
    animateSummaryMetrics();
  } else {
    setSummaryMetricsStatic();
  }
}

function renderAnalysisView() {
  renderAnalysisHeader();
  renderAnalysisSources();
  renderAnalysisAction();
  analysisDiscoveryView.classList.toggle("hidden", state.aiSummaryShown);
  summaryPanel.classList.toggle("hidden", !state.aiSummaryShown);
  if (!state.aiSummaryShown) {
    clearSummaryMetricAnimation();
    resetSummarySourceNotes();
    if (briefingLaunchCard) {
      briefingLaunchCard.classList.remove("hidden");
    }
    traceNote.textContent = "";
    traceNote.classList.add("hidden");
  } else {
    renderSummarySequence();
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
  const lines = Array.isArray(contentLines) ? contentLines : [];
  state.lastAssistContext = {
    title,
    lines,
  };
  assistantHeading.textContent = title;
  assistantContent.innerHTML = "";
  lines.forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    assistantContent.appendChild(li);
  });

  if (!state.copilotOpen && screens.meeting.classList.contains("screen-active")) {
    aiAssistButton?.classList.add("has-alert");
  }
}

function setCopilotOpen(isOpen) {
  state.copilotOpen = isOpen;
  assistantPanel?.classList.toggle("is-open", isOpen);
  if (assistantPanel) {
    assistantPanel.hidden = !isOpen;
    assistantPanel.setAttribute("aria-hidden", String(!isOpen));
  }
  aiAssistButton?.classList.toggle("is-open", isOpen);
  aiAssistButton?.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) {
    aiAssistButton?.classList.remove("has-alert");
  }
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

    state.activePrompt = null;
    renderConversation(conversationTitle.textContent || "Room feed");
    handler(option);
  });
  return button;
}

function renderFeedback(message, callback) {
  addConversationEntry({
    speaker: "Room",
    text: message,
    variant: "system",
  });
  renderConversation(conversationTitle.textContent || "Room feed");

  const token = conversationFlowToken;
  const timerId = setTimeout(() => {
    if (token === conversationFlowToken) {
      callback();
    }
  }, Math.round(960 * getConversationPaceFactor()));
  conversationFlowTimers.push(timerId);
}

function renderOpeningMove() {
  state.stage = "opening";
  state.activePrompt = null;
  highlightSpeaker("");
  setMeetingStage({
    tag: "Opening Move",
    title: "Everyone is looking at you to begin.",
    subtitle: "Your opening will shape the tone of the room.",
    status: "Awaiting your opening",
  });

  renderConversation("Opening beat");
  renderAssistant("AI Copilot", assistantKickoff);
  scheduleCopilotNudge([
    "You may want to clarify the purpose first.",
    "A structured opening will help the room settle quickly.",
  ]);

  const options = document.createElement("div");
  options.className = "option-list";

  openingChoices.forEach((choice) => {
    options.appendChild(
      buildOptionButton(choice, async () => {
        clearHesitationNudge();
        state.selections.opening = choice.label;
        state.meetingContext.opening = choice.id;
        applyMeetingDelta(choice.delta);
        syncRoomReactions();
        addNotes(choice.notes);
        const completed = await playConversationSequence("Opening responses", [
          {
            speaker: getPlayerName(),
            text: choice.text,
            variant: "host",
          },
          ...choice.reactions,
        ]);
        if (!completed) {
          return;
        }
        renderAssistant("AI Copilot", [
          ...choice.assistant,
          `Tension now: ${getTensionText()}.`,
        ]);
        renderFeedback(choice.feedback, () => {
          if (choice.id === "direct") {
            renderChallengeRecovery();
            return;
          }

          renderFollowUpChoice(choice.id === "quick" ? "quick" : "structured");
        });
      })
    );
  });

  renderResponseShell({
    eyebrow: "How do you open the meeting?",
    title: "Choose how you want the room to hear you first.",
    prompt:
      "This move will influence trust, tension, and how quickly the room aligns around the real issue.",
    options,
  });
}

function renderChallengeRecovery() {
  state.stage = "challengeRecovery";
  state.activePrompt = null;
  highlightSpeaker("projectManager");
  setMeetingStage({
    tag: "Tone Recovery",
    title: "The room needs a steadier frame.",
    subtitle: "Recover the tone or channel the pressure into a more precise line of discussion.",
    status: "Tension rising",
  });

  renderConversation("Recovery moment");
  renderAssistant("AI Copilot", [
    "The room felt the challenge sharply.",
    "Recover with balance or pivot into a precise question to regain control.",
  ]);
  scheduleCopilotNudge([
    "A calmer reframe can rebuild trust quickly.",
    "If you keep pressing, be ready to back it with evidence.",
  ]);

  const options = document.createElement("div");
  options.className = "option-list";

  challengeRecoveryChoices.forEach((choice) => {
    options.appendChild(
      buildOptionButton(choice, async () => {
        clearHesitationNudge();
        state.selections.recovery = choice.label;
        state.meetingContext.recovery = choice.id;
        applyMeetingDelta(choice.delta);
        syncRoomReactions();
        addNotes(choice.notes);
        const completed = await playConversationSequence("Recovery responses", [
          {
            speaker: getPlayerName(),
            text: choice.text,
            variant: "host",
          },
          ...choice.reactions,
        ]);
        if (!completed) {
          return;
        }
        renderAssistant("AI Copilot", [
          ...choice.assistant,
          `Tension now: ${getTensionText()}.`,
        ]);
        renderFeedback(choice.feedback, () => {
          if (choice.next === "followupChoice") {
            renderFollowUpChoice("recovered");
            return;
          }

          if (choice.next === "testerFollowup") {
            renderFollowUpNode("tester");
            return;
          }

          renderFollowUpNode("techLead");
        });
      })
    );
  });

  renderResponseShell({
    eyebrow: "How do you recover or continue?",
    title: "Decide how you want to handle the tension you just created.",
    prompt:
      "This is your chance to either rebalance the room or lean harder into one side of the conflict.",
    options,
  });
}

function renderFollowUpChoice(mode = "structured") {
  state.stage = "followupChoice";
  state.activePrompt = null;
  const copy = followUpPromptCopy[mode] || followUpPromptCopy.structured;

  highlightSpeaker("");
  setMeetingStage({
    tag: "First Follow-up",
    title: copy.title,
    subtitle: "The first voice you amplify will shape what the room treats as the main pressure.",
    status: "Discussion opening up",
  });

  renderConversation("Choosing the next signal");
  renderAssistant("AI Copilot", [
    mode === "quick"
      ? "The room still needs stronger structure from you."
      : "Choose the next signal you want the room to examine closely.",
    "This move will influence whether the discussion leans toward risk, delivery, or balance.",
  ]);
  scheduleCopilotNudge([
    "Starting with the right signal helps you control the meeting instead of chasing it.",
    "Think about which pressure the room needs to understand first.",
  ]);

  const choiceLabels =
    mode === "quick"
      ? {
          tester: "Ask Tester to Explain the Defects",
          techLead: "Ask Tech Lead to Define Readiness",
          productOwner: "Ask PO to Explain Delivery Impact",
        }
      : {
          tester: "Address Tester Concern",
          techLead: "Ask Tech Lead for Impact View",
          productOwner: "Acknowledge Product Owner Pressure",
        };

  const options = document.createElement("div");
  options.className = "option-list";

  [
    {
      key: "tester",
      label: choiceLabels.tester,
      headline: "Surface the customer and defect risk first.",
      preview: "Best for bringing the strongest risk signal into the room immediately.",
    },
    {
      key: "techLead",
      label: choiceLabels.techLead,
      headline: "Bring technical feasibility into the centre of the discussion.",
      preview: "Best for grounding the room in actual production impact.",
    },
    {
      key: "productOwner",
      label: choiceLabels.productOwner,
      headline: "Bring delivery pressure and commitment into the conversation.",
      preview: "Best for exposing the business consequence of delay early.",
    },
  ].forEach((choice) => {
    options.appendChild(
      buildOptionButton(choice, () => {
        clearHesitationNudge();
        state.selections.followUp = choice.label;
        state.meetingContext.followUp = choice.key;
        renderFollowUpNode(choice.key);
      })
    );
  });

  renderResponseShell({
    eyebrow: "Who do you go to next?",
    title: copy.title,
    prompt: copy.prompt,
    helper: "Project Manager alignment will come later once the room has enough context.",
    options,
  });
}

async function renderFollowUpNode(branchKey) {
  state.stage = "followup";
  state.activePrompt = null;
  const branch = followUpBranches[branchKey];

  if (!branch) {
    return;
  }

  highlightSpeaker(branch.speakerKey);
  setMeetingStage({
    tag: branch.stageTag,
    title: branch.title,
    subtitle: branch.subtitle,
    status: branch.status,
  });

  applyMeetingDelta(branch.delta);
  syncRoomReactions();
  addNotes(branch.notes);
  const completed = await playConversationSequence(branch.titleForFeed, [
    {
      speaker: getPlayerName(),
      text: branch.hostText,
      variant: "host",
    },
    ...branch.reactions,
  ]);
  if (!completed) {
    return;
  }
  renderAssistant("AI Copilot", branch.assistant);
  scheduleCopilotNudge(branch.assistant);

  const options = document.createElement("div");
  options.className = "option-list";

  branch.options.forEach((option) => {
    options.appendChild(
      buildOptionButton(option, async () => {
        clearHesitationNudge();
        state.meetingContext.bridge = option.id;
        applyMeetingDelta(option.delta);
        syncRoomReactions();
        addNotes(option.notes);
        const completed = await playConversationSequence(branch.titleForFeed, [
          {
            speaker: getPlayerName(),
            text: option.text,
            variant: "host",
          },
          ...option.reactions,
        ]);
        if (!completed) {
          return;
        }
        renderAssistant("AI Copilot", [
          ...option.assistant,
          `Tension now: ${getTensionText()}.`,
        ]);
        renderFeedback(
          "The room now has enough detail to decide how the discussion should be framed.",
          () => {
            renderFramingChoice();
          }
        );
      })
    );
  });

  renderResponseShell({
    eyebrow: "What do you do next?",
    title: "Choose how you guide the room from signal into decision framing.",
    prompt:
      "This move decides whether the room stays analytical, becomes more polarised, or starts aligning.",
    options,
  });
}

function renderFramingChoice() {
  state.stage = "framing";
  state.activePrompt = null;
  highlightSpeaker("projectManager");
  setMeetingStage({
    tag: "Decision Framing",
    title: "How do you frame the discussion now?",
    subtitle: "This is where the room either aligns around the trade-off or starts to split.",
    status: "Trade-off being framed",
  });

  renderConversation("Framing the room");
  renderAssistant("AI Copilot", [
    "This is the facilitation moment that shapes the recommendation path.",
    "Choose a stance that shows judgement, not just preference.",
  ]);
  scheduleCopilotNudge([
    "A balanced frame often lowers tension and increases trust.",
    "A one-sided frame may strengthen one stakeholder while weakening another.",
  ]);

  const options = document.createElement("div");
  options.className = "option-list";

  [
    {
      id: "risk",
      label: "Focus on Risk",
      headline:
        "Before anything else, we need to understand whether customers could be impacted.",
      preview: "Strengthens the risk lens, but can increase tension with delivery stakeholders.",
    },
    {
      id: "delivery",
      label: "Focus on Delivery Impact",
      headline:
        "We need to understand whether a delay creates more harm than the current defect risk.",
      preview: "Strengthens the commitment lens, but can frustrate risk-focused stakeholders.",
    },
    {
      id: "balance",
      label: "Balance Both Sides",
      headline:
        "Let's make the trade-off explicit: customer risk on one side, delivery commitment on the other.",
      preview: "Best for facilitation quality, trust, and room alignment.",
    },
  ].forEach((option) => {
    options.appendChild(
      buildOptionButton(option, async () => {
        clearHesitationNudge();
        state.selections.framing = option.label;
        state.meetingContext.framing = option.id;

        let delta = {};
        let reactions = [];
        let notes = [];
        let assistantLines = [];
        let feedback = "";

        if (option.id === "risk") {
          delta = {
            riskFocus: 2,
            tension: 1,
            testerMood: "supported",
            poMood: state.poMood === "engaged" ? "defensive" : "impatient",
            pmMood: "active",
          };
          reactions = [
            { speaker: "Sarah", text: "That's the right priority.", variant: "stakeholder" },
            {
              speaker: "James",
              text: "We also need to remember delivery isn't optional.",
              variant: "stakeholder",
            },
            {
              speaker: "Daniel",
              text: "That works if we keep the assessment specific.",
              variant: "stakeholder",
            },
            {
              speaker: "Emily",
              text: "Let's make sure we don't lose the broader decision context.",
              variant: "stakeholder",
            },
          ];
          notes = [
            "Discussion framed around customer impact risk first.",
            "Delivery concern became more defensive.",
          ];
          assistantLines = [
            "Risk is now the dominant lens in the room.",
            "Be ready to acknowledge delivery pressure before making your call.",
          ];
          feedback =
            "The room accepts the risk focus, but delivery tension is now more visible.";
        }

        if (option.id === "delivery") {
          delta = {
            deliveryFocus: 2,
            tension: 1,
            poMood: "supported",
            testerMood: "frustrated",
            pmMood: "active",
          };
          reactions = [
            { speaker: "James", text: "Exactly. We need a proportionate decision.", variant: "stakeholder" },
            {
              speaker: "Sarah",
              text: "I'm concerned we're minimising the defect severity.",
              variant: "stakeholder",
            },
            {
              speaker: "Daniel",
              text: "We need evidence either way.",
              variant: "stakeholder",
            },
            {
              speaker: "Emily",
              text: "This is where the room could split if we're not careful.",
              variant: "stakeholder",
            },
          ];
          notes = [
            "Discussion framed around delivery consequence first.",
            "Tester confidence dropped as risk felt underweighted.",
          ];
          assistantLines = [
            "Delivery pressure is now the dominant lens.",
            "Acknowledge risk before you recommend release or the room may resist.",
          ];
          feedback =
            "The delivery lens is clear, but the room now needs stronger risk acknowledgement.";
        }

        if (option.id === "balance") {
          delta = {
            facilitationScore: 2,
            stakeholderTrust: 2,
            riskFocus: 1,
            deliveryFocus: 1,
            tension: -1,
            pmMood: "aligned",
          };
          reactions = [
            { speaker: "Emily", text: "That's a helpful way to frame it.", variant: "stakeholder" },
            {
              speaker: "Sarah",
              text: "As long as the customer risk is clear.",
              variant: "stakeholder",
            },
            {
              speaker: "James",
              text: "And as long as delivery impact is part of the decision.",
              variant: "stakeholder",
            },
            {
              speaker: "Daniel",
              text: "That gives us a better basis for deciding.",
              variant: "stakeholder",
            },
          ];
          notes = [
            "Trade-off was framed explicitly between customer risk and delivery commitment.",
            "Room alignment improved once both sides were made visible.",
          ];
          assistantLines = [
            "This is the strongest facilitation stance in the room.",
            "The recommendation path is likely to feel more balanced now.",
          ];
          feedback =
            "The room is more aligned because you made the trade-off explicit without taking sides too early.";
        }

        applyMeetingDelta(delta);
        syncRoomReactions();
        addNotes(notes);
        const completed = await playConversationSequence("Framing responses", [
          {
            speaker: getPlayerName(),
            text: option.headline,
            variant: "host",
          },
          ...reactions,
        ]);
        if (!completed) {
          return;
        }
        renderAssistant("AI Copilot", [
          ...assistantLines,
          `Tension now: ${getTensionText()}.`,
        ]);
        renderFeedback(feedback, () => {
          renderPathDecision();
        });
      })
    );
  });

  renderResponseShell({
    eyebrow: "Facilitation stance",
    title: "How do you frame the discussion now?",
    prompt:
      "Choose the stance that best helps the room think clearly about the release decision.",
    options,
  });
}

function resolveMeetingPath() {
  if (state.meetingContext.framing === "balance" && state.facilitationScore >= 4) {
    return "alignment";
  }

  if (state.meetingContext.framing === "risk" && state.tension >= 3) {
    return "riskEscalation";
  }

  if (state.meetingContext.framing === "delivery") {
    return "deliveryPressure";
  }

  if (Math.abs(state.riskFocus - state.deliveryFocus) <= 1 && state.facilitationScore >= 4) {
    return "alignment";
  }

  if (state.riskFocus > state.deliveryFocus) {
    return "riskEscalation";
  }

  return "deliveryPressure";
}

function renderRecommendationStage({
  eyebrow = "Your recommendation",
  title = "What is your recommendation?",
  prompt = "The room needs a clear direction before the meeting can close.",
  helper = "Your recommendation will affect stakeholder trust, system risk, and business impact.",
} = {}) {
  state.stage = "recommendation";
  state.activePrompt = null;
  highlightSpeaker("projectManager");
  setMeetingStage({
    tag: "Final Recommendation",
    title,
    subtitle: "The team now needs a clear call from you.",
    status: "Recommendation pending",
  });

  renderConversation("Final recommendation");
  renderAssistant("AI Copilot", [
    "Connect the recommendation to customer impact, delivery consequence, and decision confidence.",
    "The strongest recommendation is the one the room can defend after the meeting ends.",
  ]);
  scheduleCopilotNudge([
    "Name the trade-off clearly before landing the call.",
    "The room will look for confidence, balance, and follow-through.",
  ]);

  const options = document.createElement("div");
  options.className = "option-list";

  [
    {
      key: "release",
      label: "Recommend Full Release",
      headline: "Proceed with release as planned.",
      preview: "Highest delivery momentum, highest residual system risk.",
    },
    {
      key: "delay",
      label: "Recommend Delay",
      headline: "Delay the release until the risk is reduced.",
      preview: "Strongest risk reduction, but highest delivery consequence.",
    },
    {
      key: "controlled",
      label: "Recommend Controlled Release",
      headline: "Proceed with a controlled release and clear safeguards.",
      preview: "Most balanced path between delivery pressure and risk control.",
    },
  ].forEach((option) => {
    options.appendChild(
      buildOptionButton(option, () => {
        submitRecommendation(option.key);
      })
    );
  });

  renderResponseShell({
    eyebrow,
    title,
    prompt,
    helper,
    options,
  });
}

async function renderTechnicalClarificationStage() {
  state.stage = "technicalClarification";
  state.activePrompt = null;
  highlightSpeaker("techLead");
  setMeetingStage({
    tag: "Technical Clarification",
    title: "Daniel is tightening the risk picture.",
    subtitle: "One final technical clarification can make the recommendation more defensible.",
    status: "Clarifying the final risk picture",
  });

  applyMeetingDelta({
    techLeadMood: "engaged",
    riskFocus: 1,
    facilitationScore: 1,
    stakeholderTrust: 1,
  });
  syncRoomReactions();
  addNotes([
    "Daniel clarified that a narrower controlled release is the safer technical option.",
    "Final recommendation now has stronger technical grounding.",
  ]);
  const completed = await playConversationSequence("Technical clarification", [
    {
      speaker: getPlayerName(),
      text: "Daniel, before we decide, give us the clearest technical read on the downside.",
      variant: "host",
    },
    {
      speaker: "Daniel",
      text:
        "If we release the full scope now, we accept a real chance of customer impact. A narrower controlled release is the safer technical option.",
      variant: "stakeholder",
    },
    {
      speaker: "Emily",
      text: "That's clearer. We can make the call from there.",
      variant: "stakeholder",
    },
  ]);
  if (!completed) {
    return;
  }
  renderAssistant("AI Copilot", [
    "That clarification improves decision confidence.",
    "A controlled release is now easier for the room to defend.",
  ]);
  renderFeedback("The room has a sharper technical basis for the final recommendation.", () => {
    renderRecommendationStage({
      title: "What recommendation do you make now?",
      prompt: "Daniel has clarified the downside. Choose the path forward.",
    });
  });
}

async function renderRiskRecentreStage() {
  state.stage = "riskRecentre";
  state.activePrompt = null;
  highlightSpeaker("tester");
  setMeetingStage({
    tag: "Risk Re-centre",
    title: "Sarah needs the risk acknowledged before the room closes.",
    subtitle: "A quick re-centre can restore confidence before the final call.",
    status: "Re-centering on risk",
  });

  applyMeetingDelta({
    testerMood: "supported",
    riskFocus: 1,
    facilitationScore: 1,
    tension: -1,
    stakeholderTrust: 1,
    pmMood: "aligned",
  });
  syncRoomReactions();
  addNotes([
    "Customer risk was explicitly re-centred before the final recommendation.",
    "Tester confidence improved after the risk acknowledgement.",
  ]);
  const completed = await playConversationSequence("Risk re-centred", [
    {
      speaker: getPlayerName(),
      text:
        "Before we close, I want to re-centre us on the customer risk so the decision is fully grounded.",
      variant: "host",
    },
    {
      speaker: "Sarah",
      text: "Thank you. That's the part I needed to hear acknowledged.",
      variant: "stakeholder",
    },
    {
      speaker: "Emily",
      text: "Good. That gives us a stronger basis for the decision.",
      variant: "stakeholder",
    },
  ]);
  if (!completed) {
    return;
  }
  renderAssistant("AI Copilot", [
    "Good recovery. The room now has a more balanced decision basis.",
    "Make the recommendation while the trade-off is clear.",
  ]);
  renderFeedback("The room feels more balanced again after the risk was re-centred.", () => {
    renderRecommendationStage({
      title: "What is your recommendation now?",
      prompt: "The room has both risk and delivery pressure in view. Make the call.",
    });
  });
}

async function renderPathDecision() {
  const path = resolveMeetingPath();
  state.meetingContext.path = path;
  state.activePrompt = null;

  if (path === "alignment") {
    state.stage = "alignmentPath";
    highlightSpeaker("projectManager");
    setMeetingStage({
      tag: "Alignment Path",
      title: "The room is moving toward alignment.",
      subtitle: "Structure is holding and the recommendation now matters most.",
      status: "Alignment building",
    });

    applyMeetingDelta({ pmMood: "aligned" });
    syncRoomReactions();
    addNotes(["Emily signalled that the room is closer to alignment."]);
    const completed = await playConversationSequence("Alignment path", [
      {
        speaker: "Emily",
        text: "We're closer to alignment. What recommendation are you leaning toward?",
        variant: "stakeholder",
      },
    ]);
    if (!completed) {
      return;
    }
    renderAssistant("AI Copilot", [
      "The room is ready for a recommendation.",
      "A controlled release may balance both pressures most credibly.",
    ]);
    renderRecommendationStage({
      title: "The room is ready for your recommendation.",
      prompt: "Choose the direction you believe this room can align around and defend.",
    });
    return;
  }

  if (path === "riskEscalation") {
    state.stage = "riskEscalation";
    highlightSpeaker("projectManager");
    setMeetingStage({
      tag: "Risk Escalation",
      title: "The room is pushing back on unresolved risk.",
      subtitle: "Risk is dominating, but the room still needs a decision.",
      status: "Risk pressure high",
    });

    applyMeetingDelta({ pmMood: "active" });
    syncRoomReactions();
    addNotes([
      "Risk discussion escalated and James pushed for a clearer release-blocking view.",
    ]);
    const completed = await playConversationSequence("Risk escalation", [
      {
        speaker: "James",
        text:
          "We're spending a lot of time on risk without deciding whether it's actually release-blocking.",
        variant: "stakeholder",
      },
      {
        speaker: "Sarah",
        text: "Because it could affect customers.",
        variant: "stakeholder",
      },
      {
        speaker: "Emily",
        text: "We need to bring this back to a decision.",
        variant: "stakeholder",
      },
    ]);
    if (!completed) {
      return;
    }
    renderAssistant("AI Copilot", [
      "Acknowledge delivery pressure before making your call.",
      "If needed, ask Daniel for one final clarification to sharpen the choice.",
    ]);
    scheduleCopilotNudge([
      "Controlled release can help if you need to acknowledge both sides quickly.",
      "Delay is defensible if you want to hold the risk line firmly.",
    ]);

    const options = document.createElement("div");
    options.className = "option-list";

    [
      {
        label: "Acknowledge PO and Recommend Controlled Release",
        headline:
          "I hear the delivery pressure. My recommendation is a controlled release with safeguards and close follow-up.",
        preview: "Best for lowering tension while still respecting risk.",
        action: () => submitRecommendation("controlled", {
          hostText:
            "I hear the delivery pressure. My recommendation is a controlled release with safeguards and close follow-up.",
        }),
      },
      {
        label: "Hold Firm and Recommend Delay",
        headline:
          "Given the unresolved customer-impacting risk, my recommendation is to delay the release.",
        preview: "Best for protecting users, but it will keep delivery tension high.",
        action: () => submitRecommendation("delay", {
          hostText:
            "Given the unresolved customer-impacting risk, my recommendation is to delay the release.",
        }),
      },
      {
        label: "Ask for One Last Technical Clarification",
        headline: "Use Daniel's view to sharpen the final recommendation before you commit.",
        preview: "Best if you want one more defensible technical anchor before deciding.",
        action: () => renderTechnicalClarificationStage(),
      },
    ].forEach((option) => {
      options.appendChild(
        buildOptionButton(option, () => {
          option.action();
        })
      );
    });

    renderResponseShell({
      eyebrow: "Decision pressure",
      title: "How do you move the room toward a call?",
      prompt:
        "The tension is high. Choose whether to balance, hold the risk line, or ask for one more technical anchor.",
      options,
    });
    return;
  }

  state.stage = "deliveryPressure";
  highlightSpeaker("projectManager");
  setMeetingStage({
    tag: "Delivery Pressure",
    title: "The room is leaning too hard toward the deadline.",
    subtitle: "Risk now needs more explicit acknowledgement before the recommendation lands.",
    status: "Delivery pressure high",
  });

  applyMeetingDelta({ pmMood: "active" });
  syncRoomReactions();
  addNotes([
    "Sarah and Daniel both signalled that delivery pressure is outrunning risk clarity.",
  ]);
  const completed = await playConversationSequence("Delivery pressure path", [
    {
      speaker: "Sarah",
      text: "I need to be clear — I don't think the customer risk has been fully addressed.",
      variant: "stakeholder",
    },
    {
      speaker: "Daniel",
      text: "We still need to be precise about what we're accepting.",
      variant: "stakeholder",
    },
    {
      speaker: "Emily",
      text: "Can we close the gap before deciding?",
      variant: "stakeholder",
    },
  ]);
  if (!completed) {
    return;
  }
  renderAssistant("AI Copilot", [
    "Risk acknowledgement is needed before recommending release.",
    "A quick re-centre can improve confidence without losing momentum.",
  ]);
  scheduleCopilotNudge([
    "If you push ahead with release, be prepared for mixed trust.",
    "Controlled release can still work if you pair it with safeguards.",
  ]);

  const options = document.createElement("div");
  options.className = "option-list";

  [
    {
      label: "Pause and Re-centre on Risk",
      headline: "Acknowledge the customer risk before making the final recommendation.",
      preview: "Best for rebuilding trust before the room commits.",
      action: () => renderRiskRecentreStage(),
    },
    {
      label: "Push Ahead and Recommend Release",
      headline: "My recommendation is to proceed with release as planned.",
      preview: "Keeps momentum, but trust may stay mixed.",
      action: () =>
        submitRecommendation("release", {
          hostText: "My recommendation is to proceed with release as planned.",
        }),
    },
    {
      label: "Recommend Controlled Release with Safeguards",
      headline:
        "My recommendation is a controlled release with clear safeguards and close follow-up.",
      preview: "Best for balancing risk acknowledgement with delivery momentum.",
      action: () =>
        submitRecommendation("controlled", {
          hostText:
            "My recommendation is a controlled release with clear safeguards and close follow-up.",
        }),
    },
  ].forEach((option) => {
    options.appendChild(
      buildOptionButton(option, () => {
        option.action();
      })
    );
  });

  renderResponseShell({
    eyebrow: "Decision pressure",
    title: "How do you close the gap before the final call?",
    prompt:
      "Risk still needs acknowledgement. Decide whether to re-centre, push ahead, or balance both sides with a controlled recommendation.",
    options,
  });
}

function calculateOutcomeScores(recommendationKey) {
  let trust =
    54 +
    state.stakeholderTrust * 5 +
    state.facilitationScore * 4 -
    (state.tension - 1) * 6;
  let risk = 54 - state.riskFocus * 4 + state.tension * 5;
  let business =
    48 +
    state.deliveryFocus * 5 -
    Math.max(0, state.riskFocus - state.deliveryFocus - 1) * 2;

  if (state.meetingContext.path === "alignment") {
    trust += 8;
  }

  if (state.meetingContext.path === "riskEscalation") {
    trust -= 4;
    risk += 4;
  }

  if (state.meetingContext.path === "deliveryPressure") {
    risk += 6;
    trust -= 2;
    business += 4;
  }

  if (recommendationKey === "release") {
    trust -= 4;
    risk += 18;
    business += 18;
  }

  if (recommendationKey === "delay") {
    risk -= 20;
    business -= 16;
    trust += 2;
  }

  if (recommendationKey === "controlled") {
    trust += 10;
    risk -= 8;
    business += 10;
  }

  return {
    trust: clampScore(trust),
    risk: clampScore(risk),
    business: clampScore(business),
  };
}

async function submitRecommendation(recommendationKey, overrides = {}) {
  clearHesitationNudge();

  const recommendationConfig = {
    release: {
      hostText: "My recommendation is to proceed with release as planned.",
      value: "Proceed with release as planned",
      delta: {
        deliveryFocus: 2,
        tension: 1,
        stakeholderTrust: state.riskFocus < 2 ? -1 : 0,
        testerMood: "frustrated",
        poMood: "supported",
        techLeadMood: "analytical",
        pmMood: "neutral",
      },
      reactions: [
        { speaker: "James", text: "Good. We need to move.", variant: "stakeholder" },
        {
          speaker: "Sarah",
          text: "I'm not comfortable with that without stronger mitigation.",
          variant: "stakeholder",
        },
        {
          speaker: "Daniel",
          text: "We'll need close monitoring if we do this.",
          variant: "stakeholder",
        },
        {
          speaker: "Emily",
          text: "Okay, but we need clear actions and ownership.",
          variant: "stakeholder",
        },
      ],
      notes: [
        "Recommendation made: proceed with release as planned.",
        "Mitigation and ownership now matter immediately.",
      ],
      assistant: [
        "Delivery momentum is protected, but the room still carries visible risk.",
        "Expect mixed alignment and stronger follow-up needs.",
      ],
      feedback:
        "The room has a direction, but confidence is mixed because the unresolved risk is still visible.",
    },
    delay: {
      hostText: "My recommendation is to delay the release until the risk is reduced.",
      value: "Delay the release",
      delta: {
        riskFocus: 2,
        deliveryFocus: -1,
        tension: state.poMood === "defensive" ? 1 : 0,
        testerMood: "supported",
        poMood: "defensive",
        techLeadMood: "engaged",
        pmMood: "active",
      },
      reactions: [
        { speaker: "Sarah", text: "I support that.", variant: "stakeholder" },
        {
          speaker: "James",
          text: "That has real delivery consequences.",
          variant: "stakeholder",
        },
        {
          speaker: "Daniel",
          text: "From a risk perspective, that is defensible.",
          variant: "stakeholder",
        },
        {
          speaker: "Emily",
          text: "We'll need a communication plan immediately.",
          variant: "stakeholder",
        },
      ],
      notes: [
        "Recommendation made: delay the release until risk is reduced.",
        "Communication planning is now urgent.",
      ],
      assistant: [
        "Risk is materially reduced by this decision.",
        "Business impact remains visible and will need active management.",
      ],
      feedback:
        "The room accepts the risk rationale, even though delivery consequences are now more pronounced.",
    },
    controlled: {
      hostText:
        "My recommendation is a controlled release with clear safeguards and close follow-up.",
      value: "Controlled release",
      delta: {
        riskFocus: 1,
        deliveryFocus: 1,
        facilitationScore: 2,
        stakeholderTrust: 2,
        tension: -1,
        testerMood: "supported",
        poMood: "supported",
        techLeadMood: "engaged",
        pmMood: "aligned",
      },
      reactions: [
        {
          speaker: "Sarah",
          text: "That's more acceptable if the risky areas are contained.",
          variant: "stakeholder",
        },
        {
          speaker: "James",
          text: "I can work with that.",
          variant: "stakeholder",
        },
        {
          speaker: "Daniel",
          text: "That gives us a technically safer path.",
          variant: "stakeholder",
        },
        {
          speaker: "Emily",
          text: "That sounds like the most balanced recommendation.",
          variant: "stakeholder",
        },
      ],
      notes: [
        "Recommendation made: controlled release with safeguards and close follow-up.",
        "The room aligned more strongly around a balanced path.",
      ],
      assistant: [
        "This is the most balanced recommendation for the room.",
        "It protects delivery momentum while acknowledging the unresolved risk explicitly.",
      ],
      feedback:
        "The room has a more balanced direction now, with stronger alignment around practical safeguards.",
    },
  };

  const config = recommendationConfig[recommendationKey];

  if (!config) {
    return;
  }

  state.stage = "recommendationCommitted";
  state.selections.recommendation = config.value;
  applyMeetingDelta(config.delta);
  syncRoomReactions({
    projectManager: { text: "Decision recorded", tone: "positive" },
  });
  addNotes(config.notes);
  const completed = await playConversationSequence("Recommendation shared", [
    {
      speaker: getPlayerName(),
      text: overrides.hostText || config.hostText,
      variant: "host",
    },
    ...config.reactions,
  ]);
  if (!completed) {
    return;
  }
  renderAssistant("AI Copilot", [
    ...config.assistant,
    `Final room tension: ${getTensionText()}.`,
  ]);
  state.scores = calculateOutcomeScores(recommendationKey);
  renderFeedback(config.feedback, () => {
    renderOutcome();
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
  const playerName = state.playerName.trim();
  const decision = state.selections.recommendation || "Partial release";
  const signOff = playerName ? `\n${playerName}` : "";

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

Regards,${signOff}`;
}

function getMeetingParticipants() {
  return [
    stakeholderCards.tester,
    stakeholderCards.productOwner,
    stakeholderCards.projectManager,
    stakeholderCards.techLead,
  ].filter(Boolean);
}

function resetMeetingRoomVisuals() {
  clearHesitationNudge();
  clearMeetingIntroSequence();
  clearConversationFlow();
  clearTimeout(tensionShiftTimer);
  meetingIntroOverlay.classList.remove("is-active");
  meetingIntroPrimary.textContent = "Connecting the room...";
  meetingIntroSecondary.textContent = "Mission control is preparing the discussion space.";
  conversationTitle.textContent = "Room feed";
  conversationFeed.innerHTML = "";
  state.latestConversationEntryId = "";
  lastAnimatedConversationEntryId = "";
  state.activePrompt = null;
  state.activeSpeakerKey = "";
  state.typingIndicators = [];
  getMeetingParticipants().forEach((card) => {
    card.classList.remove("is-present", "is-speaking", "is-typing");
  });
  renderStakeholderActivity();
}

function renderRoomHoldingPattern() {
  state.activePrompt = null;
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
      renderOpeningMove();
    }, 2300)
  );
}

function getManualAssistContext() {
  return state.lastAssistContext?.lines?.length
    ? state.lastAssistContext
    : {
        title: "AI Copilot",
        lines: assistantKickoff,
      };
}

function resetSimulation({ destination = "landing", preserveName = false } = {}) {
  const preservedName = preserveName ? state.playerName : "";
  clearSummaryMetricAnimation();
  state = defaultState();
  if (preservedName) {
    state.playerName = preservedName;
  }
  playerNameInput.value = destination === "landing" ? "" : state.playerName;
  summaryPanel.classList.add("hidden");
  resetMeetingRoomVisuals();
  renderNotes();
  renderReactions();
  setCopilotOpen(false);
  renderAssistant("AI Copilot", assistantKickoff);
  aiAssistButton?.classList.remove("has-alert");
  updateTension();
  decisionPanel.hidden = true;
  highlightSpeaker("");
  setMeetingStage({
    tag: "Live Meeting",
    title: "Everyone is looking at you to begin.",
    subtitle: "Lead the room, manage the trade-offs, and move the team toward a defensible call.",
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
  const baseline = defaultState();

  showScreen("meeting");
  resetMeetingRoomVisuals();
  state.stage = "opening";
  state.currentRound = 0;
  state.tension = baseline.tension;
  state.testerMood = baseline.testerMood;
  state.poMood = baseline.poMood;
  state.techLeadMood = baseline.techLeadMood;
  state.pmMood = baseline.pmMood;
  state.stakeholderTrust = baseline.stakeholderTrust;
  state.riskFocus = baseline.riskFocus;
  state.deliveryFocus = baseline.deliveryFocus;
  state.facilitationScore = baseline.facilitationScore;
  state.meetingContext = { ...baseline.meetingContext };
  state.scores = { ...baseline.scores };
  state.reactions = { ...baseline.reactions };
  state.selections = {
    ...state.selections,
    opening: null,
    recovery: null,
    followUp: null,
    framing: null,
    recommendation: null,
  };
  state.conversationLog = [
    {
      id: "intro-joined",
      speaker: "Emily",
      text: "All stakeholders have joined.",
      variant: "stakeholder",
    },
    {
      id: "intro-focus",
      speaker: "Room",
      text: "The room is waiting for your opening.",
      variant: "system",
    },
  ];
  state.notes = [
    "Meeting started.",
    "All stakeholders joined.",
    "Opening tone not yet set.",
    "Decision structure still needs to be established.",
  ];
  renderNotes();
  syncRoomReactions();
  setCopilotOpen(false);
  updateTension();
  renderAssistant("AI Copilot", [
    "Your opening will shape the tone of the discussion.",
    "Use structure early if you want the room to align faster.",
  ]);
  aiAssistButton?.classList.remove("has-alert");
  decisionPanel.hidden = true;
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
  state.playerName = playerNameInput.value.trim();
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
  state.synthesisStep = 0;
  state.summaryMetricsAnimated = false;
  clearSummaryMetricAnimation();
  resetSummarySourceNotes();
  renderAnalysisView();
  summaryPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

reviewSignalsButton?.addEventListener("click", () => {
  state.aiSummaryShown = false;
  state.synthesisStep = 0;
  state.summaryMetricsAnimated = false;
  clearSummaryMetricAnimation();
  renderAnalysisView();
  analysisDiscoveryView.scrollIntoView({ behavior: "smooth", block: "start" });
});

backToBriefingButton?.addEventListener("click", () => {
  resetSimulation({ destination: "landing", preserveName: false });
});

enterMeetingButton.addEventListener("click", () => {
  startMeeting();
});

revealInsightButton?.addEventListener("click", () => {
  state.synthesisStep = 1;
  renderAnalysisView();
});

summaryPanel.addEventListener("click", (event) => {
  const viewSourceButton = event.target.closest("[data-summary-sources]");
  if (viewSourceButton instanceof HTMLElement) {
    const sourceIds = (viewSourceButton.dataset.summarySources || "")
      .split(",")
      .map((sourceId) => sourceId.trim())
      .filter(Boolean);

    const inlineNote = viewSourceButton
      .closest(".signal-confirmation-actions")
      ?.querySelector(".signal-source-note");
    const message = formatSourceTrace(sourceIds);

    if (inlineNote instanceof HTMLElement) {
      inlineNote.textContent = message;
      inlineNote.classList.remove("hidden");
    } else {
      showTraceSources(sourceIds);
    }
    return;
  }

  const continueButton = event.target.closest("[data-next-step]");
  if (continueButton instanceof HTMLElement) {
    const nextStep = Number(continueButton.dataset.nextStep || "0");
    if (nextStep > 0) {
      state.synthesisStep = nextStep;
      renderAnalysisView();
      const nextSegment = summaryPanel.querySelector(`[data-summary-card="${nextStep}"]`);
      nextSegment?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});

traceChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const sourceId = chip.dataset.traceSource;
    showTraceSources(sourceId ? [sourceId] : []);
  });
});

aiAssistButton.addEventListener("click", () => {
  clearHesitationNudge();
  const assistContext = getManualAssistContext();
  renderAssistant(assistContext.title, assistContext.lines);
  setCopilotOpen(!state.copilotOpen);
});

soundToggleButton?.addEventListener("click", () => {
  setSoundEnabled(!soundState.enabled);
});

tryAgainButton.addEventListener("click", () => {
  resetSimulation({ destination: "analysis", preserveName: true });
});

returnHomeButton.addEventListener("click", () => {
  resetSimulation({ destination: "landing", preserveName: false });
});

renderReactions();
setCopilotOpen(false);
renderAssistant("AI Copilot", assistantKickoff);
updateTension();
updateHostLabels();
updateIdentityShift();
renderAnalysisView();
cycleSystemInsights();
renderProgressLabel("landing");
initialiseLandingParallax();
updateSoundToggleUI();

window.addEventListener("scroll", updateStakeholderStripState, { passive: true });
window.addEventListener("resize", updateStakeholderStripState);
