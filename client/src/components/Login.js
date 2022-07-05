import React, {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Login = ({setLogInUser}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nave = useNavigate("");

    const loginUser = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/login", {
            email,
            password
        })
        .then((res) => {
            console.log(res.data);
            nave('/dashboard');
            setLogInUser(res.data.email);
        })
        .catch((err) => {
            console.log(err.response.data.msg);
            return;
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
                <h1>Log in here</h1>
            </div>
            <form className="form--submits" onSubmit={loginUser}>
                    <div className='mb-3'>
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="email" className="form-control" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        {/* {errors.email && (<span>{errors.email.message}</span>)} */}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="password" className="form-control" id='myPassword' placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <input type="checkbox" onClick={showPassword} /> Show Password <br />
                        {/* {errors.password && (<span>{errors.password.message}</span>)} */}
                    </div>
                    <button className='btn btn-success'>LOG IN</button> &nbsp; <Link to={'/'} ><button className="btn btn-outline-success" type="submit">Register</button></Link>
            </form>
        </>
    )
}

export default Login;