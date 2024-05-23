import React, { useState } from 'react'
import Question from './Question'
import Result from './Result'

interface QuestionData {
    id: number
    text: string
    options: string[]
}

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [userAnswers, setUserAnswers] = useState<number[]>([])
    const [showResult, setShowResult] = useState(false)

    const questions: QuestionData[] = [
        {
            id: 1,
            text: 'What kind of story do you prefer in games?',
            options: [
                'A hero’s journey with epic battles',
                'Exploring mysterious and unknown worlds',
                'Deep and immersive character development',
                'Strategic thinking and planning',
                'Fast-paced and intense action',
                'Solving complex puzzles and challenges',
                'Building and managing systems',
                'Engaging in competitive sports scenarios',
            ],
        },
        {
            id: 2,
            text: 'What do you enjoy most about games?',
            options: [
                'Immersive graphics and realism',
                'Strong narrative and story',
                'Character customization and progression',
                'Strategic decision-making',
                'Quick reflexes and precision',
                'Mental challenges and logic puzzles',
                'Creative freedom and sandbox elements',
                'Team-based and competitive play',
            ],
        },
        {
            id: 3,
            text: 'What kind of gaming environment do you prefer?',
            options: [
                'Modern and futuristic settings',
                'Fantasy and mythical worlds',
                'Historical and realistic settings',
                'Sci-fi and outer space adventures',
                'Urban and city landscapes',
                'Nature and wilderness exploration',
                'Cartoonish and whimsical worlds',
                'Underground and dystopian themes',
            ],
        },
        {
            id: 4,
            text: 'Which device do you most often use to play games?',
            options: [
                'High-end gaming PC',
                'Home console (e.g., PlayStation, Xbox)',
                'Portable console (e.g., Nintendo Switch)',
                'Mobile device (e.g., smartphone, tablet)',
                'Older consoles (e.g., PlayStation 3, Xbox 360)',
                'Handheld consoles (e.g., Nintendo 3DS, PS Vita)',
                'Retro gaming systems (e.g., Atari, Commodore)',
            ],
        },
    ]
    const handleAnswer = (answerIndex: number) => {
        setUserAnswers([...userAnswers, answerIndex])
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            setShowResult(true)
        }
    }

    return (
        <div>
            {!showResult ? (
                <Question
                    question={questions[currentQuestion]}
                    onAnswer={handleAnswer}
                />
            ) : (
                <Result answers={userAnswers} />
            )}
        </div>
    )
}

export default Quiz
