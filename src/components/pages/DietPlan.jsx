import React, { useState } from "react";
import "./DietPlan.css";

export default function DietPlan() {
  const dietDatabase = {
    Diabetes: {
      color: "#4caf50",
      desc: "Manage blood sugar levels with low Glycemic Index (GI) foods.",
      calories: 1800,
      macros: { protein: "60g", carbs: "200g", fats: "50g" },
      meals: {
        breakfast: "Oats with chia seeds, boiled egg whites, and a small apple",
        lunch: "Brown rice, dal (moong dal), mixed green vegetables",
        dinner: "Grilled chicken/fish (steamed), quinoa salad, clear soup",
        snacks: "Handful of almonds, green tea, or roasted chana"
      },
      avoid: ["Sugar, honey, jaggery", "White bread, maida", "Soft drinks, fruit juices", "Fried foods", "Banana, mango (ripe)"],
      tips: [
        "Drink 2-3 liters of water daily.",
        "Check blood sugar levels regularly.",
        "Avoid sitting for long periods.",
        "Include 30 mins of brisk walking."
      ]
    },
    Heart: {
      color: "#e91e63",
      desc: "Protect your heart with low sodium and healthy fats (Omega-3).",
      calories: 1900,
      macros: { protein: "70g", carbs: "180g", fats: "45g" },
      meals: {
        breakfast: "Oatmeal with walnuts & blueberries, orange juice (no sugar)",
        lunch: "Grilled salmon/chicken, quinoa, steamed broccoli",
        dinner: "Vegetable soup, whole wheat roti, sautéed veggies",
        snacks: "Green tea, roasted peanuts (unsalted)"
      },
      avoid: ["Salt (excess)", "Saturated fats (butter, ghee)", "Red meat, processed meats", "Fried snacks", "Caffeine"],
      tips: [
        "Limit sodium intake to <1500mg/day.",
        "Eat fatty fish twice a week.",
        "Practice Yoga or meditation for stress relief.",
        "Check blood pressure regularly."
      ]
    },
    Obesity: {
      color: "#ff9800",
      desc: "Calorie deficit diet with high protein to promote fat loss.",
      calories: 1500,
      macros: { protein: "90g", carbs: "120g", fats: "40g" },
      meals: {
        breakfast: "2 Egg whites omelette with spinach, 1 toast",
        lunch: "Grilled chicken breast, large salad with olive oil dressing",
        dinner: "Cottage cheese (paneer) salad or clear vegetable soup",
        snacks: "Apple, or Greek yogurt"
      },
      avoid: ["Sugary drinks", "Refined carbs", "Junk food", "Alcohol", "Ice cream"],
      tips: [
        "Drink warm water with lemon in the morning.",
        "Intermittent fasting (16:8) can help.",
        "High intensity interval training (HIIT) recommended.",
        "Sleep at least 7-8 hours."
      ]
    },
    Hypertension: {
      color: "#673ab7",
      desc: "DASH Diet focus: Rich in Potassium, Magnesium, Calcium.",
      calories: 1850,
      macros: { protein: "60g", carbs: "210g", fats: "45g" },
      meals: {
        breakfast: "Low-fat milk, banana, oatmeal",
        lunch: "Daliya (broken wheat), dal, cucumber raita",
        dinner: "Grilled fish, mashed potato (no salt), steamed carrots",
        snacks: "Popcorn (no salt), watermelon"
      },
      avoid: ["Table salt", "Pickles, papad", "Canned foods", "Cheese (processed)", "Caffeine"],
      tips: [
        "Use herbs and spices instead of salt.",
        "Walk for 30-45 mins daily.",
        "Reduce stress through deep breathing.",
        "Monitor BP daily."
      ]
    },
    Kidney: {
      color: "#009688",
      desc: "Kidney-friendly: Low Sodium, Potassium, and Phosphorus.",
      calories: 2000,
      macros: { protein: "50g (controlled)", carbs: "250g", fats: "60g" },
      meals: {
        breakfast: "Rice flakes (poha) with less salt, cucumber",
        lunch: "Rice, dal (arhar), pumpkin vegetables",
        dinner: "Roti, bottle gourd (lauki) vegetable, salad",
        snacks: "Apple (small), popcorn (no salt)"
      },
      avoid: ["Salt", "Potato, tomato (high potassium)", "Banana", "Nuts", "Soft drinks"],
      tips: [
        "Boil vegetables to reduce potassium content.",
        "Avoid over-the-counter pain killers.",
        "Strictly limit fluid intake if advised by doctor.",
        "Regular kidney function tests."
      ]
    }
  };

  const [selectedDisease, setSelectedDisease] = useState("Diabetes");
  const currentData = dietDatabase[selectedDisease];

  return (
    <div className="diet-wrapper">
      {/* HEADER */}
      <div className="diet-header">
        <h1>🥗 Smart AI Diet Plan</h1>
        <p>Personalized Nutrition for Better Health</p>

        <div className="disease-selector">
          <label>Select Your Condition:</label>
          <select 
            value={selectedDisease} 
            onChange={(e) => setSelectedDisease(e.target.value)}
            style={{ borderColor: currentData.color }}
          >
            {Object.keys(dietDatabase).map((disease) => (
              <option key={disease} value={disease}>{disease}</option>
            ))}
          </select>
        </div>
      </div>

      {/* INFO BAR */}
      <div className="info-bar">
        <div className="info-item">
          <span>🔥 Target Calories</span>
          <strong>{currentData.calories} kcal</strong>
        </div>
        <div className="info-item">
          <span>🥩 Protein</span>
          <strong>{currentData.macros.protein}</strong>
        </div>
        <div className="info-item">
          <span>🍞 Carbs</span>
          <strong>{currentData.macros.carbs}</strong>
        </div>
        <div className="info-item">
          <span>🥑 Fats</span>
          <strong>{currentData.macros.fats}</strong>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="disease-desc" style={{ borderLeft: `5px solid ${currentData.color}` }}>
        <p>{currentData.desc}</p>
      </div>

      {/* MEALS GRID */}
      <h2 className="section-title">Your Daily Meal Plan</h2>
      <div className="meal-grid">
        {Object.entries(currentData.meals).map(([time, food]) => (
          <div className="meal-card" key={time}>
            <div className="meal-icon">
              {time === 'breakfast' ? '🌅' : time === 'lunch' ? '☀️' : time === 'dinner' ? '🌙' : '🍎'}
            </div>
            <h3>{time.charAt(0).toUpperCase() + time.slice(1)}</h3>
            <p>{food}</p>
          </div>
        ))}
      </div>

      {/* AVOID & TIPS GRID */}
      <div className="details-grid">
        <div className="avoid-card">
          <h3>⚠️ Foods to Avoid</h3>
          <ul>
            {currentData.avoid.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="tips-card">
          <h3>💡 Lifestyle Recommendations</h3>
          <ul>
            {currentData.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}