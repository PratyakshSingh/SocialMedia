import React, { useEffect, useState } from 'react';
import './UpdatePassword.css';
import { Typography, Button} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import { updatePassword } from '../../Actions/UserActions';
import { useAlert } from 'react-alert';


const UpdatePassword = () => {
    const {loading, error, message} = useSelector((state) => state.like);


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
     const dispatch = useDispatch();
     const alert = useAlert();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updatePassword(oldPassword, newPassword))
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch({type: "clearErrors"});
        }
        if(message){
            alert.success(message);
            dispatch({type: "clearMessage"});
        }
    },[dispatch,error,alert,message])

  return (
    <div className='updatePassword'>
        <form className='updatePasswordForm' onSubmit={submitHandler}>
            <Typography variant="h3" style={{ padding: "2vmax"}}>
                Social APP
                </Typography>

            <input type="password" placeholder='Old Password' className='updatePasswordInputs' required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
            <input type="password" placeholder='New Password' className='updatePasswordInputs' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>

            <Button disabled={loading} type="submit">Change Password</Button>

        </form>
    </div>
  )
}



export default UpdatePassword