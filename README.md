# 💪 NIKSOFT BMI Calculator & Health Monitoring App

**NIKSOFT BMI Calculator** is a responsive web application built with **React + TypeScript** that allows users to calculate their Body Mass Index (BMI), track BMI history, and visualize it with interactive charts and gauges. The app supports **dark/light mode**, **range sliders**, and **exportable BMI reports** as PNG images.

---

## 🔹 Features

- **Dynamic BMI Calculation**: Enter weight and height using sliders and instantly calculate BMI.
- **BMI Classification**: Shows your BMI category (Underweight, Normal, Overweight, Obese) with health tips.
- **Interactive Visualization**:
  - Gauge showing BMI level.
  - Range bar with colored segments for each BMI category.
  - Chart showing BMI history over time.
- **History Tracking**: Stores past BMI calculations in localStorage.
- **Export Report**: Download the BMI result, gauge, range bar, and history chart as a PNG image.
- **Dark/Light Mode**: Toggle between themes.
- **Responsive Design**: Works perfectly on desktop and mobile.

---

## 🛠 Technology Stack

- **Frontend**: React + TypeScript  
- **Charts & Visualization**: Custom components + lazy loading (`React.lazy`, `Suspense`)  
- **Export**: `html-to-image` library for generating PNG reports  
- **State Management**: React Hooks (`useState`, `useEffect`)  
- **Styling**: CSS, responsive design, sticky header for sliders & buttons

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/NipunKavinda95/bmi-calculator.git
cd bmi-calculator
```
### 2. Install Dependencies
```bas
npm install
```
or
```bash
yarn install
```
### 3. Run Locally
```bash
npm run dev
```
or
```bash
yarn dev
```
Open http://localhost:5173 to view the app in your browser.

### 4. Build for Production
```bash
npm run build
```
or
```bash
yarn build
```
The production-ready files will be in the dist/ folder.

## 🔧 Project Structure

- src/
  - components/
    - BMICalculator.tsx
    - BMIGauge.tsx
    - BMIRange.tsx
    - BMIChart.tsx
  - App.tsx
  - main.tsx
  - index.css
  - assets/
    - vite.svg
- public/
  - icons.svg
  - index.html
- package.json
- tsconfig.json

## ✅ Future Improvements

- Add user authentication to save BMI history across devices.
- Add weight and height units’ toggle (kg/lb, cm/inches).
- Add predictive analytics or goal tracking for BMI over time.
- Host the app via GitHub Pages or Vercel for public access.
- Add PDF export option in addition to PNG.

## 👨‍💻 Author

### Nipun Kavinda – Mechanical Engineer /Python and Automation Developer

- GitHub: https://github.com/NipunKavinda95
- LinkedIn: https://www.linkedin.com/in/nipun-kavinda/

