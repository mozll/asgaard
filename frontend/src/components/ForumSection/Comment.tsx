import React from 'react'

export interface CommentProps {
    comment: {
        comment_id: number
        comment_comment: string
        comment_created_at: string
        user_name: string
    }
}

const Comment = ({ comment }: CommentProps) => {
    return (
        <div className="border rounded-md p-2 mb-2">
            <p className="text-sm font-light">
                <span className="font-semibold">{comment.user_name}</span> -
                {new Date(comment.comment_created_at).toLocaleString()}
            </p>
            <p>{comment.comment_comment}</p>
        </div>
    )
}

export default Comment
