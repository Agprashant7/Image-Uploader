import react from 'react'
import './progressBar.css';

const ProgressBar=({progressValue=10})=>{
    return(
        <div className='container'>
        <div className='outerBar' >
            <div className='innerBar'style={{width:progressValue+'%'}}>

            </div>
            </div>
        </div>
    )
}

export default ProgressBar