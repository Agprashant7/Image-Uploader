
import './progressBar.css';

const ProgressBar=({progressValue=5})=>{
    return(
        <div className='container'>
            <div>
            <h4>Uploading....</h4>
            <p>For time being we are using free hoisting service,this might take some time</p>
            </div>
          
        <div className='outerBar' >
            <div className='innerBar'style={{width:progressValue+'%'}}>

            </div>
            </div>
        </div>
    )
}

export default ProgressBar