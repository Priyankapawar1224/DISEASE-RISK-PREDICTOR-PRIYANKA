import React, { useState } from "react";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {

const [page,setPage] = useState("landing")
const [user,setUser] = useState(null)
const [admin,setAdmin] = useState(false)

/* ================= USER LOGIN ================= */

const handleLogin = (userData) => {

setUser(userData)
setPage("dashboard")

}

const handleLogout = () => {

setUser(null)
setPage("landing")

}

/* ================= ADMIN LOGIN ================= */

const handleAdminLogin = (username,password) => {

if(username.trim() === "" || password.trim() === ""){

alert("Please enter username and password")
return

}

setAdmin(true)
setPage("adminDashboard")

}

/* ================= ADMIN LOGOUT ================= */

const handleAdminLogout = () => {

setAdmin(false)
setPage("adminLogin")

}

/* ================= BACK TO LANDING ================= */

const switchToLanding = () => {

setPage("landing")

}

return(

<>

{/* LANDING PAGE */}

{page === "landing" && (

<Landing
goToLogin={() => setPage("login")}
goToRegister={() => setPage("register")}
goToAdmin={() => setPage("adminLogin")}
/>

)}

{/* USER LOGIN */}

{page === "login" && (

<Login
onLogin={handleLogin}
switchToRegister={() => setPage("register")}
/>

)}

{/* REGISTER */}

{page === "register" && (

<Register switchToLogin={() => setPage("login")} />

)}

{/* USER DASHBOARD */}

{page === "dashboard" && user && (

<Dashboard
user={user}
onLogout={handleLogout}
/>

)}

{/* ADMIN LOGIN */}

{page === "adminLogin" && (

<AdminLogin
onAdminLogin={handleAdminLogin}
switchToLanding={switchToLanding}
/>

)}

{/* ADMIN DASHBOARD */}

{page === "adminDashboard" && admin && (

<AdminDashboard
adminUser="Admin"
switchToAdminLogin={handleAdminLogout}
/>

)}

</>

)

}

export default App;