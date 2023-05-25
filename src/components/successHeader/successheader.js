import { FaCheckCircle } from "react-icons/fa";
const SuccessHeader=()=>{

    return(
        <div>
            <div style={{marginTop:'20px'}}>
            <FaCheckCircle size={30} color="green"/>
            </div>
           
            <div>
                <h4>File Uploaded Sucessfully</h4>
            </div>
        </div>
    )

}

export default SuccessHeader