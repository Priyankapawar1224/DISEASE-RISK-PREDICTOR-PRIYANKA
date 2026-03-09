import React, { useState } from "react";
import "./AdminLogin.css";

export default function AdminLogin({ onAdminLogin, switchToLanding }) {

const [username,setUsername] = useState("")
const [password,setPassword] = useState("")
const [showPassword,setShowPassword] = useState(false)
const [error,setError] = useState("")

const handleLogin = () => {

if(username.trim()===""){
setError("Username is required")
return
}

const passwordPattern =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

if(!passwordPattern.test(password)){
setError("Password must contain at least 8 characters, one uppercase, one lowercase and one number")
return
}

setError("")
onAdminLogin(username,password)

}

return(

<div className="admin-container">

<div className="admin-box">

<h2>Admin Login</h2>
<p>Enter your credentials to access the dashboard</p>

<input
type="text"
placeholder="Admin Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<div className="password-box">

<input
type={showPassword ? "text" : "password"}
placeholder="Admin Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<span
className="show-pass"
onClick={()=>setShowPassword(!showPassword)}
>
{showPassword ? "Hide" : "Show"}
</span>

</div>

{error && <p className="error">{error}</p>}

<div className="buttons">

<button className="login-btn" onClick={handleLogin}>
Login
</button>

<button
className="back-btn"
onClick={()=>switchToLanding()}
>
Back
</button>

</div>

</div>

</div>

)

}