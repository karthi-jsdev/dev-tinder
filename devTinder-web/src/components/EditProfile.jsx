import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../utils/constants";
import UserCard from "./userCard";
const EditProfile = ({ user }) => {
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        emailId: user?.emailId || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.patch(BASE_URL + '/profile/edit', formData,{ withCredentials: true });
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-center my-10">
        <div className="flex justify-center items-center h-screen my-10 p-10">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend>Edit Profile</legend>

                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />

                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />

                <label>Email</label>
                <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} />

                <button onClick={handleUpdate}>Update</button>
            </fieldset>
        </div>
        <UserCard user={user}/>
        </div>
    );
};

export default EditProfile;