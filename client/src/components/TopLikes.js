import axios from "axios";
import { useEffect,useState } from "react"

const TopLikes=()=> {

    const [showTop,setShowTop] = useState([]);

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
                <div class="row">
                    {showTop&&
                            showTop.map((elems,index)=>{
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

export default TopLikes;