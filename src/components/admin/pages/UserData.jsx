import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import "./UserData.css";

export default function UsersData() {

const [users,setUsers] = useState([])
const [search,setSearch] = useState("")
const [editingUser,setEditingUser] = useState(null)
const [editUser,setEditUser] = useState({})

const [symptoms,setSymptoms] = useState([])
const [newSymptom,setNewSymptom] = useState("")

const [diseases,setDiseases] = useState([])
const [newDisease,setNewDisease] = useState("")
const [filterDisease,setFilterDisease] = useState("")


useEffect(()=>{
loadUsers()

const sym = JSON.parse(localStorage.getItem("symptoms")) || []
setSymptoms(sym)

const dis = JSON.parse(localStorage.getItem("diseases")) || []
setDiseases(dis)

},[])


const loadUsers = ()=>{
const data = JSON.parse(localStorage.getItem("users")) || []
setUsers(data)
}


/* ---------------- DELETE USER ---------------- */

const deleteUser = (index)=>{

const updated = users.filter((u,i)=> i!==index)

setUsers(updated)

localStorage.setItem("users",JSON.stringify(updated))

}


/* ---------------- EDIT USER ---------------- */

const startEditUser = (index)=>{
setEditingUser(index)
setEditUser(users[index])
}

const saveUser = ()=>{

const updated=[...users]

updated[editingUser]=editUser

setUsers(updated)

localStorage.setItem("users",JSON.stringify(updated))

setEditingUser(null)

}

const cancelEditUser = ()=> setEditingUser(null)



/* ---------------- SEARCH FILTER ---------------- */

const filteredUsers = users
.filter(u =>
u.name?.toLowerCase().includes(search.toLowerCase()) ||
u.email?.toLowerCase().includes(search.toLowerCase())
)
.filter(u => filterDisease ? u.disease === filterDisease : true)



/* ---------------- RISK LEVEL ---------------- */

const getRiskLevel = (risk)=>{

if(risk>70) return "High Risk"

if(risk>30) return "Medium Risk"

return "Low Risk"

}


/* ---------------- PDF REPORT ---------------- */

const downloadReport = (user)=>{

const doc = new jsPDF()

doc.setFontSize(18)
doc.text("AI Health Report",20,20)

doc.setFontSize(12)

doc.text(`Name: ${user.name}`,20,40)
doc.text(`Email: ${user.email}`,20,50)
doc.text(`Mobile: ${user.mobile}`,20,60)
doc.text(`Age: ${user.age}`,20,70)
doc.text(`Gender: ${user.gender}`,20,80)
doc.text(`Disease: ${user.disease}`,20,90)
doc.text(`Risk: ${user.risk}%`,20,100)
doc.text(`Date: ${user.date}`,20,110)

doc.save(`${user.name}_report.pdf`)

}


const downloadAllReports = ()=>{
users.forEach(u => downloadReport(u))
}


/* ---------------- EXPORT EXCEL ---------------- */

const exportExcel = ()=>{

const ws = XLSX.utils.json_to_sheet(users)

const wb = XLSX.utils.book_new()

XLSX.utils.book_append_sheet(wb,ws,"Users")

XLSX.writeFile(wb,"health_users.xlsx")

}


/* ---------------- SYMPTOMS ---------------- */

const addSymptom = ()=>{

if(!newSymptom) return

const updated=[...symptoms,newSymptom]

setSymptoms(updated)

localStorage.setItem("symptoms",JSON.stringify(updated))

setNewSymptom("")

}

const deleteSymptom = (index)=>{

const updated = symptoms.filter((s,i)=> i!==index)

setSymptoms(updated)

localStorage.setItem("symptoms",JSON.stringify(updated))

}



/* ---------------- DISEASES ---------------- */

const addDisease = ()=>{

if(!newDisease) return

const obj={
disease:newDisease,
doctor:"General Physician",
diet:"Healthy diet",
solution:"Consult doctor"
}

const updated=[...diseases,obj]

setDiseases(updated)

localStorage.setItem("diseases",JSON.stringify(updated))

setNewDisease("")

}


const deleteDisease = (index)=>{

const updated = diseases.filter((d,i)=>i!==index)

setDiseases(updated)

localStorage.setItem("diseases",JSON.stringify(updated))

}


/* ---------------- STATUS ---------------- */

const updateStatus=(index,status)=>{

const updated=[...users]

updated[index].status=status

setUsers(updated)

localStorage.setItem("users",JSON.stringify(updated))

}


/* ---------------- ANALYTICS ---------------- */

const mostCommonDisease=()=>{

if(!users.length) return "-"

const freq={}

users.forEach(u=>{
freq[u.disease]=(freq[u.disease]||0)+1
})

return Object.keys(freq).reduce((a,b)=> freq[a]>freq[b]?a:b)

}


const topSymptoms = ()=>{

const all = users.flatMap(u=>u.symptoms || [])

const freq={}

all.forEach(s=> freq[s]=(freq[s]||0)+1)

return Object.keys(freq).sort((a,b)=>freq[b]-freq[a]).slice(0,5)

}


const topDiseases = ()=>{

const freq={}

users.forEach(u=> freq[u.disease]=(freq[u.disease]||0)+1)

return Object.keys(freq).sort((a,b)=>freq[b]-freq[a]).slice(0,5)

}


const criticalUsers = users.filter(u=> u.risk>90)



const aiSuggestion = ()=>{

const high = users.filter(u=>u.risk>70).length

if(high>5) return "⚠ Many users have high risk. Health awareness recommended."

if(mostCommonDisease()==="Diabetes") return "🍬 Diabetes trend increasing."

return "✅ Health trends stable."

}



/* ---------------- AGE GROUP ---------------- */

const young = users.filter(u=>u.age<=25).length

const adult = users.filter(u=>u.age>25 && u.age<=50).length

const senior = users.filter(u=>u.age>50).length



return(

<div className="users-page">

{/* ---------- ANALYTICS ---------- */}

<div className="analytics-cards">

<div className="card">Total Users {users.length}</div>

<div className="card">
High Risk {users.filter(u=>u.risk>70).length}
</div>

<div className="card">
Male {users.filter(u=>u.gender==="Male").length} /
Female {users.filter(u=>u.gender==="Female").length}
</div>

<div className="card">
Common Disease {mostCommonDisease()}
</div>

<div className="card">
Young {young} | Adult {adult} | Senior {senior}
</div>

</div>



{/* ---------- AI PANEL ---------- */}

<div className="ai-panel">

<h3>🤖 AI Health Insight</h3>

<p>{aiSuggestion()}</p>

</div>



{/* ---------- CRITICAL USERS ---------- */}

<div className="critical-panel">

<h3>🚨 Critical Patients</h3>

{criticalUsers.length===0 ?

<p>No critical patients</p>

:

<ul>

{criticalUsers.map((u,i)=>(
<li key={i}>{u.name} ({u.disease}) {u.risk}%</li>
))}

</ul>

}

</div>



{/* ---------- SEARCH BAR ---------- */}

<div className="top-bar">

<input
placeholder="Search user"
value={search}
onChange={e=>setSearch(e.target.value)}
/>

<select
value={filterDisease}
onChange={e=>setFilterDisease(e.target.value)}
>

<option value="">All Diseases</option>

{diseases.map((d,i)=>(
<option key={i}>{d.disease}</option>
))}

</select>

<button onClick={loadUsers}>Refresh</button>

<button onClick={downloadAllReports}>PDF</button>

<button onClick={exportExcel}>Excel</button>

</div>



{/* ---------- TABLE ---------- */}

<div className="table-container">

<table>

<thead>

<tr>

<th>Name</th>
<th>Email</th>
<th>Age</th>
<th>Gender</th>
<th>Disease</th>
<th>Risk</th>
<th>Risk Level</th>
<th>Date</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>


<tbody>

{filteredUsers.map((user,index)=>(

<tr key={index}>

<td>{user.name}</td>

<td>{user.email}</td>

<td>{user.age}</td>

<td>{user.gender}</td>

<td>{user.disease}</td>

<td>{user.risk}%</td>

<td>

<span className={`risk-badge ${getRiskLevel(user.risk).replace(" ","-")}`}>
{getRiskLevel(user.risk)}
</span>

</td>

<td>{user.date}</td>

<td>

<select
value={user.status || "Normal"}
onChange={(e)=>updateStatus(index,e.target.value)}
>

<option>Normal</option>
<option>Follow-up</option>
<option>Critical</option>
<option>Recovered</option>

</select>

</td>

<td>

<button onClick={()=>startEditUser(index)}>
Edit
</button>

<button onClick={()=>deleteUser(index)}>
Delete
</button>

<button onClick={()=>downloadReport(user)}>
Report
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>



{/* ---------- ADMIN PANELS ---------- */}

<div className="admin-panels">

<div className="panel">

<h3>Manage Symptoms</h3>

<input
value={newSymptom}
onChange={e=>setNewSymptom(e.target.value)}
/>

<button onClick={addSymptom}>Add</button>

<ul>

{symptoms.map((s,i)=>(
<li key={i}>
{s}
<button onClick={()=>deleteSymptom(i)}>Delete</button>
</li>
))}

</ul>

</div>


<div className="panel">

<h3>Manage Diseases</h3>

<input
value={newDisease}
onChange={e=>setNewDisease(e.target.value)}
/>

<button onClick={addDisease}>Add</button>

<ul>

{diseases.map((d,i)=>(
<li key={i}>
{d.disease}
<button onClick={()=>deleteDisease(i)}>Delete</button>
</li>
))}

</ul>

</div>

</div>



{/* ---------- EXTRA STATS ---------- */}

<div className="extra-stats">

<h3>Most Common Symptoms</h3>

<ul>
{topSymptoms().map((s,i)=>(
<li key={i}>{s}</li>
))}
</ul>


<h3>Top Diseases</h3>

<ul>
{topDiseases().map((d,i)=>(
<li key={i}>{d}</li>
))}
</ul>

</div>


</div>

)

}