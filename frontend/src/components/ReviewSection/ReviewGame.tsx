import React, { useState, FormEvent, ChangeEvent } from 'react'
import axios from 'axios'
import ReviewList from './ReviewList'

interface ReviewGameProps {
    gameId: number
    gameName: string
}

const ReviewGame = ({ gameId, gameName }: ReviewGameProps) => {
    const [review, setReview] = useState<string>('')
    const [thumbs, setThumbs] = useState<string>('neutral')
    const [borderColor, setBorderColor] = useState('green')
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitFail, setSubmitFail] = useState(false)

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
                setReview('')
                setThumbs('neutral')
                setBorderColor('white')
                setSubmitSuccess(true)
            } else {
                console.error('Failed to submit review:', response.statusText)
                setSubmitFail(true)
            }
        } catch (error) {
            console.error('Error submitting review:', error)
            setSubmitFail(true)
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
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg">Write a review</h1>
                <div className="button-icons gap-4 flex justify-end">
                    <button className="" onClick={handleThumbsUpClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 fill-qPrimary100 hover:fill-qPrimary300"
                            viewBox="0 0 1792 1792"
                        >
                            <path d="M320 1344q0-26-19-45t-45-19q-27 0-45.5 19t-18.5 45q0 27 18.5 45.5t45.5 18.5q26 0 45-18.5t19-45.5zm160-512v640q0 26-19 45t-45 19h-288q-26 0-45-19t-19-45v-640q0-26 19-45t45-19h288q26 0 45 19t19 45zm1184 0q0 86-55 149 15 44 15 76 3 76-43 137 17 56 0 117-15 57-54 94 9 112-49 181-64 76-197 78h-129q-66 0-144-15.5t-121.5-29-120.5-39.5q-123-43-158-44-26-1-45-19.5t-19-44.5v-641q0-25 18-43.5t43-20.5q24-2 76-59t101-121q68-87 101-120 18-18 31-48t17.5-48.5 13.5-60.5q7-39 12.5-61t19.5-52 34-50q19-19 45-19 46 0 82.5 10.5t60 26 40 40.5 24 45 12 50 5 45 .5 39q0 38-9.5 76t-19 60-27.5 56q-3 6-10 18t-11 22-8 24h277q78 0 135 57t57 135z" />
                        </svg>
                    </button>
                    <button className="" onClick={handleNeutralClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 fill-current hover:fill-slate-300"
                            viewBox="0 0 2323"
                        >
                            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM6.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM7 13a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H7z" />
                        </svg>
                    </button>
                    <button onClick={handleThumbsDownClick}>
                        {' '}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 fill-qSecondary100 my-4 hover:fill-qSecondary300"
                            viewBox="0 0 512 512"
                        >
                            <path d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z" />
                        </svg>
                    </button>
                </div>
            </div>
            <form className=" " onSubmit={handleSubmit}>
                <div className={`border-2 border-${borderColor} rounded-md`}>
                    <textarea
                        className="text-white bg-qDark200 p-4 w-full rounded-md outline-none"
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
            {submitSuccess && (
                <div className="text-qPrimary100 my-2">
                    Successfully submitted!
                </div>
            )}
            {submitFail && (
                <div className="text-qError100 my-2">
                    Failed to submit review. Please try logging in...
                </div>
            )}

            <ReviewList gameId={gameId} gameName={gameName} />
        </div>
    )
}

export default ReviewGame
