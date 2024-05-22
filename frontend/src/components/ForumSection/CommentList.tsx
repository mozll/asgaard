import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Comment, { CommentProps } from './Comment'

interface CommentListProps {
    postId: number
}

const CommentList = ({ postId }: CommentListProps) => {
    const [comments, setComments] = useState<CommentProps['comment'][]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get<CommentProps['comment'][]>(
                    `http://localhost:8081/api/forum_posts/${postId}/comments`
                )
                setComments(response.data)
                setIsLoading(false)
            } catch (err) {
                console.error('Error fetching comments:', err)
                setError('Failed to load comments. Please try again.')
                setIsLoading(false)
            }
        }

        fetchComments()
    }, [postId]) // Fetch comments whenever postId changes

    if (isLoading) {
        return <div>Loading comments...</div>
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    return (
        <div>
            <h3 className="font-bold mb-2">Comments:</h3>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.comment_id}>
                            <Comment comment={comment} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    )
}

export default CommentList
