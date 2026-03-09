import React, { useState } from "react";
import "./DoctorPage.css";

function DoctorAssistant() {

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [water, setWater] = useState(0);
  const [symptom, setSymptom] = useState("");
  const [symptomResult, setSymptomResult] = useState("");
  const [score, setScore] = useState("");
  const [steps, setSteps] = useState(0);
  const [heartRate, setHeartRate] = useState("-");
  const [calories, setCalories] = useState("");

  // BMI
  function calculateBMI(){
    if(!height || !weight) return;
    let h = height/100;
    let result = (weight/(h*h)).toFixed(1);
    let status = "Normal";
    if(result < 18.5) status = "Underweight";
    else if(result > 25) status = "Overweight";
    setBmi(`BMI: ${result} (${status})`);
  }

  // Symptom Checker
  function checkSymptom(){
    if(symptom==="Fever") setSymptomResult("Possible Infection");
    else if(symptom==="Headache") setSymptomResult("Possible Migraine");
    else if(symptom==="Cough") setSymptomResult("Possible Cold");
    else if(symptom==="Fatigue") setSymptomResult("Possible Lack of Sleep");
    else setSymptomResult("");
  }

  // Health Risk Score
  function healthScore(){
    let random = Math.floor(Math.random()*40)+60;
    setScore(`Health Score: ${random}/100`);
  }

  // Step Counter
  function addStep(){
    setSteps(steps+1000);
  }

  // Heart Rate Monitor (simulated)
  function measureHeart(){
    let hr = Math.floor(Math.random()*40)+60;
    setHeartRate(hr + " bpm");
  }

  // Calories Burned Calculator
  function calcCalories(){
    if(!steps) return;
    let cal = (steps * 0.04).toFixed(1);
    setCalories(`${cal} kcal`);
  }

  return (
    <div className="doctor-page">

      <h1 className="title">Doctor Assistant Dashboard</h1>

      <div className="grid">

        {/* BMI */}
        <div className="card">
          <h2>BMI Calculator</h2>
          <input type="number" placeholder="Height (cm)" value={height} onChange={(e)=>setHeight(e.target.value)} />
          <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e)=>setWeight(e.target.value)} />
          <button onClick={calculateBMI}>Calculate</button>
          <p>{bmi}</p>
        </div>

        {/* Symptom Checker */}
        <div className="card">
          <h2>Symptom Checker</h2>
          <select onChange={(e)=>setSymptom(e.target.value)}>
            <option>Select Symptom</option>
            <option>Fever</option>
            <option>Headache</option>
            <option>Cough</option>
            <option>Fatigue</option>
          </select>
          <button onClick={checkSymptom}>Check</button>
          <p>{symptomResult}</p>
        </div>

        {/* Health Score */}
        <div className="card">
          <h2>Health Risk Score</h2>
          <button onClick={healthScore}>Check Health</button>
          <p>{score}</p>
        </div>

        {/* Water Intake */}
        <div className="card">
          <h2>Water Intake</h2>
          <h3>{water} Glasses</h3>
          <button onClick={()=>setWater(water+1)}>Add Glass</button>
        </div>

        {/* Steps */}
        <div className="card">
          <h2>Step Counter</h2>
          <h3>{steps} Steps</h3>
          <button onClick={addStep}>Add 1000 Steps</button>
        </div>

        {/* Heart Rate */}
        <div className="card">
          <h2>Heart Rate Monitor</h2>
          <h3>{heartRate}</h3>
          <button onClick={measureHeart}>Measure</button>
        </div>

        {/* Calories */}
        <div className="card">
          <h2>Calories Burned</h2>
          <h3>{calories}</h3>
          <button onClick={calcCalories}>Calculate</button>
        </div>

      </div>

      {/* Doctors */}
      <h2 className="section-title">Doctor Specializations</h2>
      <div className="doctor-grid">
        <div className="doctor-card">❤️ Cardiologist</div>
        <div className="doctor-card">🧠 Neurologist</div>
        <div className="doctor-card">👶 Pediatrician</div>
        <div className="doctor-card">🦴 Orthopedic</div>
      </div>

      {/* Emergency */}
      <div className="emergency">
        <h3>Emergency Contacts</h3>
        <p>🚑 Ambulance : 108</p>
        <p>📞 Emergency : 112</p>
        <p>👩 Women Helpline : 1091</p>
      </div>

      {/* Tips */}
      <div className="tips">
        <h3>Daily Health Tips</h3>
        <ul>
          <li>Drink 2-3 liters water daily</li>
          <li>Sleep at least 7-8 hours</li>
          <li>Exercise regularly</li>
          <li>Eat fruits and vegetables</li>
        </ul>
      </div>

    </div>
  )
}

export default DoctorAssistant;