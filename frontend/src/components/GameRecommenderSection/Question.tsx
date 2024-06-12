interface QuestionData {
    id: number
    text: string
    options: string[]
}

interface QuestionProps {
    question: QuestionData
    onAnswer: (answerIndex: number) => void
}

const Question = ({ question, onAnswer }: QuestionProps) => (
    <div className="flex flex-col mx-8 sm:mx-16">
        <h2 className="mt-8 font-bold">{question.text}</h2>
        <ul className="">
            {question.options.map((option, index) => (
                <li key={index} className="mt-4">
                    <button
                        className="border-2 rounded-md w-full p-4 hover:bg-qDark300"
                        onClick={() => onAnswer(index)}
                    >
                        {option}
                    </button>
                </li>
            ))}
        </ul>
    </div>
)

export default Question
