import React from 'react'
import NavBar from './NavBar'
import axios from 'axios';
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user)
    const fetchUser = async() =>{
        if(user) return;
        try{
            const res = await axios.get(BASE_URL+'/profile/view', { withCredentials: true })
            dispatch(addUser(res.data));
        }
        catch(err){
            //if(err.status === 401){
                navigate('/login')
            //}
            console.log(err);
        }
    }
    useEffect(()=>{
            fetchUser();
    },[])
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar></NavBar>
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Body