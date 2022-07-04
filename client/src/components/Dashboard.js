import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const Dashboard = () => {

    const {id} = useParams();
    const [user, setUser] = useState("");
    const [cookies, setCookies] = useCookies([]);
    const [showPhotos,setShowPhotos] = useState([]);
    const [showRecent,setShowRecent] = useState([]);
    const [showTop,setShowTop] = useState([]);

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

    //LOAD RECENTLY UPLOADED
    useEffect(()=>{
        axios.get("http://localhost:8000/api/photos/recent")
        .then((res)=>{
            setShowRecent(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    //LOAD TOP LIKED
    useEffect(()=>{
        axios.get("http://localhost:8000/api/photos/topLikes")
        .then((res)=>{
            setShowTop(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    return (
        <>
            <div>
                <h1>Dashboard here for {`${user.name}`}</h1>
            {showPhotos&&
                    showPhotos.map((elems,index)=>{
                        return(
                            <div key={index}>
                                <img src={`http://localhost:8000/${elems.filePath}`} alt={elems.fileName}></img>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <h1>Recently Uploaded</h1>
                {showRecent&&
                        showRecent.map((elems,index)=>{
                            return(
                                <div key={index}>
                                    <img src={`http://localhost:8000/${elems.filePath}`} alt={elems.fileName}></img>
                                </div>
                            )
                        })
                    }
            </div>
            <div>
                <h1>Recently Uploaded</h1>
                {showRecent&&
                        showRecent.map((elems,index)=>{
                            return(
                                <div key={index}>
                                    <img src={`http://localhost:8000/${elems.filePath}`} alt={elems.fileName}></img>
                                </div>
                            )
                        })
                    }
            </div>
            <div>
                <h1>Top liked</h1>
                {showTop&&
                        showTop.map((elems,index)=>{
                            return(
                                <div key={index}>
                                    <img src={`http://localhost:8000/${elems.filePath}`} alt={elems.fileName}></img>
                                </div>
                            )
                        })
                    }
            </div>
        </>
    )
}

export default Dashboard;