import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { authLogin } from '../store/actions/auth'

export default function Login(props) {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState({})

    const dispatch = useDispatch()

    const onLogin = async () => {
        setError({});
        if(!email){
            setError({email: "this field is required"});
            return
        }
        if(!password){
            setError({password: "this field is required"});
            return
        }
        try{
            setIsLoading(true)
            await dispatch(authLogin({email, password, returnSecureToken:true}))
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
            setError({login: "Somthing went wrong !!"});
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
        <h5 className="text-center">Login</h5>
            <form>
            <small className="form-text text-danger">{error.login}</small>
            <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" 
                    value={email} onChange={e => setEmail(e.target.value)}/> 
                    <small className="form-text text-danger">{error.email}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" 
                    value={password} onChange={e => setPassword(e.target.value)} />
                    <small className="form-text text-danger">{error.password}</small>
                </div>
                <button type="button" className="btn btn-primary" onClick={onLogin}>Login</button>
            </form>
        </div>
    )
}
