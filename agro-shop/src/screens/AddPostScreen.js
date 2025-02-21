import React, { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { useSelector } from "react-redux";

import { addPosts } from '../store/actions/posts'

export default function AddPostScreen(props) {
    const sender = useSelector(state => state.auth)
    const [image, setImg] = useState(null)
    const [description, setDesc] = useState('')
    const [type, setType] = useState('')
    const [location, setLocation] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        if (!sender.id){
            alert('You should be logged in to add new Post !!');
            props.history.push('login')
        }
    }, [dispatch, sender.id, props.history])

    const clear = () => {
        setImg(null)
        setDesc('')
        setType('')
        setLocation('')
    }

    const add = async () => {
        if(!image){
            setError({image: "this field is required"});
            return
        }
        if(!description){
            setError({description: "this field is required"});
            return
        }
        if(!type){
            setError({type: "this field is required"});
            return
        }
        if(!location){
            setError({location: "this field is required"});
            return
        }
        try{
            setIsLoading(true)
            await dispatch(addPosts({sender, description, image, type, location, time: Date.now()}))
            setIsLoading(false)
            clear()
            props.history.push('/')
        }catch(err){
            alert('Error : '+ err.message)
            setIsLoading(false)
            return
        }
    }

    if(isLoading){
        return(
            <div style={{height:"100%", width:"100%"}}>
                <div className="loader">Loading...</div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-8">
                    <div className="border rounded p-4 mt-4">
                    <h5 className="text-center">Add New Post</h5>
                        <form>
                            <small className="form-text text-danger">{error.register}</small>
                            <div className="form-group">
                                <label htmlFor="image">Image</label>
                                <input type="file" className="form-control-file" id="image"
                                    onChange={e => setImg(e.target.files[0])} /> 
                                <small className="form-text text-danger">{error.image}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea type="text" className="form-control" id="description" placeholder="Enter Description"
                                    value={description} onChange={e => setDesc(e.target.value)} /> 
                                <small className="form-text text-danger">{error.description}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="type">Type</label>
                                <input type="text" className="form-control" id="type" placeholder="Enter Type" 
                                value={type} onChange={e => setType(e.target.value)} /> 
                                <small className="form-text text-danger">{error.type}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input type="text" className="form-control" id="location" placeholder="Enter Location" 
                                value={location} onChange={e => setLocation(e.target.value)}/> 
                                <small className="form-text text-danger">{error.location}</small>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={add}>Add Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

