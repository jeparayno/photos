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
            <h1>Top Likes</h1>
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
    )
}

export default TopLikes;