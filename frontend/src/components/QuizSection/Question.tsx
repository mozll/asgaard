import React from 'react'

interface QuestionData {
    id: number
    text: string
    options: string[]
}

interface QuestionProps {
    question: QuestionData
    onAnswer: (answerIndex: number) => void
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
    return (
        <div>
            <h2>{question.text}</h2>
            <ul>
                {question.options.map((option: string, index: number) => (
                    <li key={index}>
                        <button onClick={() => onAnswer(index)}>
                            {option}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Question
