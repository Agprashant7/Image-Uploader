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
    const drop = React.useRef(null);
    React.useEffect(() => {
        drop.current.addEventListener('dragover', handleDragOver);
        drop.current.addEventListener('drop', handleDrop);
      
        return () => {
          drop.current.removeEventListener('dragover', handleDragOver);
          drop.current.removeEventListener('drop', handleDrop);
        };
      }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const handleDrop = (e) => {
     
        e.preventDefault();
        e.stopPropagation();
        const {files} = e.dataTransfer;
        if((files[0].type!=='image/png'&& files[0].type!=='image/jpg' && !files[0].type!=='image/jpeg')){
        alert('Jpeg and Png format only supported')
        return
        }
        if (files && files.length) {
            onSelectFile('',files);
        }
          
    };
  async function onSelectFile(event,fileName){
        let file=fileName && fileName[0] !== undefined ? fileName[0]:event.target.files[0];
        SetProgress(true)
        console.log('file',file)
        let formData = new FormData();
        formData.append("file", file);
        let url=`${process.env.REACT_APP_BACKEND_URL}/upload-single-file`
        console.log(process.env.REACT_APP_BACKEND_URL)
        await axios
          .post(
            url,
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
    
                SetProgressValue(percentCompleted - 10);
                console.log(`upload process: ${percentCompleted}%`);
              },
            }
          )
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
            <div className={selectedImage===Image?'imageCard':''}
              ref={drop}
             draggable='true' onDrag={()=>{console.log('logging')}}>
            <img  src={selectedImage} alt='nature' className={selectedImage===Image?'image':'expandImage'}/>
            </div>
            
            <div>
           
            {success?
            <ClipboardCopy copyText={selectedImage}/>:
            <>
            <p>Or</p>
            <input  type='file' label='Choose File' onInput={(e)=>{onSelectFile(e)}}   />
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
