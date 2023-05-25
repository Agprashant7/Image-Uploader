
import './progressBar.css';

const ProgressBar=({progressValue=5})=>{
    return(
        <div className='container'>
            <h2>Uploading....</h2>
        <div className='outerBar' >
            <div className='innerBar'style={{width:progressValue+'%'}}>

            </div>
            </div>
        </div>
    )
}

export default ProgressBar