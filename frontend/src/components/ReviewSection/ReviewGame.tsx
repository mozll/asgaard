import React, { useState, FormEvent, ChangeEvent } from 'react'
import axios from 'axios'
import Review from './Review'

interface ReviewGameProps {
    gameId: number
}

const ReviewGame = ({ gameId }: ReviewGameProps) => {
    const [review, setReview] = useState<string>('')
    const [thumbs, setThumbs] = useState<string>('neutral')
    const [borderColor, setBorderColor] = useState('green')

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setReview(event.target.value)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const response = await axios.post(
                `http://localhost:8081/api/games/${gameId}/reviews`,
                {
                    review,
                    thumbs,
                }
            )

            if (response.status === 201) {
                // Cleanup textarea after successful submit
                setReview('')
                setThumbs('neutral')
                setBorderColor('white')
            } else {
                console.error('Failed to submit review:', response.statusText)
                // Handle errors (display an error message, etc.)
            }
        } catch (error) {
            console.error('Error submitting review:', error)
            // Handle network errors (display an error message, etc.)
        }
    }

    const handleThumbsUpClick = () => {
        setBorderColor('qPrimary100')
        setThumbs('thumbsUp')
    }

    const handleThumbsDownClick = () => {
        setBorderColor('qSecondary100')
        setThumbs('thumbsDown')
    }

    const handleNeutralClick = () => {
        setBorderColor('white')
        setThumbs('neutral')
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
            <Review gameId={gameId} />
        </div>
    )
}

export default ReviewGame
