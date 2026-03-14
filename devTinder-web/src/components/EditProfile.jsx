import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
const EditProfile = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const handleUpdate = async () => {
        console.log(formData)
        try {
            const res = await axios.post("http://localhost:7777/signup", formData, { withCredentials: true })
            console.log(res)
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Edit Profile</legend>

                <label className="label">FirstName</label>
                <input type="firstName" name="firstName" className="input" placeholder="FirstName" onChange={handleChange} />

                <label className="label">LastName</label>
                <input type="lastName" name="lastName" className="input" placeholder="LastName" onChange={handleChange} />

                <label className="label">emailId</label>
                <input type="emailId" name="emailId" className="input" placeholder="emailId" onChange={handleChange} />

                <label className="label">Password</label>
                <input type="password" name="password" className="input" placeholder="Password" onChange={handleChange} />

                <button className="btn btn-neutral mt-4" onClick={handleUpdate}>Update</button>
            </fieldset>
        </div>
    )
}

export default EditProfile