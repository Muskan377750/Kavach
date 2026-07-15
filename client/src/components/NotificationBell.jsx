import {useState} from "react";

import useNotifications from "../hooks/useNotifications";

import NotificationDropdown from "./NotificationDropdown";

function NotificationBell(){

const [open,setOpen]=useState(false);

const {notifications}=useNotifications();

return(

<div className="notification-wrapper">

<button

className="notification-btn"

onClick={()=>setOpen(!open)}

>

🔔

{

notifications.length>0&&(

<span className="notification-count">

{notifications.length}

</span>

)

}

</button>

{

open&&(

<NotificationDropdown

notifications={notifications}

/>

)

}

</div>

);

}

export default NotificationBell;