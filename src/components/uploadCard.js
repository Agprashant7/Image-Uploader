import React, { useState } from 'react';
import './uploadCard.css';
import Image from './image.svg';
import axios from 'axios'
import ProgressBar from './progressBar';


const UploadCard=()=>{
    const [selectedImage,setSelected]=useState(Image)
    const [progress,SetProgress]=useState(false)
    const [progressValue,SetProgressValue]=useState()
  async function onSelectFile(evt){
        // console.log("selected item",evt.target.files[0])
        SetProgress(true)
        let file=evt.target.files[0];
       
        let formData = new FormData();
        formData.append('file', file);

        await axios.post("https://image-server.netlify.app/.netlify/functions/index/upload-single-file", formData,{
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                SetProgressValue(percentCompleted)
                console.log(`upload process: ${percentCompleted}%`);
              }
        })
            .then(res => {

                console.log("After post",res.data)
                setSelected(res.data)
                SetProgress(false)
            //     axios.get(encodeURI(`http://localhost:3001/fetch-file?filename=${res.data}`))
            //         .then((res=>{
            //             setSelected(res.data)
            //             SetProgress(false)
            // })).catch((err)=>{
            //     console.log("ERROR in Get",err)
            // })
              //   console.log(res.data.url)
            })
            .catch((err)=>{
            console.log("error",err)
            })

       
    }

return(
    <>
    {
        !progress?
    
        <div className='main'>
            <h5>Upload your image</h5>
            <p>File should be in jpeg or png format</p>
            <div className='imageCard' draggable='true' onDrag={()=>{console.log('logging')}}>
            <img  src={selectedImage} alt='nature' className={selectedImage===Image?'image':'expandImage'}/>
            </div>
            <p>Or    </p>
            <div>
                <form>
            <input  type='file' label='Choose File' onInput={(e)=>{onSelectFile(e)}}  />
            </form>
            </div>
        </div>
        : 
        <div className='progressContainer'>
        <ProgressBar progressValue={progressValue} />
        </div>
       }
        </>
    )
}

export default UploadCard