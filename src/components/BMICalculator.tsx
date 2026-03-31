import { useEffect, useRef, useState, lazy, Suspense } from "react";
import * as htmlToImage from "html-to-image";

const BMIGauge = lazy(() => import("./BMIGuage"));
const BMIRange = lazy(() => import("./BMIRange"));
const BMIChart = lazy(() => import("./BMIChart"));

// 🔹 BMI Info Function
const getBMIInfo = (bmi: number) => {
  if (bmi < 18.5) {
    return {
      category: "Underweight",
      color: "#1e90ff",
      tip: "You should consider gaining some weight for better health."
    };
  } else if (bmi < 24.9) {
    return {
      category: "Normal",
      color: "#28a745",
      tip: "Great! You have a healthy body weight."
    };
  } else if (bmi < 29.9) {
    return {
      category: "Overweight",
      color: "#ffc107",
      tip: "Try regular exercise and balanced diet."
    };
  } else {
    return {
      category: "Obese",
      color: "#dc3545",
      tip: "Consult a doctor and adopt a healthy lifestyle."
    };
  }
};

const BMICalculator = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [bmi, setBmi] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [history, setHistory] = useState<number[]>([]);
  const resultRef = useRef<HTMLDivElement | null>(null);

  // ✅ Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bmiHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // 📸 Export Image
  const exportAsImage = async () => {
    if (!resultRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(resultRef.current, {
        pixelRatio: 2,
        backgroundColor: darkMode ? "#121212" : "#ffffff",
      });

      const link = document.createElement("a");
      link.download = "bmi-report.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  // 🧮 Calculate BMI
  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    const roundedBMI = parseFloat(bmiValue.toFixed(2));
    setBmi(roundedBMI);

    // Save history
    const newHistory = [...history, roundedBMI];
    setHistory(newHistory);
    localStorage.setItem("bmiHistory", JSON.stringify(newHistory));

    // Smooth scroll to result
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const resetValues = () => {
    setWeight(70);
    setHeight(170);
    setBmi(null);
  };

  const textColor = darkMode ? "#ffffff" : "#000000";

  return (
    <div className={`card ${darkMode ? "dark" : "light"}`}>

      {/* 🔒 FIXED SECTION */}
      <div className="fixed-section">

        {/* Theme toggle */}
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        <h2 style={{ textAlign: "center", color: textColor }}>
          💪 NIKSOFT BMI CALCULATOR
        </h2>

        {/* Sliders */}
        <div className="slider-container">
          <label style={{ color: textColor }}>
            Weight: {weight} kg
            <input
              type="range"
              min={30}
              max={200}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </label>

          <label style={{ color: textColor }}>
            Height: {height} cm
            <input
              type="range"
              min={100}
              max={220}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </label>
        </div>

        <button onClick={calculateBMI}>Calculate</button>
        <button onClick={resetValues} style={{ marginTop: "10px" }}>
          Reset
        </button>

      </div>

      {/* 🔥 RESULT SECTION */}
      <div className="result-section">
        {bmi !== null && (() => {
          const info = getBMIInfo(bmi);
          return (
            <div style={{ textAlign: "center", color: textColor }}>

              {/* ✅ EXPORT AREA ONLY */}
              <div ref={resultRef} className="export-box">

                <h3 style={{ color: info.color }}>Your BMI: {bmi.toFixed(1)}</h3>
                <p style={{ color: info.color }}>Category: {info.category}</p>
                <p style={{ marginTop: "10px" }}>💡 {info.tip}</p>

                <Suspense fallback={<p>Loading...</p>}>
                  <BMIGauge bmi={bmi} />
                  <BMIRange bmi={bmi} />
                </Suspense>

                {/* Chart inside export */}
                {history.length > 1 && (
                  <Suspense fallback={<p>Loading chart...</p>}>
                    <BMIChart history={history} />
                  </Suspense>
                )}
              </div>

              {/* ❌ Buttons OUTSIDE export */}
              {history.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                  <h4>BMI History:</h4>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {history.map((item, index) => (
                      <li key={index}>{index + 1}. {item.toFixed(1)}</li>
                    ))}
                  </ul>

                  <button onClick={exportAsImage} style={{ marginTop: "20px" }}>
                    📸 Download Report
                  </button>

                  <button
                    onClick={() => {
                      setHistory([]);
                      localStorage.removeItem("bmiHistory");
                    }}
                    style={{ marginTop: "10px" }}
                  >
                    Clear History
                  </button>
                </div>
              )}

            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default BMICalculator;