import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";


const Dashboard = () => {

    const {id} = useParams();
    const [user, setUser] = useState("");
    const [cookies, setCookies] = useCookies([]);

    useEffect(() => {
        const isLogInUser = async () => {
            if(!cookies.jwt){
                console.log('logged out')
            }
        }
        isLogInUser();
    }, []);

    return (
        <>
            <div>
                <h1>Dashboard here for {`${user.name}`}</h1>
            </div>
        </>
    )
}

export default Dashboard;