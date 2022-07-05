import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pic from '../images/Photobomb_Logo.png'

const Navbar = () => {

    const [description,setDescription] = useState("");

    const navigate = useNavigate();

    const searchHandler =(e)=>{
        e.preventDefault();
        axios.get("http://localhost:8000/api/photos/getOneFile/"+ description)        
            .then((res) => {
                console.log(res.data.stringValue);
            })
            .catch((err)=>console.log(err))
    }

    const uploadHandler =(e)=>{
        e.preventDefault();
        navigate("/upload")
    }

    return (
        <>
            <div className="fluid">
                <img src={pic} alt="logo" width="200" height="44" className="d-inline-block align-text-top" />
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    <button className="btn btn-outline-success" type="submit" onClick={(e)=>searchHandler(e)}>Search</button>
                </form>
                <div className="nav-profile">
                    <p onClick={(e)=>uploadHandler(e)}>Upload</p>
                    <p>Profile
                        <select className="select">
                            <option>Edit Account</option>
                            <option>Logout</option>
                        </select>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Navbar;