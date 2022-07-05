import React,{useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {

    const navi = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const submitRegistration = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/new", {
            name,
            email,
            password
        })
        .then((res) => {
            console.log(res.data);
            navi('/login');
        })
        .catch((err) => {
            setErrors(err.response.data.errors);
        })
    }

    // THIS IS TO SHOW PASSWORD
    const showPassword = () => {
        let x =document.getElementById("myPassword");
        if(x.type === "password"){
            x.type = "text";
        } else {
            x.type = "password"
        }
    }

    return (
        <>
            <div>
                <h1>Register here</h1>
                <form className='form--submits' onSubmit={submitRegistration}>
                    <div className='mb-3'>
                        <label htmlFor="name" className='form-label'>Name</label>
                        <input type="text" className="form-control" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
                        {errors.name && (<span>{errors.name.message}</span>)}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="email" className="form-control" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && (<span>{errors.email.message}</span>)}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="password" className="form-control" id='myPassword' placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="checkbox" onClick={showPassword} /> Show Password <br />
                        {errors.password && (<span>{errors.password.message}</span>)}
                    </div>
                    <button className='btn btn-success'>Register</button> &nbsp; <Link to={'/login'} ><button className="btn btn-outline-success" type="submit">Log In</button></Link>
                </form>
                
            </div>
        </>
    )
}

export default Register;