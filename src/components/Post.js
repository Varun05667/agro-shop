import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { addContact, deleteContact, getProfileImage } from '../store/actions/auth'

import * as user_img from '../assets/user.png';

import {FaUserPlus, FaPhone, FaUserAltSlash} from 'react-icons/fa';

const Post = props => {
    const {sender, image, location, description, type, time} = props.post
    const [isSaved, setIsSaved] = useState(false)

    const id = useSelector(state => state.auth.id)
    const [dp, setDp] = useState(user_img)

    const dispatch = useDispatch()

    const timeDiff = () => {
        let diff = Math.floor((Date.now() - time)/1000)
        if (diff > 60*60*24){
            return `${Math.floor(diff/=60*60*24)} day${diff>1? '' :'s'} ago`
        }else if(diff > 60*60){   
            return `${Math.floor(diff/=60*60)} hour${diff>1? '' :'s'} ago`
        }else if(diff > 60){  
            return `${Math.floor(diff/=60)} minute${diff>1? '' :'s'} ago`
        }else{
            return `${diff} seconds ago`
        }
    }

    useEffect(() => {
        const getDp = async () => {
        try{
            const res = await getProfileImage(sender.id);
            if (res){
                setDp(res)
            }
        }
        catch(err){}
        }
        getDp()
    }, [dp, sender.id])

    const saveIcon = () => {
        if (isSaved){
            return <FaUserAltSlash size={25} color={"red"}/>
        }
        else{
            return <FaUserPlus size={25} color={"DodgerBlue"} />
        }
    }

    const onSave = async () => {
        if(!id){
            var goToLogin = window.confirm('You should be logged in to add contact !!');

            if (goToLogin){
                props.history.push('login')
            }
            return
        }
        if(!isSaved){
            try {
                await dispatch(addContact(id, sender))
                setIsSaved( isSaved => !isSaved)
            } catch (error) {
            }
        }else{
            try {
                await dispatch(deleteContact(id, sender.id))
                setIsSaved( isSaved => !isSaved)
            } catch (error) {
            }
        }
    }
    return (
        <div className="card mt-3 mb-3">
            <div className="card-header">
                <div className="row">
                    <div className="col-auto pl-2 pr-0">
                        <img src={dp} alt={sender.name} className="rounded-circle" width={50} height={50}/>
                    </div>
                    <div className="col pt-1">
                        <h6 className="card-title m-auto">{sender.name}</h6>
                        <p className="m-auto"><small className="text-muted">{location}</small></p>
                    </div>
                    <div className="col-auto ml-auto">
                        <button className="btn text-center p-1 pb-4" style={{height:"100%"}}
                            onClick={onSave}>
                            {saveIcon()}
                        </button>
                        <a className="btn text-center p-1" style={{height:"100%"}}
                            href={"tel:"+sender.phone}>
                            <FaPhone size={20} color={"MediumSeaGreen"} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                <img className="card-img-top border" src={image+""} alt="post" />
                <p className="card-text pr-3 pl-3 pt-2">{description}</p>
                <p className="pr-3 pl-3 m-0"><b>{type}</b></p>
                <p className="card-text pr-3 pl-3"><small className="text-muted">{timeDiff()}</small></p>
            </div>
        </div>
    )
}


export default Post