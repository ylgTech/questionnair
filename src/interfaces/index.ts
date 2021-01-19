export type UserInfo = {
    name: string
    school: string
    class: string
    phone: string
}

export type QuestionType = {
    id: string
    question: string
    options: string[]
    correctAnswer: string[]
    category: '知' | '行' | '情' | '意'
    type: 'likert' | 'single' | 'multiple' | 'fill'
}

export type Answer = {
    score: number
    answers: number[]
}