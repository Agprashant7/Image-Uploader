import React, { useState } from 'react';
import './uploadCard.css';
import Image from '../image.svg';
import axios from 'axios'
import ProgressBar from '../progressBar/progressBar';
import SuccessHeader from '../successHeader/successheader';
import { ClipboardCopy } from '../clipboardCopy/clipboardCopy';

const UploadCard=()=>{
    const [selectedImage,setSelected]=useState(Image)
    const [progress,SetProgress]=useState(false)
    const [error,setError]=useState()
    const [success,setSuccess]=useState(false)
    const [progressValue,SetProgressValue]=useState()
  async function onSelectFile(evt){
        // console.log("selected item",evt.target.files[0])
        SetProgress(true)
        let file=evt.target.files[0];
       
        let formData = new FormData();
        formData.append('file', file);

        await axios.post("https://imageserver-kzgz.onrender.com/upload-single-file", formData,{
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                
                SetProgressValue(percentCompleted-10)
                console.log(`upload process: ${percentCompleted}%`);
              }
        })
            .then(res => {

                console.log("After post",res.data)
                setSelected(res.data)
                SetProgress(false)
                setSuccess(true)
            })
            .catch((err)=>{
            console.log("error",err)
            setError('Something went wrong.... please try again')
            SetProgress(false)
            })

       
    }
const Header=()=>{
    return(
        <>
            <h5 style={{color:error?'red':'black'}}>{error?error:"Upload your image"}</h5>
            <p>File should be in jpeg or png format</p>
        </>
    )
}

return(
    <>
    {!progress?
        <div className='main'>
            {success?<SuccessHeader/>:<Header/>}
            <div className={selectedImage===Image?'imageCard':''} draggable='true' onDrag={()=>{console.log('logging')}}>
            <img  src={selectedImage} alt='nature' className={selectedImage===Image?'image':'expandImage'}/>
            </div>
            
            <div>
           
            {success?
            <ClipboardCopy copyText={selectedImage}/>:
            <>
            <p>Or</p>
            <input  type='file' label='Choose File' onInput={(e)=>{onSelectFile(e)}}  />
            </>
                
            }
          
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
