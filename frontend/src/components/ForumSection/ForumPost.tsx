import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../App'

interface ForumPostProps {
    gameId: number
    gameName: string
}

interface ForumPostData {
    forum_post_id: number
    forum_post_title: string
    forum_post_post: string
    forum_post_created_at: string
    user_name: string
}

const ForumPost = ({ gameId, gameName }: ForumPostProps) => {
    const { user } = useContext(AuthContext)
    const [forumPosts, setForumPosts] = useState<ForumPostData[]>([])
    const [deleteError, setDeleteError] = useState<string | null>(null)

    useEffect(() => {
        getForumPost()
    }, [gameId])

    const getForumPost = async () => {
        try {
            const response = await axios.get<ForumPostData[]>(
                `http://localhost:8081/api/games/${gameId}/forum_posts`
            )

            // Remove single quotes from the title and post
            const sanitizedPosts = response.data.map((post) => ({
                ...post,
                forum_post_title: post.forum_post_title.replace(
                    /^'(.*)'$/,
                    '$1'
                ),
                forum_post_post: post.forum_post_post.replace(/^'(.*)'$/, '$1'),
            }))

            setForumPosts(sanitizedPosts)
        } catch (error) {
            console.error('Error fetching forum posts:', error)
        }
    }

    const handleDeleteClick = async (forumPostId: number) => {
        try {
            const response = await axios.delete(
                `http://localhost:8081/api/games/${gameId}/forum_posts/${forumPostId}`
            )
            if (response.status === 200) {
                getForumPost()
            } else {
                setDeleteError('Error deleting forum post.')
            }
        } catch (error) {
            console.error('Network or unexpected error:', error)
            setDeleteError('An error occurred while deleting the forum post.')
        }
    }

    return (
        <div>
            <h1 className="font-bold text-xl">Forum Posts for {gameName}</h1>
            <p>
                {forumPosts.length} Questzing Forum Post
                {forumPosts.length !== 1 && 's'}
            </p>

            {deleteError && <div className="text-red-500">{deleteError}</div>}

            {forumPosts.length > 0 ? (
                <ul>
                    {forumPosts.map((post) => (
                        <div
                            key={post.forum_post_id}
                            className="border-2 bg-qDark200 p-4 mt-2 flex flex-col"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-light">
                                    Post by {post.user_name}
                                </p>
                            </div>
                            <h1 className="font-bold text-2xl my-2">
                                {post.forum_post_title}
                            </h1>
                            <p className="flex-grow font-light">
                                {post.forum_post_post}
                            </p>
                            {/* Conditional delete button based on user's ownership */}
                            {user && post.user_name === user.name && (
                                <button
                                    onClick={() =>
                                        handleDeleteClick(post.forum_post_id)
                                    }
                                    className="text-qError100 flex justify-end hover:underline hover:underline-offset-8"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No Forum Posts found.</p>
            )}
        </div>
    )
}

export default ForumPost
