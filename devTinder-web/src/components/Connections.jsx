import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { addConnecitons } from '../utils/connectionsSlice';

function Connections() {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch()
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true })
            dispatch(addConnecitons(res.data.data))
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetchConnections()
    }, [])
    if (!connections) return;
    if (connections.length === 0) return <h1>No Connections Found</h1>
    return (
        <div className='justify-center my-10'>
            <h1 className='text-bold text-2xl'>Connections</h1>
            {
                connections.map((connection) => {
                    const {_id,firstName,lastName,photoUrl,age,gender,about} = connection;
                    return <div key={_id} className='m-4 p-4 border rounded-lg'>
                        <img alt="photo" className='w-20 h-20' src={photoUrl}/>
                        <h2>{firstName} {lastName}</h2>
                        <p>{about}</p>
                    </div>
                })
            }
        </div>
    )
}

export default Connections