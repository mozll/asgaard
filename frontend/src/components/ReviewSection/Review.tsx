import axios from 'axios'
import { useEffect, useState } from 'react'

interface ReviewProps {
    gameId: number
}

const Review = ({ gameId }: ReviewProps) => {
    const [review, setReview] = useState([])
    useEffect(() => {
        getReview()
    }, [])

    const getReview = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8081/api/games/${gameId}/reviews`
            )
            console.log(
                '*********************************** resposne review',
                response.data
            )
            setReview(response.data)
        } catch (error) {
            console.error('Error fetching review:', error)
            // Handle network errors (display an error message, etc.)
        }
    }
    console.log(review)

    return <div>heeeello</div>
}

export default Review
