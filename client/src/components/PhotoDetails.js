import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import moment from 'moment';


const PhotoDetails = (props) => {

    const navigate = useNavigate();
    const {aid} = useParams();
    const [user, setUser] = useState("");
    const [cookies, setCookies] = useCookies([]);
    const [onePhoto,setOnePhoto] = useState([]);
    const {fileName,
            filePath,
            fileType, 
            description, 
            likes,
            createdAt} = onePhoto;

    useEffect(() => {
        const isLogInUser = async () => {
            if(!cookies.jwt){
                console.log('logged out')
            }
        }
        isLogInUser();
    },[]);


    // Load One Photo and details

    useEffect(()=>{
        axios.get("http://localhost:8000/api/photos/getOneFile/"+ aid)
        .then((res)=>{
            setOnePhoto(res.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])

    const deleteHandler = ()=> {
        const check = window.confirm("Are you sure you want to delete this Photo?");
        if (check)
        {
            axios.delete("http://localhost:8000/api/photos/deleteOne/"+ aid)        
            .then((res) => {
                // console.log(res.data);
                navigate('/dashboard');
            })
            .catch((err)=>console.log(err))
        }
    }

    return(
        <div className="view-container">
            <div className="top">
                
                <button onClick={() => deleteHandler()} className="btn btn-danger">Delete</button>
                <button onClick={() => navigate('/dashboard')} className="btn btn-primary">Go to Dashboard</button>
            </div>
            <div className="photo-body">
                <div>
                    <img src={`http://localhost:8000/${filePath}`} alt={fileName} className="image" style={{cursor:'pointer'}}></img>
                </div>

                <div className="photo-details">
                    <h5>Filename: {fileName}</h5>
                    <h5>Upload Date: {moment(createdAt).utc().format('YYYY-MM-DD')}</h5>
                </div>
            </div>
        </div>

    )

}

export default PhotoDetails;