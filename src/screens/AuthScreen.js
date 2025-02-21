import React, {useEffect}from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Login from '../components/Login';
import SignUp from '../components/SignUp';

export default function AuthScreen(props){

	const user = useSelector(state => state.auth)

	const dispatch = useDispatch()

	useEffect(() => {
		if (user.id){
				props.history.push('/')
		}
}, [dispatch, user, props.history])

	return(
		<div className="container">
			<div className="row">
				<div className="col-sm-12 col-md-10 col-lg-6 p-4">
					<Login history={props.history}/>
				</div>
				<div className="col-sm-12 col-md-10 col-lg-6 p-4">
					<SignUp history={props.history}/>
				</div>
			</div>
		</div>
	)
}