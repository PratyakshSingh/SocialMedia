import { Avatar, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../Actions/UserActions';
import './Register.css';


const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const dispatch = useDispatch();
    const alert = useAlert()
    const {loading, error} = useSelector((state) => state.user);
    const handleImageChange = (e) =>{
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = (e) => {
            if(Reader.readyState===2){
                setAvatar(Reader.result);
            }
        }
    }


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser(name,email,password,avatar));
    }
    
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch({type: "clearErrors"});
        }
    },[dispatch,error,alert])
  return (
    <div className='register'>
        <form className="registerForm" onSubmit={submitHandler}>
            <Typography variant="h3" style={{ padding: "2vmax"}}>
                Social APP
            </Typography>
            <Avatar src={avatar} alt="User" sx={{ height: "10vmax", width: "10vmax"}} />

            <input type="file" accept="image/*" onChange={handleImageChange}/>
            <input type="text" className='registerInputs' value={name} placeholder='Name' required onChange={(e) => setName(e.target.value)}/>
            <input type="email" className='registerInputs' placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" className='registerInputs' placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
            

            <Link to="/"><Typography>Already Signed up? Login Now</Typography></Link>
            <Button disabled={loading} type="submit">SignUp</Button>
        </form>
    </div>
  )
}

export default Register