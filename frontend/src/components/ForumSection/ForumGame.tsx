import { useState, FormEvent, ChangeEvent } from 'react'
import axios from 'axios'
import ForumList from './ForumList'
import { VITE_QUESTZING_API_URL } from '../../../services/api-client'

interface ForumGameProps {
    gameId: number
    gameName: string
}

const ForumGame = ({ gameId, gameName }: ForumGameProps) => {
    const [forumPost, setForumPost] = useState<string>('')
    const [forumTitle, setForumTitle] = useState<string>('')
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitFail, setSubmitFail] = useState(false)

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForumTitle(event.target.value)
    }
    const handlePostChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setForumPost(event.target.value)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const response = await axios.post(
                `${VITE_QUESTZING_API_URL}/api/games/${gameId}/forum_posts`,
                { post_content: forumPost, post_title: forumTitle } // this means we send the forumPost from here to our backend as post_content
            )

            if (response.status === 200) {
                setForumTitle('')
                setForumPost('')
                setSubmitSuccess(true)
                setSubmitFail(false)
            } else {
                setSubmitFail(true)
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setSubmitFail(true)
            } else {
                setSubmitFail(true)
            }
        }
    }

    return (
        <div key={submitSuccess ? 'submitted' : 'not-submitted'} className="">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg">Write a forum post</h1>
            </div>
            <form className=" " onSubmit={handleSubmit}>
                <div className={`rounded-md`}>
                    <input
                        type="text"
                        className="text-white w-1/2 bg-qDark200 p-4 rounded-md outline-none mb-2"
                        value={forumTitle}
                        onChange={handleTitleChange}
                        placeholder="Enter a title for your post..."
                    />
                    <textarea
                        className="text-white bg-qDark200 p-4 w-full rounded-md outline-none"
                        value={forumPost}
                        onChange={handlePostChange}
                        placeholder="Write your post here..."
                        rows={5}
                        cols={5}
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
                    Failed to post. Please try logging in...
                </div>
            )}

            <ForumList gameId={gameId} gameName={gameName} />
        </div>
    )
}

export default ForumGame
