import React, { useState, FormEvent, ChangeEvent } from 'react'

const ReviewGame: React.FC = () => {
    const [review, setReview] = useState<string>('')
    const [borderColor, setBorderColor] = useState('green')

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setReview(event.target.value)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Here you can add code to submit the review, such as sending it to a backend server
        console.log('Review submitted:', review)
        // You can also clear the review text area after submission
        setReview('')
    }

    const handleThumbsUpClick = () => {
        setBorderColor('qPrimary100')
        console.log('should be green')
    }

    const handleThumbsDownClick = () => {
        setBorderColor('qSecondary100')
        console.log('should be orange')
    }
    const handleNeutralClick = () => {
        setBorderColor('white')
    }

    return (
        <div className="">
            <div className="flex justify-between">
                <h1 className="font-bold text-lg">Write a review</h1>
                <div className="flex justify-end">
                    <button className="mr-2" onClick={handleNeutralClick}>
                        Neutral
                    </button>
                    <button className="mr-2" onClick={handleThumbsUpClick}>
                        Thumbs up
                    </button>
                    <button onClick={handleThumbsDownClick}>Thumbs down</button>
                </div>
            </div>
            <form className=" " onSubmit={handleSubmit}>
                <div className={`border-2 border-${borderColor} rounded-md`}>
                    <textarea
                        className="text-white bg-qDark200 p-4 w-full rounded-md"
                        value={review}
                        onChange={handleChange}
                        placeholder="Write your review here..."
                        rows={10}
                        cols={50}
                    />
                </div>
                <br />
                <div className="flex justify-end">
                    <button
                        className="bg-qPrimary100 transition text-qDark100 py-2 px-4 rounded-full font-medium hover:bg-qPrimary300"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ReviewGame
