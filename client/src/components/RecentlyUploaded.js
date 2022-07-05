import axios from "axios";
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";

const RecentlyUploaded=()=> {

    const navigate = useNavigate();
    const [showRecent,setShowRecent] = useState([]);

    const viewHandler=(e,idBelow)=>{
        e.preventDefault()
        navigate(`/dashboard/photos/${idBelow}`)
    }

    useEffect(()=>{
        axios.get("http://localhost:8000/api/photos/recent")
        .then((res)=>{
            setShowRecent(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    return (
        <div>
            <h6>Recently Uploaded</h6>
                <div className="row">
                {showRecent&&
                        showRecent.map((elems,index)=>{
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

export default RecentlyUploaded;