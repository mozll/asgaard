import { useState } from 'react'
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
            // question index 0 in the api client
            id: 1,
            text: 'When you play games, what kind of experience are you looking for?',

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
            // question index 1 in the api client
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
            // question index 2 in the api client
            id: 3,
            text: 'What setting or theme excites you the most?',
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
            // question index 3 in the api client
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
