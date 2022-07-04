import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const Dashboard = (props) => {

    const {photoCollection,setPhotoCollection} = props;

    const {id} = useParams();
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

    useEffect(()=>{
        axios.get("http://localhost:8000/api/photos/getSingleFiles")
        .then((res)=>{
            setShowPhotos(res.data)
            console.log(res.data)
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
        </>
    )
}

export default Dashboard;