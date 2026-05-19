export type Course = {
  id: string
  title: string
  titleZh: string
  teacher: string
  level: string
  schedule: string
  description: string
  color: string
  nextTopic: string
  classCode: string
  teacherBio: string
  streamTitle: string
  streamText: string
  assignmentText: string
  outcomes: string[]
}

export const courses: Course[] = [
  {
    id: "business",
    title: "Business English",
    titleZh: "商务英语",
    teacher: "Maya Chen",
    level: "Intermediate",
    schedule: "Tue / Thu 20:00",
    description: "Meetings, email, client updates, and workplace speaking practice.",
    color: "bg-blue-600",
    nextTopic: "meeting practice",
    classCode: "BIZ-204",
    teacherBio: "Maya helps adult learners in China speak more naturally in work situations. Her lessons focus on useful phrases, realistic role play, and clear feedback.",
    streamTitle: "Maya posted: Client update meeting practice",
    streamText: "Practice opening a meeting, explaining progress, asking for clarification, and closing with next steps.",
    assignmentText: "Record a 2-minute project update. Teacher feedback covers clarity, vocabulary, and pronunciation.",
    outcomes: ["Lead a meeting in English", "Write clear client emails", "Handle workplace questions confidently"],
  },
  {
    id: "fluency",
    title: "Spoken English Fluency",
    titleZh: "英语口语流利度",
    teacher: "Daniel Brooks",
    level: "Beginner+",
    schedule: "Mon / Wed 19:30",
    description: "Daily conversation, pronunciation, confidence, and natural replies.",
    color: "bg-green-600",
    nextTopic: "daily conversation",
    classCode: "SPK-118",
    teacherBio: "Daniel focuses on building real confidence. His classes are relaxed, practical, and built around real-life topics Chinese learners actually need.",
    streamTitle: "Daniel posted: Natural daily replies",
    streamText: "Practice responding to common questions without thinking too hard — build automatic, confident answers.",
    assignmentText: "Record a 90-second introduction about your daily routine. Focus on natural flow, not perfection.",
    outcomes: ["Reply naturally in conversation", "Improve pronunciation clarity", "Build speaking confidence"],
  },
  {
    id: "ielts",
    title: "IELTS Speaking Prep",
    titleZh: "雅思口语备考",
    teacher: "Sophia Miller",
    level: "Band 5.5+",
    schedule: "Sat / Sun 10:00",
    description: "Part 1, Part 2 cue cards, Part 3 answers, timing, and feedback.",
    color: "bg-amber-500",
    nextTopic: "cue-card structure",
    classCode: "IEL-309",
    teacherBio: "Sophia has coached hundreds of students to their target band scores. She teaches the examiner's perspective so students know exactly what earns marks.",
    streamTitle: "Sophia posted: Part 2 cue-card walkthrough",
    streamText: "Learn to structure a 2-minute cue card answer with a clear intro, three points, and a strong close.",
    assignmentText: "Record a Part 2 response on the topic: Describe a person who has influenced you. Aim for 1:45–2:00.",
    outcomes: ["Structure Part 2 answers clearly", "Extend Part 3 answers with reasons", "Manage speaking time effectively"],
  },
  {
    id: "interview",
    title: "Interview English",
    titleZh: "英语面试",
    teacher: "Ethan Park",
    level: "Intermediate",
    schedule: "Fri 20:30",
    description: "Self-introduction, experience answers, and mock interview practice.",
    color: "bg-red-600",
    nextTopic: "self-introduction",
    classCode: "INT-071",
    teacherBio: "Ethan has run mock interviews for candidates at international companies. He teaches the STAR method and helps students sound professional under pressure.",
    streamTitle: "Ethan posted: The 60-second self-introduction",
    streamText: "Build a confident, memorable opening answer. Cover your background, strengths, and why you want the role.",
    assignmentText: "Record your self-introduction in under 60 seconds. Make it specific, confident, and natural.",
    outcomes: ["Deliver a confident self-introduction", "Answer experience questions using STAR", "Handle tough questions calmly"],
  },
  {
    id: "travel",
    title: "Travel & Daily English",
    titleZh: "旅行与日常英语",
    teacher: "Olivia Wang",
    level: "Beginner",
    schedule: "Tue 18:30",
    description: "Restaurants, hotels, airports, shopping, and asking for help.",
    color: "bg-purple-600",
    nextTopic: "airport English",
    classCode: "TRV-055",
    teacherBio: "Olivia teaches practical English for real travel situations. Her lessons are fun, scenario-based, and immediately useful for learners going abroad.",
    streamTitle: "Olivia posted: Airport check-in role play",
    streamText: "Practice checking in, going through security, and asking for gate information with confidence.",
    assignmentText: "Record yourself ordering a meal at a restaurant in English. Include asking about the menu and paying.",
    outcomes: ["Handle airport and hotel situations", "Order food and shop confidently", "Ask for help clearly"],
  },
  {
    id: "presentation",
    title: "Presentation English",
    titleZh: "英文演讲与汇报",
    teacher: "Grace Lin",
    level: "Upper Intermediate",
    schedule: "Wed 21:00",
    description: "Openings, transitions, slide narration, and confident delivery.",
    color: "bg-teal-600",
    nextTopic: "slide narration",
    classCode: "PRE-142",
    teacherBio: "Grace coaches professionals who present in English at work. She focuses on structure, signposting language, and projecting authority in front of an audience.",
    streamTitle: "Grace posted: Strong presentation openings",
    streamText: "The first 30 seconds set the tone. Learn three opening techniques that immediately engage your audience.",
    assignmentText: "Record a 3-minute presentation on any topic you know well. Focus on clear structure and smooth transitions.",
    outcomes: ["Open and close a presentation confidently", "Use signposting language naturally", "Narrate slides without reading from them"],
  },
]
