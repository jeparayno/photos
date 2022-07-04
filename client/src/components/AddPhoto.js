import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AddPhoto=(props)=> {

  const {photoCollection,setPhotoCollection} = props;

  const navigate = useNavigate();

  const [uploadedFile,setUploadedFile] = useState("");

  const submitHandler =(e)=>{
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', uploadedFile);
      axios.post(("http://localhost:8000/api/photos/singleFile"),formData)
      .then((res)=>{
          setPhotoCollection([...photoCollection, res.data]);
          navigate('/dashboard');
      })
      .catch((err)=>{
          console.log("Error in Form: "+err);
      })
  }

  return (
    <div>
        <label>Upload photo</label>
        <input type="file" onChange={(e)=>setUploadedFile(e.target.files[0])}/>
        <br/>
        <button onClick={(e)=>submitHandler(e)}>Upload</button>
    </div>
  )
}

export default AddPhoto;