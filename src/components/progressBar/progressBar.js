
import './progressBar.css';

const ProgressBar=({progressValue=5})=>{
    return(
        <div className='container'>
            <div>
            <h4>Uploading....</h4>
            </div>
          
        <div className='outerBar' >
            <div className='innerBar'style={{width:progressValue+'%'}}>

            </div>
            </div>
        </div>
    )
}

export default ProgressBar