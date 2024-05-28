import { ChangeEvent, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../App'
import CommentList from './CommentList'
import { VITE_QUESTZING_API_URL } from '../../../services/api-client'

interface ForumListProps {
    gameId: number
    gameName: string
}

interface ForumListData {
    forum_post_id: number
    forum_post_title: string
    forum_post_post: string
    forum_post_created_at: string
    user_name: string
}

const ForumList = ({ gameId, gameName }: ForumListProps) => {
    const { user } = useContext(AuthContext)
    const [ForumLists, setForumLists] = useState<ForumListData[]>([])
    const [deleteError, setDeleteError] = useState<string | null>(null)
    const [showCommentsForPost, setShowCommentsForPost] = useState<
        number | null
    >(null)
    const [newComment, setNewComment] = useState('')
    const [submitSuccess, setSubmitSuccess] = useState(false)
    // @ts-expect-error - need to revisit bug when time
    const [submitFail, setSubmitFail] = useState(false)

    useEffect(() => {
        getForumList()
    }, [gameId, newComment])

    const getForumList = async () => {
        try {
            const response = await axios.get<ForumListData[]>(
                `${VITE_QUESTZING_API_URL}/api/games/${gameId}/forum_posts`
            )

            setForumLists(response.data)
        } catch (error) {
            console.error('Error fetching forum posts:', error)
        }
    }

    // deletes the forum post when called
    const handleDeleteClick = async (ForumListId: number) => {
        try {
            const response = await axios.delete(
                `${VITE_QUESTZING_API_URL}/api/games/${gameId}/forum_posts/${ForumListId}`
            )
            if (response.status === 200) {
                getForumList()
            } else {
                setDeleteError('Error deleting forum post.')
            }
        } catch (error) {
            console.error('Network or unexpected error:', error)
            setDeleteError('An error occurred while deleting the forum post.')
        }
    }

    const handleShowComments = (postId: number) => {
        setShowCommentsForPost(showCommentsForPost === postId ? null : postId)
    }

    const handleNewCommentChange = (
        event: ChangeEvent<HTMLTextAreaElement>
    ) => {
        setNewComment(event.target.value)
    }

    const handleSubmitComment = async (postId: number) => {
        if (newComment.trim() === '') return // if the comment is empty we do not continue

        try {
            const response = await axios.post(
                `${VITE_QUESTZING_API_URL}/api/forum_posts/${postId}/comments`,
                {
                    comment_content: newComment,
                }
            )
            if (response.status === 200) {
                setSubmitSuccess(true)
                setSubmitFail(false)
            } else {
                setSubmitFail(true)
            }

            setNewComment('')
        } catch (error) {
            console.error('Error submitting comment:', error)
        }
    }

    return (
        <div>
            <h1 className="font-bold text-xl">Forum Posts for {gameName}</h1>
            <p>
                {ForumLists.length} Questzing Forum Post
                {ForumLists.length !== 1 && 's'}
            </p>
            {deleteError && <div className="text-red-500">{deleteError}</div>}

            {ForumLists.length > 0 ? ( // if there are any forum posts we continue with .map function
                <ul>
                    {ForumLists.map((post) => (
                        <li
                            key={post.forum_post_id}
                            className="border-2 bg-qDark200 p-4 mt-2"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-light">
                                    Post by {post.user_name}
                                </p>
                                {/* if the post user is the same as the logged in user, show the delete button */}
                                {user && post.user_name === user.name && (
                                    <button
                                        onClick={() =>
                                            handleDeleteClick(
                                                post.forum_post_id
                                            )
                                        }
                                        className="text-qError100 flex justify-end mt-2 hover:underline hover:underline-offset-8"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                            <h1 className="font-bold text-2xl mb-2">
                                {post.forum_post_title}
                            </h1>
                            <p className="flex-grow font-light">
                                {post.forum_post_post}
                            </p>
                            <div className="mt-4">
                                {/* button to show comment field on the correct forum post */}
                                <button
                                    onClick={() =>
                                        handleShowComments(post.forum_post_id)
                                    }
                                    className=" text-qPrimary200 hover:underline flex justify-end hover:underline-offset-8 py-2 rounded-md mb-2"
                                >
                                    {showCommentsForPost === post.forum_post_id
                                        ? 'Hide Comments'
                                        : 'View/Add Comments'}
                                </button>
                                {showCommentsForPost === post.forum_post_id && (
                                    <div
                                        key={
                                            submitSuccess
                                                ? 'submitted'
                                                : 'not-submitted'
                                        }
                                    >
                                        <CommentList
                                            postId={post.forum_post_id}
                                        />

                                        {/* Form for adding a new comment */}
                                        <form
                                            onSubmit={(event) => {
                                                event.preventDefault()
                                                handleSubmitComment(
                                                    post.forum_post_id
                                                )
                                            }}
                                        >
                                            <textarea
                                                value={newComment}
                                                onChange={
                                                    handleNewCommentChange
                                                }
                                                placeholder="Write your comment..."
                                                className="w-full p-2 border rounded-md mb-2 text-black"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-qPrimary100 transition text-qDark100 py-2 px-4 rounded-full font-medium hover:bg-qPrimary300"
                                            >
                                                Add Comment
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Forum Posts found.</p>
            )}
        </div>
    )
}

export default ForumList
