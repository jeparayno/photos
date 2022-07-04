import axios from "axios";
import { useEffect,useState } from "react"

const RecentlyUploaded=()=> {

    const [showRecent,setShowRecent] = useState([]);

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
    )
}

export default RecentlyUploaded;