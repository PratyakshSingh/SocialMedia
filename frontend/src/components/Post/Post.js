import { Avatar, Button, Typography, Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react';
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
    } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import './Post.css'
import { useDispatch, useSelector } from 'react-redux';
import { addCommentOnPost, deletePost, likePost, updatePost } from "../../Actions/PostActions"
import { getFollowingPost, getMyPosts, getUserPosts, getUserProfile, loadUser } from '../../Actions/UserActions';
import User from '../User/User';
import CommentCard from '../CommentCard/CommentCard';


const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
    isHome = false,
    isUserProfile = false
}) => {

    const [liked, setLiked] = useState(false);
    const [likesUser, setLikesUser] = useState(false);

    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);

    const [captionValue, setCaptionValue] = useState(caption);
    const [captionToggle, setCaptionToggle] = useState(false);

    const dispatch = useDispatch();
    const params = useParams();
    const {user} = useSelector((state) => state.user);

    const handleLike = async() => {
        setLiked(!liked);
        await dispatch(likePost(postId));

        if(isAccount){
            dispatch(getMyPosts());
        }else if(isHome){
            dispatch(getFollowingPost())
        }else if(isUserProfile){
            dispatch(getUserProfile(params.id));
            dispatch(getUserPosts(params.id));
        }
    }
    
    const addCommentHandler = async(e) => {
        e.preventDefault();
        await dispatch(addCommentOnPost(postId, commentValue));

        if(isAccount){
            dispatch(getMyPosts());
        }else if(isHome){
            dispatch(getFollowingPost())
        }else if(isUserProfile){
            dispatch(getUserProfile(params.id));
        }
    }

    const updateCaptionHandler = (e) => {
        e.preventDefault();
        dispatch(updatePost(captionValue,postId));
        dispatch(getMyPosts())
    }

    const deletePostHandler = async() => {
        await dispatch(deletePost(postId));
        dispatch(getMyPosts());
        dispatch(loadUser())
    }


    useEffect(() => {
        likes.forEach((item) => {
            if(item._id===user._id){
                setLiked(true);
            }
        })
    }, [likes,user._id])

  return (
    <div className='post'>
        <div className="postHeader">
            {isAccount ? <Button onClick={() => setCaptionToggle(!captionToggle)}>
                <MoreVert />
            </Button>: null}

        </div>

        <img src={postImage} alt="Post" />

        <div className="postDetails">

            <Avatar src={ownerImage} alt="User" sx={{
                height: "3vmax",
                width: "3vmax"
            }} />

            <Link to={`/user/${ownerId}`}>
                <Typography fontWeight={700}>{ownerName}</Typography>
            </Link>

            <Typography 
                fontWeight={100}
                color="rgba(0,0,0,0.582)"
                style={{ alignSelf: "center" }}
            >{caption}</Typography>
        </div>

        <button style={{
            border: "none",
            backgroundColor: "white",
            cursor: "pointer",
            margin: "1vmax 2vmax"
            }}
            onClick={() => setLikesUser(!likesUser)}
            disabled={likes.length===0? true: false}
        >
            <Typography>{likes.length} likes</Typography>
        </button>

        <div className="postFooter">
            <Button onClick={handleLike}>
                {liked? <Favorite style={{color: "red"}} /> : <FavoriteBorder />}
            </Button>

            <Button onClick={() => setCommentToggle(!commentToggle)}>
                <ChatBubbleOutline />
            </Button>

            {isDelete ?
            <Button onClick={deletePostHandler}>
                <DeleteOutline />
            </Button>: null}

        </div>

        <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
            <div className="DialogBox">
                <Typography variant="h4">Liked By</Typography>

                {
                    likes.map(like => (
                        <User 
                            key={like._id}
                            userId={like._id}
                            name={like.name}
                            avatar={like.avatar.url}
                        />
                    ))
                }
            </div>
        </Dialog>

        <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>
            <div className="DialogBox">
                <Typography variant="h4">Comments</Typography>

                <form className="commentForm" onSubmit={addCommentHandler}>
                    <input type="text" value={commentValue} onChange={(e) => setCommentValue(e.target.value)} placeholder="Comment here..." required/>

                    <Button type='submit' variant='contained'>Add</Button>
                </form>


                {
                    comments.length > 0 ? comments.map((item) => 
                        <CommentCard 
                            key={item._id}
                            userId={item.user._id}
                            name={item.user.name}
                            avatar={item.user.avatar.url}
                            comment={item.comment}
                            commentId={item._id}
                            postId={postId}
                            isAccount={isAccount}
                            isHome={isHome}
                            isUserProfile={isUserProfile}
                        />
                    ): <Typography>No Comments Yet</Typography>
                }

            </div>
        </Dialog>


        <Dialog open={captionToggle} onClose={() => setCaptionToggle(!captionToggle)}>
            <div className="DialogBox">
                <Typography variant="h4">Update Caption</Typography>

                <form className="commentForm" onSubmit={updateCaptionHandler}>
                    <input type="text" value={captionValue} onChange={(e) => setCaptionValue(e.target.value)} placeholder="Update Caption here..." required/>

                    <Button type='submit' variant='contained'>Update</Button>
                </form>
            </div>
        </Dialog>
    </div>
  )
}

export default Post