import React, { useState, useEffect } from 'react';
// import { FlatList, View, ActivityIndicator, Text, Alert, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, deleteContact } from '../store/actions/auth';

import {FaPhone, FaUserAltSlash} from 'react-icons/fa';

// import { Feather } from '@expo/vector-icons';

// import call from 'react-native-phone-call';

export default function Contacts(props) {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    const user = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    
    useEffect(() => {
        const fetchContacts = async (id) => {
            try{
                setError(null)
                await dispatch(getContacts(id));
                setIsLoading(false)
            }catch(err){
                setError(err.message)
                setIsLoading(false)
            }
        }
        setIsLoading(true)
        fetchContacts(user.id);
    }, [user.id, dispatch])

    if(!isLoading && error){
        return (
            <div className="text-danger">
                {error}
            </div>
        )
    }

    const onDelete = async (id) => {
        if(!id){
            return
        }
        
        try {
            setIsLoading(true)
            await dispatch(deleteContact(user.id, id))
            setIsLoading(false)
        } catch (error) {
            alert('Error: '+error.message)
            setIsLoading(false)
        }
    }

    if(isLoading){
        return (
            <div style={{height:"100%", width:"100%"}}>
                <div className="loader">Loading...</div>
            </div>
        )
    }

    if (!user.contacts){
        return(
            <div>
                Nothing to display here....
            </div>
        )
    }

    return (
        <div>
            {user.contacts.map((value, index) => {
                return (
                    <div key={index} className="row p-1 m-3 border text-center">
                        <h6 className="m-0 pt-2 pl-2">{value.name}</h6>
                        <button className="btn text-center p-1 ml-auto" style={{height:"100%"}}
                            onClick={() => onDelete(value.id)}>
                            <FaUserAltSlash className="ml-auto" size={25} color={"red"}/>
                        </button>
                        <a className="btn text-center p-1" style={{height:"100%"}}
                            href={"tel:"+value.phone}>
                            <FaPhone size={20} color={"MediumSeaGreen"} />
                        </a>
                    </div>
                )
            })}
        </div>
    )
}
