import axios from "axios";
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";

const TopLikes=()=> {

    const navigate = useNavigate();
    const [showTop,setShowTop] = useState([]);

    const viewHandler=(e,idBelow)=>{
        e.preventDefault()
        navigate(`/dashboard/photos/${idBelow}`)
    }

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
        <div>
            <h6>Top Likes</h6>
                <div className="row">
                    {showTop&&
                            showTop.map((elems,index)=>{
                                return(
                                    <div key={index} className="col">
                                        <img src={`http://localhost:8000/${elems.filePath}`} alt={elems.fileName} className="img-thumbnail" style={{cursor:'pointer'}} onClick={(e)=>{viewHandler(e,elems._id)}}></img>
                                    </div>
                                )
                            })
                    }
                    </div>
        </div>
    )
}

export default TopLikes;