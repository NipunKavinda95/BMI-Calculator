import React from "react";

type BMIRangeProps = {
  bmi: number;
};

const BMIRange: React.FC<BMIRangeProps> = ({ bmi }) => {
  const pointerPos = Math.min((bmi / 40) * 100, 100);

  return (
    <div className="bmi-range-container">
      {/* Range Bar */}
      <div className="bmi-bar">
        <div className="underweight" title="Underweight (<18.5)" />
        <div className="normal" title="Normal (18.5 - 24.9)" />
        <div className="overweight" title="Overweight (25 - 29.9)" />
        <div className="obese" title="Obese (30+)" />
      </div>

      {/* Pointer */}
      <div className="pointer-container">
        <div
          className="pointer"
          style={{ left: `${pointerPos}%` }}
        />
      </div>

      {/* Labels */}
      <div className="bmi-labels">
        <span>Under</span>
        <span>Normal</span>
        <span>Over</span>
        <span>Obese</span>
      </div>
    </div>
  );
};

export default BMIRange;