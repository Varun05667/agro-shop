import React, { useState, useEffect } from 'react';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../store/actions/posts';

export default function Posts(props) {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const posts = useSelector(state => state.posts.posts)
    const dispatch = useDispatch()
    
    
    useEffect(() => {
        const fetchPosts = async () => {
            try{
                setError(null)
                await dispatch(getPosts());
                setIsLoading(false)
            }catch(err){
                setError(err.message)
                setIsLoading(false)
            }
        }
        setIsLoading(true)
        fetchPosts();
        return function(){
            setIsLoading(false)
        }
    }, [dispatch])

    if(!isLoading && error){
        
        return (
            <div>
                {error}
            </div>
        )
    }

    if(isLoading){
        return (
            <div style={{height:"100%", width:"100%"}}>
                <div className="loader">Loading...</div>
            </div>
        )
    }

    return (
            <>
                {posts.map((value, index) => {
                    return <div key={index} className="col-sm-12 col-md-11 col-lg-9">
                            <Post history={props.history} post={value} />
                        </div>
                })}
            </>
    )
}