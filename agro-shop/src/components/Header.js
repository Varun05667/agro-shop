import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import {FaUser, FaSignOutAlt, FaPlus} from 'react-icons/fa'

import * as logo from '../assets/icon.png'

import {logout} from '../store/actions/auth'
export default function Header(props) {
  const user = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const history = useHistory()
  const onLogout = () => {
    dispatch(logout()).then(() => {
      history.push("login")
    })
  }
  var authHeader = () => {
    if (user.id){
      return (
        <>
          <Link class="btn btn-outline-primary mr-3" to="profile">
            <FaUser size={25} />
          </Link>
          <Link class="btn btn-outline-danger mr-3" onClick={onLogout}>
            <FaSignOutAlt size={25} />
          </Link>
        </>
      )
    }
    else {
      return <Link className="btn btn-primary" to="login">Login</Link>
    }
  }
  
  return (
      <nav className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <img src={logo} 
              width="30" height="30" 
              className="d-inline-block align-top mr-2" alt="" 
          />
          Agro Shop
        </Link>
        <div className="nav ml-auto">
          <Link className="btn btn-outline-light mr-3" to="new-post"><FaPlus /> New Post</Link>
          {authHeader()}
        </div>
      </nav>
  )
}
