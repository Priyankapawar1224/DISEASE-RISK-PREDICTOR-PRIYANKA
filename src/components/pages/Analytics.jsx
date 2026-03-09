import React, { useState } from "react";   
import { jsPDF } from "jspdf";
import CountUp from "react-countup";
import "./Analytics.css";

import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
Tooltip,
PieChart,
Pie,
Cell
} from "recharts";

import {
FaUser,
FaHeart,
FaStethoscope,
FaDownload,
FaBell,
FaHistory,
FaMoon,
FaSun
} from "react-icons/fa";

export default function AIDiseaseDashboard(){

// ================= USER STATES =================

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [mobile,setMobile]=useState("");
const [age,setAge]=useState("");
const [gender,setGender]=useState("");

const [symptoms,setSymptoms]=useState([]);
const [risk,setRisk]=useState(null);
const [result,setResult]=useState(null);

const [darkMode,setDarkMode]=useState(false);
const [notification,setNotification]=useState("");

const [history,setHistory]=useState([]);

// ================= SYMPTOMS =================

const symptomList=[
"Fever","Fatigue","Cough","Chest Pain","Headache",
"Breathing Issue","Weight Loss","Nausea","Body Pain",
"Dizziness","High BP","Palpitations"
];

// ================= DISEASE DATABASE =================

const diseaseDatabase=[

{
disease:"Flu",
symptoms:["Fever","Cough","Fatigue","Body Pain"],
doctor:"General Physician",
diet:"Warm fluids, fruits, soups",
solution:"Rest and hydration"
},

{
disease:"Heart Disease Risk",
symptoms:["Chest Pain","Palpitations","High BP","Dizziness"],
doctor:"Cardiologist",
diet:"Low salt diet",
solution:"Immediate cardiology consultation"
},

{
disease:"Diabetes Risk",
symptoms:["Weight Loss","Fatigue","High BP"],
doctor:"Endocrinologist",
diet:"Low sugar diet",
solution:"Blood sugar test recommended"
},

{
disease:"Asthma",
symptoms:["Breathing Issue","Cough"],
doctor:"Pulmonologist",
diet:"Avoid dust and allergens",
solution:"Use inhaler regularly"
}

];

// ================= TOGGLE SYMPTOMS =================

const toggleSymptom=(symptom)=>{

setSymptoms(prev=>
prev.includes(symptom)
?prev.filter(s=>s!==symptom)
:[...prev,symptom]
)

}

// ================= PREDICT RISK =================

const predictRisk=()=>{

if(!name || !email || !mobile || !age || !gender || symptoms.length===0){

setNotification("⚠ Please fill all details")

setTimeout(()=>setNotification(""),3000)

return

}

let bestMatch=null
let highestScore=0

diseaseDatabase.forEach(d=>{

const match=symptoms.filter(s=>d.symptoms.includes(s)).length

let score=(match/d.symptoms.length)*100

if(age>50 && d.disease==="Heart Disease Risk")
score+=15

if(score>highestScore){

highestScore=score
bestMatch=d

}

})

if(bestMatch){

const finalRisk=Math.floor(highestScore)

setRisk(finalRisk)
setResult(bestMatch)

setNotification("✅ Prediction Completed")

setTimeout(()=>setNotification(""),3000)

// SAVE USER

const record={
name,email,mobile,age,gender,
disease:bestMatch.disease,
risk:finalRisk,
date:new Date().toLocaleString()
}

const old=JSON.parse(localStorage.getItem("users")) || []

localStorage.setItem("users",JSON.stringify([record,...old]))

// HISTORY

setHistory([
{disease:bestMatch.disease,risk:finalRisk,date:record.date},
...history
])

}

}

// ================= PDF =================

const downloadPDF=()=>{

if(!result) return

const doc=new jsPDF()

doc.text("AI Health Report",20,20)
doc.text(`Name: ${name}`,20,30)
doc.text(`Email: ${email}`,20,40)
doc.text(`Age: ${age}`,20,50)
doc.text(`Risk: ${risk}%`,20,60)
doc.text(`Disease: ${result.disease}`,20,70)
doc.text(`Doctor: ${result.doctor}`,20,80)
doc.text(`Diet: ${result.diet}`,20,90)
doc.text(`Solution: ${result.solution}`,20,100)

doc.save("AI_Report.pdf")

}

// ================= GRAPH DATA =================

const diseaseStats=[
{name:"Flu",value:40},
{name:"Heart",value:25},
{name:"Diabetes",value:20},
{name:"Asthma",value:15}
]

const COLORS=["#4CAF50","#ff4d4d","#f4b400","#4285f4"]

// ================= STYLES =================

const pageStyle={
minHeight:"100vh",
padding:"30px",
background:darkMode?"#0f172a":"#f1f5f9"
}

const gridStyle={
display:"grid",
gridTemplateColumns:"350px 1fr",
gap:"20px"
}

const card={
background:darkMode?"#1e293b":"white",
padding:"20px",
borderRadius:"15px",
boxShadow:"0 4px 15px rgba(0,0,0,0.1)"
}

// ================= UI =================

return(

<div style={pageStyle}>

{/* HEADER */}

<div style={{display:"flex",justifyContent:"space-between"}}>

<h2>🏥 AI Health Analytics Dashboard</h2>

<button onClick={()=>setDarkMode(!darkMode)}>
{darkMode?<FaSun/>:<FaMoon/>}
</button>

</div>

{/* NOTIFICATION */}

{notification && (
<div className="notify">
<FaBell/> {notification}
</div>
)}

<div style={gridStyle}>

{/* USER FORM */}

<div style={card}>

<h3><FaUser/> Patient Form</h3>

<input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
<input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
<input placeholder="Mobile" value={mobile} onChange={e=>setMobile(e.target.value)}/>
<input placeholder="Age" value={age} onChange={e=>setAge(e.target.value)}/>

<select value={gender} onChange={e=>setGender(e.target.value)}>
<option value="">Gender</option>
<option>Male</option>
<option>Female</option>
</select>

<h4>Symptoms</h4>

<div className="symptoms">

{symptomList.map(sym=>(
<button
key={sym}
className={symptoms.includes(sym)?"active":""}
onClick={()=>toggleSymptom(sym)}
>
{sym}
</button>
))}

</div>

<button className="analyze" onClick={predictRisk}>
<FaStethoscope/> Analyze Risk
</button>

</div>

{/* RESULT PANEL */}

<div>

<div style={card}>

<h3><FaHeart/> Prediction Result</h3>

{!result?

<p>No prediction yet</p>

:

<>

<h1 style={{textAlign:"center"}}>
<CountUp end={risk}/> %
</h1>

<p><b>Disease:</b> {result.disease}</p>
<p><b>Doctor:</b> {result.doctor}</p>
<p><b>Diet:</b> {result.diet}</p>
<p><b>Solution:</b> {result.solution}</p>

<button onClick={downloadPDF}>
<FaDownload/> Download Report
</button>

</>

}

</div>

{/* CHARTS */}

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginTop:"20px"}}>

<div style={card}>

<h3>Disease Analytics</h3>

<ResponsiveContainer width="100%" height={250}>

<BarChart data={diseaseStats}>
<XAxis dataKey="name"/>
<Tooltip/>
<Bar dataKey="value"/>
</BarChart>

</ResponsiveContainer>

</div>

<div style={card}>

<h3>Symptoms Distribution</h3>

<ResponsiveContainer width="100%" height={250}>

<PieChart>

<Pie
data={diseaseStats}
dataKey="value"
outerRadius={90}
>

{diseaseStats.map((entry,index)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]}/>
))}

</Pie>

</PieChart>

</ResponsiveContainer>

</div>

</div>

{/* HISTORY */}

<div style={{...card,marginTop:"20px"}}>

<h3><FaHistory/> Prediction History</h3>

{history.map((h,i)=>(
<div key={i}>
{h.date} - {h.disease} ({h.risk}%)
</div>
))}

</div>

</div>

</div>

</div>

)

} 