import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope
} from "react-icons/fa";

import {
  MdSecurity
} from "react-icons/md";

import { motion } from "framer-motion";

import { loginUser } from "../services/authService";

import "../styles/login.css";


function Login() {


const navigate = useNavigate();


const [showPassword,setShowPassword] = useState(false);

const [loading,setLoading] = useState(false);


const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [error,setError] = useState("");





const handleLogin = async(e)=>{


e.preventDefault();


setLoading(true);

setError("");



try{


const data = await loginUser(
email,
password
);



localStorage.setItem(
"token",
data.token
);


localStorage.setItem(
"user",
JSON.stringify(data.user)
);



navigate("/dashboard");



}

catch(err){


setError(

err.response?.data?.message ||

"Unable to login. Please try again."

);


}

finally{


setLoading(false);


}



};





return(


<div className="login-page">



{/* LEFT PANEL */}



<motion.div

className="left-panel"

initial={{
x:-80,
opacity:0
}}

animate={{
x:0,
opacity:1
}}

transition={{
duration:.8
}}

>


<div className="logo">

<MdSecurity/>

</div>



<h1>

KAVACH

</h1>



<h3>

Security Operations Center

</h3>



<p>

Intelligent privileged access monitoring platform
for detecting insider threats, suspicious behaviour
and security risks in banking infrastructure.

</p>




<div className="features">


<div>
✔ Real-Time Threat Detection
</div>


<div>
✔ Privileged Access Monitoring
</div>


<div>
✔ Role Based Access Control
</div>


<div>
✔ Audit Log Intelligence
</div>


<div>
✔ JWT Secure Authentication
</div>


<div>
✔ Live Security Dashboard
</div>



</div>



</motion.div>





{/* RIGHT PANEL */}



<motion.div

className="right-panel"

initial={{
x:80,
opacity:0
}}

animate={{
x:0,
opacity:1
}}

transition={{
duration:.8
}}

>



<form

className="login-card"

onSubmit={handleLogin}

>



<h2>

Welcome Back 👋

</h2>


<p>

Login to access KAVACH Security Command Center

</p>





<div className="input-box">


<FaEnvelope/>


<input

type="email"

placeholder="Email Address"

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

required

/>


</div>






<div className="input-box">


<FaLock/>


<input

type={
showPassword
?
"text"
:
"password"
}

placeholder="Password"

value={password}

onChange={(e)=>
setPassword(e.target.value)
}

required

/>



<span

className="eye"

onClick={()=>
setShowPassword(!showPassword)
}

>


{
showPassword
?
<FaEyeSlash/>
:
<FaEye/>
}


</span>



</div>







<div className="options">


<label>


<input

type="checkbox"

/>


Remember Me


</label>




<span>

Forgot Password?

</span>



</div>






{
error &&

<p className="login-error">

{error}

</p>

}





<button

type="submit"

disabled={loading}

>


{

loading

?

"Authenticating..."

:

"Secure Login"

}



</button>








<div className="login-security-status">


<div>
🟢 Firewall Active
</div>


<div>
🟢 Threat Engine Running
</div>


<div>
🟢 Database Connected
</div>



</div>





</form>



</motion.div>




</div>


);


}


export default Login;