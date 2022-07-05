import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetPassword } from '../../Actions/UserActions';
import './ResetPassword.css';


const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const {error, loading, message} = useSelector((state) => state.like);
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(params.token, newPassword))
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
    },[error,message,alert,dispatch])

  return (
    <div className='resetPassword'>
        <form className='resetPasswordForm' onSubmit={submitHandler}>
            <Typography variant="h3" style={{ padding: "2vmax"}}>
                Social APP
                </Typography>

             <input type="password" placeholder='New Password' className='updatePasswordInputs' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>

            <Link to="/">
                <Typography>Login</Typography>
            </Link>
                <Typography>or</Typography>
            <Link to="/forgot/password">
                <Typography>Request another token!</Typography>
            </Link>
            <Button disabled={loading} type="submit">Reset Password</Button>
        </form>
    </div>
  )
}

export default ResetPassword