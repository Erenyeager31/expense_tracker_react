import React from 'react'
import '../Alert.css'

export default function Alerts(props) {

    const alertstate = localStorage.getItem("alertstate")
    return (
        // <div className="alert_wrap">
        //     {alertstate && <div id='alert' className="alert alert-success alert-dismissible fade show" role="alert">
        //         {props.message}
        //         <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        //     </div>} 
        // </div>
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {localStorage.getItem("message")}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
