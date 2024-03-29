import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import RecentlyUploaded from "./RecentlyUploaded";
import TopLikes from "./TopLikes";

const Dashboard = (props) => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [cookies, setCookies] = useCookies([]);
    const [showPhotos,setShowPhotos] = useState([]);

    useEffect(() => {
        const isLogInUser = async () => {
            if(!cookies.jwt){
                console.log('logged out')
            }
        }
        isLogInUser();
    }, []);

    //LOAD ALL PHOTOS
    useEffect(()=>{
        axios.get("http://localhost:8000/api/photos/getSingleFiles")
        .then((res)=>{
            setShowPhotos(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const viewHandler=(e,idBelow)=>{
        e.preventDefault()
        navigate(`/dashboard/photos/${idBelow}`)
    }

    return (
        <>
            <div className="dashboard">
                <h1>Dashboard here for {`${user.name}`}</h1>
                {showPhotos.length >=1 && <RecentlyUploaded/>}
                {showPhotos.length >=1 && <TopLikes/>}
                <h6>All Photos</h6>
                <div className="row">
                    {showPhotos&&
                            showPhotos.map((elems,index)=>{
                                return(
                                    <div key={index} className="col-6 col-sm-3">
                                        <img src={`http://localhost:8000/${elems.filePath}`} alt={elems.fileName} className="img-thumbnail" style={{cursor:'pointer'}} onClick={(e)=>{viewHandler(e,elems._id)}}></img>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </>
    )
}

export default Dashboard;