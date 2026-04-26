import React, { useEffect } from 'react'
import axios from 'axios';
import { addRequests, removeRequests } from '../utils/requestSlice'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';

const Requests = () => {
  const requests = useSelector((store) => store.requests)
  const dispatch = useDispatch()
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true
      })
      dispatch(addRequests(res.data.data))
    }
    catch (e) {
      console.log(e);
    }
  }
  useEffect(()=>{
    fetchRequests()
  },[])
  const reviewRequest = async (status,_id)=>{
    try{
      const res = await axios.post(
        BASE_URL+'/request/review/'+status+'/'+_id,
        {},
        {withCredentials:true}
      )
      dispatch(removeRequests(_id))
    }catch(e){
      
    }
  }
  if (!requests) return;
    if (requests.length === 0) return <h1>No requests Found</h1>
    return (
        <div className='justify-center my-10'>
            <h1 className='text-bold text-2xl'>requests</h1>
            {
                requests.map((request) => {
                    const {_id,firstName,lastName,photoUrl,age,gender,about} = request.fromUserId;
                    return <div key={_id} className='m-4 p-4 border rounded-lg'>
                        <img alt="photo" className='w-20 h-20' src={photoUrl}/>
                        <h2>{firstName} {lastName}</h2>
                        <p>{about}</p>
                        <div>
                          <button className='btn btn-primary mx-2' onClick={()=>reviewRequest("rejected",_id)}>Reject</button>
                          <button className='btn btn-secondary mx-2' onClick={()=>reviewRequest("accepted",_id)}>Accept</button>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default Requests