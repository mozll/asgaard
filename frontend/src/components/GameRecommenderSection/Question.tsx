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
    <div className="">
        <h2 className="mx-16 mt-8 font-bold">{question.text}</h2>
        <ul className="mx-16">
            {question.options.map((option, index) => (
                <li key={index}>
                    <button
                        className="border-2 rounded-md mt-4 w-1/2 p-4 hover:bg-qDark300 "
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
