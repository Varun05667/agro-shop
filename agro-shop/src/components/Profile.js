import React, { useState} from 'react'
import { updateProfile } from '../store/actions/auth'
import { useDispatch, useSelector } from 'react-redux'

export default function Profile(props) {
    
    const user = useSelector(state => state.auth)
    
    const [name, setName] = useState(user.name)
    const [phone, setPhone] = useState(user.phone)
    const [image, setImage] = useState(user.image)

    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState({})

    const dispatch = useDispatch()

    const onUpdate = async () => {
        if(!name){
            setError({name: "this field is required"});
            return
        }
        if(!phone){
            setError({phone: "this field is required"});
            return
        }

        setIsLoading(true)
        await dispatch(updateProfile({
            id: user.id,
            data: {name, phone, image}
        }))
        setIsLoading(false)
        props.history.push("profile")
    }

    if(isLoading){
        return(
            <div style={{height:"100%", width:"100%"}}>
                <div class="loader">Loading...</div>
            </div>
        )
    }

    return (
        <form>
            <small className="form-text text-danger">{error.register}</small>
            <div className="form-group">
                <label htmlFor="image">Profile picture</label>
                <input type="file" className="form-control-file" id="image"
                    onChange={e => setImage(e.target.files[0])} />
            </div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter Name"
                    value={name} onChange={e => setName(e.target.value)} /> 
                <small className="form-text text-danger">{error.name}</small>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone No</label>
                <input type="text" className="form-control" id="phone" placeholder="Enter Phone No" 
                value={phone} onChange={e => setPhone(e.target.value)} /> 
                <small className="form-text text-danger">{error.phone}</small>
            </div>
            <button type="button" className="btn btn-primary" onClick={onUpdate}>Update</button>
        </form>
    )
}
