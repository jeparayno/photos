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
            <h6>Recently Uploaded</h6>
                <div class="row">
                {showRecent&&
                        showRecent.map((elems,index)=>{
                            return(
                                <div key={index} class="col">
                                    <img src={`http://localhost:8000/${elems.filePath}`} alt={elems.fileName} class="img-thumbnail" style={{cursor:'pointer'}}></img>
                                </div>
                            )
                        })
                }
                </div>
        </div>
    )
}

export default RecentlyUploaded;