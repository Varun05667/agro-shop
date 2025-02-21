import React, { useState } from 'react'

import { authSignUp } from '../store/actions/auth'
import { useDispatch } from 'react-redux'

export default function SignUp(props) {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')

    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const onSignUp = async () => {
        if(!name){
            setError({name: "this field is required"});
            return
        }
        if(!phone){
            setError({phone: "this field is required"});
            return
        }
        if(!email){
            setError({email: "this field is required"});
            return
        }
        if(!password){
            setError({password: "this field is required"});
            return
        }
        if(!cPassword){
            setError({cPassword: "this field is required"});
            return
        }
        if(!(password === cPassword)){
            setError({cPassword: "Password doesn't match."});
            return
        }
        try{
            setIsLoading(true)
            await dispatch(authSignUp({
                user: {email, password, returnSecureToken:true},
                data: {name, phone}
            }))
            setIsLoading(false)
        }catch(err){
            setError({register: "Something went wrong !!"});
            setIsLoading(false)
            return
        }
        
        props.history.push("/")
    }

    if(isLoading){
        return(
            <div style={{height:"100%", width:"100%"}}>
                <div className="loader">Loading...</div>
            </div>
        )
    }

    return (
        <div className="border rounded p-4 mt-4">
        <h5 className="text-center">Register</h5>
            <form>
                <small className="form-text text-danger">{error.register}</small>
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
                <div className="form-group">
                    <label htmlFor="email-reg">Email address</label>
                    <input type="email" className="form-control" id="email-reg" placeholder="Enter Email" 
                    value={email} onChange={e => setEmail(e.target.value)}/> 
                    <small className="form-text text-danger">{error.email}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password-reg">Password</label>
                    <input type="password" className="form-control" id="password-reg" placeholder="Password" 
                    value={password} onChange={e => setPassword(e.target.value)} />
                    <small className="form-text text-danger">{error.password}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="cPassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cPassword" placeholder="Confirm Password"
                    value={cPassword} onChange={e => setCPassword(e.target.value)} />
                    <small className="form-text text-danger">{error.cPassword}</small>
                </div>
                <button type="button" className="btn btn-primary" onClick={onSignUp}>Register</button>
            </form>
        </div>
    )
}
