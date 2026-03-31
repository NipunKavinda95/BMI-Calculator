// src/components/BMIGauge.tsx
import React from "react";
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type BMIGaugeProps = {
  bmi: number;
};

const BMIGauge: React.FC<BMIGaugeProps> = ({ bmi }) => {
  // Determine BMI level
  let text = "";
  let color = "#007bff"; // default blue

  if (bmi < 18.5) {
    text = "Underweight";
    color = "#1e90ff"; // blue
  } else if (bmi < 24.9) {
    text = "Normal";
    color = "#28a745"; // green
  } else if (bmi < 29.9) {
    text = "Overweight";
    color = "#ffc107"; // yellow
  } else {
    text = "Obese";
    color = "#dc3545"; // red
  }

  return (
    <div style={{ width: 200, margin: "20px auto", textAlign: "center" }}>
      <CircularProgressbarWithChildren
        value={bmi}
        maxValue={40}
        styles={buildStyles({
          pathColor: color,
          trailColor: "#333",
          pathTransitionDuration: 1.5,
        })}
      >
        {/* ✅ Custom JSX inside gauge */}
        <div style={{ textAlign: "center", color }}>
          <div style={{ fontSize: "25px", fontWeight: "bold" }}>{bmi.toFixed(1)}</div>
          <div style={{ fontSize: "18px", marginTop: "4px" }}>{text}</div>
        </div>
      </CircularProgressbarWithChildren>

    </div>
  );
};

export default BMIGauge;