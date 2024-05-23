import React, { useState } from 'react'
import Question from './Question'
import Result from './Result'

interface QuestionData {
    id: number
    text: string
    options: string[]
}

const Quiz: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [userAnswers, setUserAnswers] = useState<number[]>([])
    const [showResult, setShowResult] = useState(false)

    const questions: QuestionData[] = [
        {
            id: 1,
            text: "What's your favorite game genre?",
            options: ['Action', 'Adventure', 'RPG', 'Strategy'],
        },
        {
            id: 2,
            text: 'Which platform do you prefer?',
            options: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
        },
        // ... Add more questions
    ]

    const handleAnswer = (answerIndex: number) => {
        setUserAnswers([...userAnswers, answerIndex])
        setCurrentQuestion(currentQuestion + 1)

        if (currentQuestion === questions.length - 1) {
            setShowResult(true)
        }
    }

    return (
        <div>
            {!showResult && (
                <Question
                    question={questions[currentQuestion]}
                    onAnswer={handleAnswer}
                />
            )}
            {showResult && <Result answers={userAnswers} />}
        </div>
    )
}

export default Quiz
