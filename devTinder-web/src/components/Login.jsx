import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
const Login = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [error,setError] = useState("")
    const [formData, setFormData] = useState({
        emailId: '',
        password: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + '/login', formData, { withCredentials: true })
            console.log('Login successful')
            dispatch(addUser(res.data))
            navigate('/')
        } catch (error) {
            console.log(error)
            setError(error?.response?.data || "something went wrong")
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login</legend>

                <label className="label">Email</label>
                <input type="email" name="emailId" className="input" placeholder="Email" onChange={handleChange} />

                <label className="label">Password</label>
                <input type="password" name="password" className="input" placeholder="Password" onChange={handleChange} />

                <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
                {error}
                <Link to="/signup">Sign up</Link>
            </fieldset>
        </div>
    )
}
export default Login
