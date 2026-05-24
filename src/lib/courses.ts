export type Assignment = {
  id: string
  title: string
  link?: string
  instructions?: string
  postedDate: string
  dueDate?: string
  turnedIn: number
  assigned: number
}

export type Topic = {
  id: string
  name: string
  assignments: Assignment[]
}

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
  topics: Topic[]
  outcomes: string[]
}

export const courses: Course[] = [
  {
    id: "general-english",
    title: "General English Speaking",
    zh: "英语口语",
    teacher: "Adnan K.",
    initial: "A",
    level: "Intermediate",
    schedule: "Mon / Wed / Fri, 19:00 China time",
    description: "Build real spoken English confidence with structured exercises and live teacher feedback.",
    bannerColor: "#4f378b",
    nextTopic: "Simple Present",
    code: "7tdprunv",
    bio: "Adnan is a certified English teacher with over 10 years of experience teaching Chinese students. He specialises in speaking fluency, pronunciation, and exam preparation.",
    streamTitle: "Adnan posted: Conversation Simple Present",
    streamText: "Practice using simple present tense in real conversations. Complete the Formative activity before our next live class.",
    topics: [
      {
        id: "vocabulary",
        name: "Vocabulary",
        assignments: [
          {
            id: "v1",
            title: "sdfsd",
            link: "https://app.formative.com/view/abc123",
            instructions: "Complete the vocabulary activity before class.",
            postedDate: "Apr 14",
            turnedIn: 0,
            assigned: 2,
          },
        ],
      },
      {
        id: "simple-present",
        name: "Simple Present",
        assignments: [
          {
            id: "sp1",
            title: "Simple Present (Be Verb vs. Other Verbs)",
            link: "https://app.formative.com/view/def456",
            instructions: "Complete all sections. Focus on the audio response questions.",
            postedDate: "Feb 22",
            dueDate: "No due date",
            turnedIn: 0,
            assigned: 2,
          },
          {
            id: "sp2",
            title: "Conversation Simple Present (Be Verb vs. O...)",
            link: "https://app.formative.com/view/ghi789",
            instructions: "Listen to the audio and record your response.",
            postedDate: "Feb 22",
            turnedIn: 0,
            assigned: 2,
          },
        ],
      },
      {
        id: "linguaskill",
        name: "Linguaskill",
        assignments: [
          {
            id: "ls1",
            title: "Linguaskill Speaking Part 1",
            link: "https://app.formative.com/view/jkl012",
            instructions: "Timed speaking exercise. Do not pause.",
            postedDate: "Feb 22",
            turnedIn: 1,
            assigned: 2,
          },
        ],
      },
    ],
    outcomes: [
      "Speak with more confidence in daily situations",
      "Use simple present and past tenses correctly",
      "Improve pronunciation and fluency",
      "Respond naturally to common questions",
    ],
  },
  {
    id: "ielts",
    title: "IELTS Speaking Prep",
    zh: "雅思口语备考",
    teacher: "Adnan K.",
    initial: "A",
    level: "Band 5.5+",
    schedule: "Sat / Sun, 10:00 China time",
    description: "Part 1, Part 2 cue cards, Part 3 answers, timing, and feedback.",
    bannerColor: "#633b48",
    nextTopic: "Cue-card structure",
    code: "IELTS-55",
    bio: "Adnan prepares Chinese IELTS learners for clear, structured speaking answers with practical scoring feedback.",
    streamTitle: "Adnan posted: Part 2 cue-card structure",
    streamText: "Learn how to plan quickly, speak for two minutes, and extend answers without memorising scripts.",
    topics: [
      {
        id: "part1",
        name: "Part 1 — Familiar Topics",
        assignments: [
          {
            id: "p1a1",
            title: "Part 1 Answer Bank",
            link: "https://app.formative.com/view/ielts1",
            instructions: "Read sample answers and highlight useful topic vocabulary.",
            postedDate: "Mar 10",
            turnedIn: 2,
            assigned: 3,
          },
        ],
      },
      {
        id: "part2",
        name: "Part 2 — Cue Cards",
        assignments: [
          {
            id: "p2a1",
            title: "Part 2 Cue-Card Recording",
            link: "https://app.formative.com/view/ielts2",
            instructions: "Record one 2-minute answer using the class framework.",
            postedDate: "Mar 12",
            dueDate: "Mar 15",
            turnedIn: 1,
            assigned: 3,
          },
        ],
      },
    ],
    outcomes: [
      "Structure stronger answers",
      "Use topic vocabulary better",
      "Handle follow-up questions calmly",
    ],
  },
  {
    id: "business",
    title: "Business English",
    zh: "商务英语",
    teacher: "Adnan K.",
    initial: "A",
    level: "Intermediate",
    schedule: "Tue / Thu, 20:00 China time",
    description: "Meetings, email, client updates, and workplace speaking practice.",
    bannerColor: "#6750a4",
    nextTopic: "Meeting practice",
    code: "BIZ-204",
    bio: "Adnan helps adult learners speak more naturally in work situations. Lessons focus on useful phrases, realistic role play, and clear feedback.",
    streamTitle: "Adnan posted: Client update meeting practice",
    streamText: "Practice opening a meeting, explaining progress, asking for clarification, and closing with next steps.",
    topics: [
      {
        id: "meetings",
        name: "Meetings",
        assignments: [
          {
            id: "m1",
            title: "Meeting Phrases Practice",
            link: "https://app.formative.com/view/biz1",
            instructions: "Read the phrase sheet and mark 5 expressions you want to use.",
            postedDate: "Apr 1",
            turnedIn: 0,
            assigned: 4,
          },
        ],
      },
      {
        id: "emails",
        name: "Workplace Emails",
        assignments: [
          {
            id: "e1",
            title: "Email Correction Lab",
            link: "https://app.formative.com/view/biz2",
            instructions: "Rewrite short workplace messages with better tone and clearer structure.",
            postedDate: "Apr 3",
            dueDate: "Apr 7",
            turnedIn: 2,
            assigned: 4,
          },
        ],
      },
    ],
    outcomes: [
      "Run simple meetings in English",
      "Explain project updates with confidence",
      "Write polite workplace messages",
    ],
  },
]
