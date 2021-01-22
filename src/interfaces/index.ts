export type UserInfo = {
    name: string
    school: string
    class: string
    phone: string
}

export type DimensionType = "lore" | "emotion" | "goodwill" | "action"
export type DimensionCNType = '知' | '情' | '意' | '行'

export type QuestionType = {
    _id: string
    question: string
    options: string[]
    correctAnswer: string[]
    type: 'likert' | 'single' | 'accumulate'
}

export type Answer = {
    score: number
    answers: number[]
}