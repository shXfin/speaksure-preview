export type Task = [string, string, string, string] // [topic, title, description, status]

export type Course = {
  id: string
  title: string
  zh: string
  teacher: string
  initial: string
  level: string
  schedule: string
  description: string
  bannerColor: string
  nextTopic: string
  code: string
  bio: string
  streamTitle: string
  streamText: string
  assignment: string
  tasks: Task[]
  outcomes: string[]
}

export const courses: Course[] = [
  {
    id: "business",
    title: "Business English",
    zh: "商务英语",
    teacher: "Maya Chen",
    initial: "M",
    level: "Intermediate",
    schedule: "Tue / Thu, 20:00 China time",
    description: "Meetings, email, client updates, and workplace speaking practice.",
    bannerColor: "#4f378b",
    nextTopic: "meeting practice",
    code: "BIZ-204",
    bio: "Maya helps adult learners in China speak more naturally in work situations. Her lessons focus on useful phrases, realistic role play, and clear feedback.",
    streamTitle: "Maya posted: Client update meeting practice",
    streamText: "Practice opening a meeting, explaining progress, asking for clarification, and closing with next steps.",
    assignment: "Record a 2-minute project update. Teacher feedback covers clarity, vocabulary, and pronunciation.",
    tasks: [
      ["Before live class", "Meeting phrases", "Read the phrase sheet and mark 5 expressions you want to use.", "Material"],
      ["Speaking practice", "Project update voice task", "Record a 2-minute project update for teacher feedback.", "Due Friday"],
      ["Feedback", "Email correction lab", "Rewrite short workplace messages with better tone and clearer structure.", "Returned with notes"],
    ],
    outcomes: ["Run simple meetings in English", "Explain project updates with confidence", "Write polite workplace messages"],
  },
  {
    id: "fluency",
    title: "Spoken English Fluency",
    zh: "英语口语流利度",
    teacher: "Daniel Brooks",
    initial: "D",
    level: "Beginner to Intermediate",
    schedule: "Mon / Wed, 19:30 China time",
    description: "Daily conversation, pronunciation, confidence, and natural replies.",
    bannerColor: "#4a4458",
    nextTopic: "daily conversation",
    code: "FLU-118",
    bio: "Daniel teaches practical spoken English for Chinese students who understand grammar but need more speaking confidence.",
    streamTitle: "Daniel posted: Daily conversation warm-up",
    streamText: "This class practices short answers, follow-up questions, pronunciation, and natural speaking rhythm.",
    assignment: "Send a 60-second voice note about your day. Teacher feedback focuses on confidence and pronunciation.",
    tasks: [
      ["Before live class", "Small talk pattern cards", "Review daily-life prompts and prepare 3 follow-up questions.", "Material"],
      ["Speaking practice", "Daily voice-note practice", "Send a 60-second voice note about your day.", "Due Wednesday"],
      ["Feedback", "Pronunciation clinic", "Teacher marks stress, rhythm, and common sounds for Chinese speakers.", "Returned with notes"],
    ],
    outcomes: ["Speak with less hesitation", "Answer daily questions naturally", "Improve pronunciation habits"],
  },
  {
    id: "ielts",
    title: "IELTS Speaking Prep",
    zh: "雅思口语备考",
    teacher: "Sophia Miller",
    initial: "S",
    level: "Band 5.5+",
    schedule: "Sat / Sun, 10:00 China time",
    description: "Part 1, Part 2 cue cards, Part 3 answers, timing, and feedback.",
    bannerColor: "#633b48",
    nextTopic: "cue-card structure",
    code: "IELTS-55",
    bio: "Sophia prepares Chinese IELTS learners for clear, structured speaking answers with practical scoring feedback.",
    streamTitle: "Sophia posted: Part 2 cue-card structure",
    streamText: "Learn how to plan quickly, speak for two minutes, and extend answers without memorizing scripts.",
    assignment: "Record one Part 2 answer. Teacher marks structure, vocabulary range, grammar control, and fluency.",
    tasks: [
      ["Before live class", "Part 1 answer bank", "Read sample answers and highlight useful topic vocabulary.", "Material"],
      ["Speaking practice", "Part 2 cue-card recording", "Record one 2-minute answer using the class framework.", "Due Sunday"],
      ["Feedback", "Mock speaking notes", "Teacher gives band-focused notes on fluency, grammar, and vocabulary.", "Returned with notes"],
    ],
    outcomes: ["Structure stronger answers", "Use topic vocabulary better", "Handle follow-up questions calmly"],
  },
  {
    id: "interview",
    title: "Interview English",
    zh: "英语面试",
    teacher: "Ethan Park",
    initial: "E",
    level: "Intermediate",
    schedule: "Fri, 20:30 China time",
    description: "Self-introduction, experience answers, and mock interview practice.",
    bannerColor: "#6750a4",
    nextTopic: "self-introduction",
    code: "INT-310",
    bio: "Ethan helps learners prepare for English interviews with answer structure, mock practice, and confidence coaching.",
    streamTitle: "Ethan posted: Tell me about yourself",
    streamText: "Build a clean self-introduction for work or school interviews, then practice follow-up answers.",
    assignment: "Record your self-introduction and one strength/weakness answer for teacher correction.",
    tasks: [
      ["Before live class", "Self-introduction template", "Prepare a 45-second intro for work or school interviews.", "Material"],
      ["Speaking practice", "Mock interview recording", "Answer 3 common interview questions and submit a voice recording.", "Due Friday"],
      ["Feedback", "Answer structure review", "Teacher comments on clarity, confidence, and answer structure.", "Returned with notes"],
    ],
    outcomes: ["Introduce yourself clearly", "Explain your experience", "Answer interview questions with structure"],
  },
  {
    id: "travel",
    title: "Travel & Daily English",
    zh: "旅行与日常英语",
    teacher: "Olivia Wang",
    initial: "O",
    level: "Beginner",
    schedule: "Tue, 18:30 China time",
    description: "Restaurants, hotels, airports, shopping, and asking for help.",
    bannerColor: "#625b71",
    nextTopic: "airport English",
    code: "DAY-072",
    bio: "Olivia teaches simple, useful English for Chinese learners who want to travel or handle daily situations abroad.",
    streamTitle: "Olivia posted: Airport and hotel check-in",
    streamText: "Practice useful phrases for travel problems, hotel questions, transport, restaurants, and shopping.",
    assignment: "Complete two role-play recordings: hotel check-in and ordering food.",
    tasks: [
      ["Before live class", "Airport phrase sheet", "Review phrases for baggage, gates, delays, and travel problems.", "Material"],
      ["Speaking practice", "Restaurant role-play", "Record a short ordering-food role-play with polite requests.", "Due Tuesday"],
      ["Feedback", "Hotel check-in practice", "Teacher checks clarity and useful travel phrases.", "Returned with notes"],
    ],
    outcomes: ["Travel with more confidence", "Ask for help in English", "Handle daily situations abroad"],
  },
  {
    id: "presentation",
    title: "Presentation English",
    zh: "英文演讲与汇报",
    teacher: "Grace Lin",
    initial: "G",
    level: "Upper Intermediate",
    schedule: "Wed, 21:00 China time",
    description: "Openings, transitions, slide narration, and confident delivery.",
    bannerColor: "#7d5260",
    nextTopic: "slide narration",
    code: "PRS-409",
    bio: "Grace coaches Chinese professionals and students to present clearly in English for work, class, and pitches.",
    streamTitle: "Grace posted: Opening and transition language",
    streamText: "Practice opening a presentation, moving between slides, explaining charts, and closing strongly.",
    assignment: "Record a 3-slide mini presentation and receive feedback on structure, delivery, and pronunciation.",
    tasks: [
      ["Before live class", "Presentation opening phrases", "Prepare your topic, agenda, and opening sentence.", "Material"],
      ["Speaking practice", "3-slide mini presentation", "Record a short presentation and explain one chart or comparison.", "Due Wednesday"],
      ["Feedback", "Delivery review", "Teacher comments on transitions, pronunciation, and confidence.", "Returned with notes"],
    ],
    outcomes: ["Open presentations confidently", "Connect ideas between slides", "Deliver a short English presentation"],
  },
]
