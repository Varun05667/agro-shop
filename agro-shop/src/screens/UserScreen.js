import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Profile from '../components/Profile';
import Contacts from '../components/Contacts'

import { getProfile } from '../store/actions/auth';

import * as user_img from '../assets/user.png'

export default function UserScreen(props){

    const user = useSelector(state => state.auth)

    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!user.id){
            alert('You should be logged in to visit this page !!');
            props.history.push('login')
        }
    }, [dispatch, user.id, props.history])

    useEffect(()=>{
        const get = async (id) => {
            try{ 
            setIsLoading(true)
            await dispatch(getProfile(id))
            setIsLoading(false)
        }
        catch(err){
            setIsLoading(false)
            return
        }
        }
        get(user.id)
    }, [dispatch, user.id])

    const getDp = () => {
        if(!user.image){
            return user_img
        }

        return user.image
    }
    if(isLoading){
        return(
            <div style={{height:"100%", width:"100%"}}>
                <div className="loader">Loading...</div>
            </div>
        )
    }

    return (
        <div className="container mb-5">
            <div className="pt-5" style={{alignItems:"center"}}>
                <div className="text-center" >
                    <img className="rounded-circle ml-auto mr-auto" alt={user.name} 
                        src={getDp()} height={150} width={150} />
                    <br />
                    <h5 className="p-3">{user.name}</h5>
                </div>
                <div className="border">
                    <ul className="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="pills-profile-tab" 
                                data-toggle="pill" href="#pills-profile" 
                                role="tab" aria-controls="pills-profile" 
                                aria-selected="true"
                            >Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-contact-tab" 
                                data-toggle="pill" href="#pills-contact" 
                                role="tab" aria-controls="pills-contact" 
                                aria-selected="false"
                            >Contact</a>
                        </li>
                    </ul>
                    <div className="tab-content p-3" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-profile" 
                            role="tabpanel" aria-labelledby="pills-profile-tab"
                        >
                            <Profile history={props.history}/>
                        </div>
                        <div className="tab-pane fade" id="pills-contact" 
                            role="tabpanel" aria-labelledby="pills-contact-tab"
                        >
                            <Contacts />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 