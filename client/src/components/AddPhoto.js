import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AddPhoto=(props)=> {

  const {photoCollection,setPhotoCollection} = props;

  const navigate = useNavigate();

  const [uploadedFile,setUploadedFile] = useState("");
  const [description,setDescription] = useState("");

  const submitHandler =(e)=>{
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', uploadedFile); // key-value pair
      formData.append('description', description); // key-value pair
      formData.append('likes', 0); // key-value pair
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
      <h1>Create memories here</h1>
      <form className='form--submits' onSubmit={(e)=>submitHandler(e)}>
          <div className='mb-3'>
            <label className='form-label'>Photo</label>
            <input type="file" className="form-control" onChange={(e)=>setUploadedFile(e.target.files[0])}/>
          </div>
          <div className='mb-3'>
            <label className='form-label'>Description</label>
            <input type="text" className="form-control"  placeholder='Describe Your Memory' onChange={(e)=>setDescription(e.target.value)}/>
          </div> 
          <button className='btn btn-success'>Upload</button>
      </form>
    </div>
  )
}

export default AddPhoto;