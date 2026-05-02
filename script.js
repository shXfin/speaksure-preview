const courseData = {
  business: {
    title: "Business English",
    zh: "商务英语",
    teacher: "Maya Chen",
    level: "Intermediate",
    schedule: "Tue / Thu, 20:00 China time",
    color: "course-blue",
    code: "BIZ-204",
    initial: "M",
    streamTitle: "Maya posted: Client update meeting practice",
    streamText:
      "Practice opening a meeting, explaining progress, asking for clarification, and closing with next steps.",
    assignment:
      "Record a 2-minute project update. Teacher feedback covers clarity, vocabulary, and pronunciation.",
    bio:
      "Maya helps adult learners in China speak more naturally in work situations. Her lessons focus on useful phrases, realistic role play, and clear feedback.",
    tasks: [
      ["Before live class", "Meeting phrases", "Read the phrase sheet and mark 5 expressions you want to use.", "Material"],
      ["Speaking practice", "Project update voice task", "Record a 2-minute project update for teacher feedback.", "Due Friday"],
      ["Feedback", "Email correction lab", "Rewrite short workplace messages with better tone and clearer structure.", "Returned with notes"],
    ],
    outcomes: ["Run simple meetings in English", "Explain project updates with confidence", "Write polite workplace messages"],
  },
  fluency: {
    title: "Spoken English Fluency",
    zh: "英语口语流利度",
    teacher: "Daniel Brooks",
    level: "Beginner to Intermediate",
    schedule: "Mon / Wed, 19:30 China time",
    color: "course-green",
    code: "FLU-118",
    initial: "D",
    streamTitle: "Daniel posted: Daily conversation warm-up",
    streamText:
      "This class practices short answers, follow-up questions, pronunciation, and natural speaking rhythm.",
    assignment:
      "Send a 60-second voice note about your day. Teacher feedback focuses on confidence and pronunciation.",
    bio:
      "Daniel teaches practical spoken English for Chinese students who understand grammar but need more speaking confidence.",
    tasks: [
      ["Before live class", "Small talk pattern cards", "Review daily-life prompts and prepare 3 follow-up questions.", "Material"],
      ["Speaking practice", "Daily voice-note practice", "Send a 60-second voice note about your day.", "Due Wednesday"],
      ["Feedback", "Pronunciation clinic", "Teacher marks stress, rhythm, and common sounds for Chinese speakers.", "Returned with notes"],
    ],
    outcomes: ["Speak with less hesitation", "Answer daily questions naturally", "Improve pronunciation habits"],
  },
  ielts: {
    title: "IELTS Speaking Prep",
    zh: "雅思口语备考",
    teacher: "Sophia Miller",
    level: "Band 5.5+",
    schedule: "Sat / Sun, 10:00 China time",
    color: "course-amber",
    code: "IELTS-55",
    initial: "S",
    streamTitle: "Sophia posted: Part 2 cue-card structure",
    streamText:
      "Learn how to plan quickly, speak for two minutes, and extend answers without memorizing scripts.",
    assignment:
      "Record one Part 2 answer. Teacher marks structure, vocabulary range, grammar control, and fluency.",
    bio:
      "Sophia prepares Chinese IELTS learners for clear, structured speaking answers with practical scoring feedback.",
    tasks: [
      ["Before live class", "Part 1 answer bank", "Read sample answers and highlight useful topic vocabulary.", "Material"],
      ["Speaking practice", "Part 2 cue-card recording", "Record one 2-minute answer using the class framework.", "Due Sunday"],
      ["Feedback", "Mock speaking notes", "Teacher gives band-focused notes on fluency, grammar, and vocabulary.", "Returned with notes"],
    ],
    outcomes: ["Structure stronger answers", "Use topic vocabulary better", "Handle follow-up questions calmly"],
  },
  interview: {
    title: "Interview English",
    zh: "英语面试",
    teacher: "Ethan Park",
    level: "Intermediate",
    schedule: "Fri, 20:30 China time",
    color: "course-red",
    code: "INT-310",
    initial: "E",
    streamTitle: "Ethan posted: Tell me about yourself",
    streamText:
      "Build a clean self-introduction for work or school interviews, then practice follow-up answers.",
    assignment:
      "Record your self-introduction and one strength/weakness answer for teacher correction.",
    bio:
      "Ethan helps learners prepare for English interviews with answer structure, mock practice, and confidence coaching.",
    tasks: [
      ["Before live class", "Self-introduction template", "Prepare a 45-second intro for work or school interviews.", "Material"],
      ["Speaking practice", "Mock interview recording", "Answer 3 common interview questions and submit a voice recording.", "Due Friday"],
      ["Feedback", "Answer structure review", "Teacher comments on clarity, confidence, and answer structure.", "Returned with notes"],
    ],
    outcomes: ["Introduce yourself clearly", "Explain your experience", "Answer interview questions with structure"],
  },
  travel: {
    title: "Travel & Daily English",
    zh: "旅行与日常英语",
    teacher: "Olivia Wang",
    level: "Beginner",
    schedule: "Tue, 18:30 China time",
    color: "course-purple",
    code: "DAY-072",
    initial: "O",
    streamTitle: "Olivia posted: Airport and hotel check-in",
    streamText:
      "Practice useful phrases for travel problems, hotel questions, transport, restaurants, and shopping.",
    assignment:
      "Complete two role-play recordings: hotel check-in and ordering food.",
    bio:
      "Olivia teaches simple, useful English for Chinese learners who want to travel or handle daily situations abroad.",
    tasks: [
      ["Before live class", "Airport phrase sheet", "Review phrases for baggage, gates, delays, and travel problems.", "Material"],
      ["Speaking practice", "Restaurant role-play", "Record a short ordering-food role-play with polite requests.", "Due Tuesday"],
      ["Feedback", "Hotel check-in practice", "Teacher checks clarity and useful travel phrases.", "Returned with notes"],
    ],
    outcomes: ["Travel with more confidence", "Ask for help in English", "Handle daily situations abroad"],
  },
  presentation: {
    title: "Presentation English",
    zh: "英文演讲与汇报",
    teacher: "Grace Lin",
    level: "Upper Intermediate",
    schedule: "Wed, 21:00 China time",
    color: "course-teal",
    code: "PRS-409",
    initial: "G",
    streamTitle: "Grace posted: Opening and transition language",
    streamText:
      "Practice opening a presentation, moving between slides, explaining charts, and closing strongly.",
    assignment:
      "Record a 3-slide mini presentation and receive feedback on structure, delivery, and pronunciation.",
    bio:
      "Grace coaches Chinese professionals and students to present clearly in English for work, class, and pitches.",
    tasks: [
      ["Before live class", "Presentation opening phrases", "Prepare your topic, agenda, and opening sentence.", "Material"],
      ["Speaking practice", "3-slide mini presentation", "Record a short presentation and explain one chart or comparison.", "Due Wednesday"],
      ["Feedback", "Delivery review", "Teacher comments on transitions, pronunciation, and confidence.", "Returned with notes"],
    ],
    outcomes: ["Open presentations confidently", "Connect ideas between slides", "Deliver a short English presentation"],
  },
};

const screens = Array.from(document.querySelectorAll(".screen"));
const navLinks = Array.from(document.querySelectorAll("[data-route]"));
const tabs = Array.from(document.querySelectorAll(".tab"));
const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));
const menuButton = document.querySelector(".icon-button");
const drawer = document.querySelector(".drawer");
const trialForm = document.querySelector(".trial-form");
let activeCourse = "business";

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function renderCourse(courseKey) {
  const course = courseData[courseKey] || courseData.business;
  activeCourse = courseKey;

  const banner = document.getElementById("courseBanner");
  if (banner) {
    banner.className = `classroom-banner ${course.color}`;
  }

  setText("classroom-title", course.title);
  setText("classroomSubtitle", `${course.zh} · ${course.teacher} · ${course.level}`);
  setText("courseSchedule", course.schedule);
  setText("classCode", course.code);
  setText("teacherInitial", course.initial);
  setText("streamTitle", course.streamTitle);
  setText("streamText", course.streamText);
  setText("assignmentText", course.assignment);
  setText("teacherName", course.teacher);
  setText("teacherInitialPeople", course.initial);
  setText("teacherBio", course.bio);
  setText("trialPanelTitle", `Book a trial for ${course.title}`);

  const trialCourse = document.getElementById("trialCourse");
  if (trialCourse) trialCourse.value = course.title;

  const taskList = document.getElementById("taskList");
  if (taskList) {
    taskList.innerHTML = course.tasks
      .map(
        ([topic, title, description, status], index) => `
          <div class="classwork-topic">
            <div class="topic-label">${topic}</div>
            <div class="task">
              <span>${index + 1}</span>
              <div>
                <h3>${title}</h3>
                <p>${description}</p>
              </div>
              <strong>${status}</strong>
            </div>
          </div>
        `
      )
      .join("");
  }

  const outcomeList = document.getElementById("outcomeList");
  if (outcomeList) {
    outcomeList.innerHTML = course.outcomes.map((outcome) => `<li>${outcome}</li>`).join("");
  }
}

function showRoute(route) {
  const targetRoute = route || "dashboard";

  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === targetRoute);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.route === targetRoute);
  });

  if (targetRoute === "classroom") {
    renderCourse(activeCourse);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showTab(tabId) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabId);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (link.dataset.course) {
      renderCourse(link.dataset.course);
    }
    const route = link.dataset.route;
    history.pushState(null, "", `#${route}`);
    showRoute(route);
    drawer?.classList.remove("is-open");
    drawer?.setAttribute("aria-hidden", "true");
  });
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => showTab(tab.dataset.tab));
});

menuButton?.addEventListener("click", () => {
  const isOpen = drawer?.classList.toggle("is-open");
  drawer?.setAttribute("aria-hidden", isOpen ? "false" : "true");
});

trialForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  trialForm.classList.add("is-submitted");
});

trialForm?.querySelector(".primary-btn")?.addEventListener("click", () => {
  trialForm.requestSubmit();
});

window.addEventListener("popstate", () => {
  showRoute(location.hash.replace("#", "") || "dashboard");
});

renderCourse(activeCourse);
showRoute(location.hash.replace("#", "") || "dashboard");
