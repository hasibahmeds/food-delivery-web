import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Profile = () => {
    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phone: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(url + "/api/user/getprofile", { headers: { token } });
            if (response.data.success && response.data.userData) {
                const user = response.data.userData;
                setData({
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    email: user.email || "",
                    address: user.address || "",
                    phone: user.phone || ""
                })
            }
        } catch (error) {
            toast.error("Error fetching profile")
        }
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(url + "/api/user/updateprofile", {
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phone: data.phone
            }, { headers: { token } });
            
            if (response.data.success) {
                toast.success(response.data.message)
                // We keep the data in state, no need to clear anything.
                // Re-fetching to ensure server-side defaults/formatting are reflected
                fetchUserProfile();
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Error updating profile")
        }
    }

    useEffect(() => {
        if (token) {
            fetchUserProfile();
        }
    }, [token])

    return (
        <div className='profile-page'>
            <div className="profile-container">
                <form onSubmit={onSubmitHandler} className='profile-form'>
                    <div className="profile-header">
                        <h2>My Profile</h2>
                        <p>View and update your personal information</p>
                    </div>

                    <div className="profile-content">
                        <div className="profile-info-section">
                            <div className="multi-fields">
                                <div className="input-group">
                                    <label>First Name</label>
                                    <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
                                </div>
                                <div className="input-group">
                                    <label>Last Name</label>
                                    <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Email Address</label>
                                <input name='email' value={data.email} type="email" placeholder='Email Address' readOnly className='readonly-input' />
                            </div>

                            <div className="input-group">
                                <label>Address</label>
                                <textarea name='address' onChange={onChangeHandler} value={data.address} placeholder='Full Address' required rows="3"></textarea>
                            </div>

                            <div className="input-group">
                                <label>Phone Number</label>
                                <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone Number' required />
                            </div>

                            <button type='submit' className='save-btn'>Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile
