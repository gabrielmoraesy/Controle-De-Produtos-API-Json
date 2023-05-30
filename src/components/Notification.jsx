import React, { useState } from 'react'
import './Notification.css' 
import { FaBell } from "react-icons/fa";

const Notification = ({ notification }) => {   
    return ( 
        <div className='notification' style={{ display: notification.display }}>
            <div className={notification.title === 'Notificação' ? 'title-notification yellow' : 'title-notification red'}>
                <h1>{notification.title} <i className='icons-notification'><FaBell /></i></h1>
            </div>
            <div className='text-notification'>
                <h1>{notification.text}</h1>
            </div>
        </div>
    ); 
}

export default Notification
 