import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  history: number[];
};

const BMIChart: React.FC<Props> = ({ history }) => {
  const data = history.map((value, index) => ({
    name: `${index + 1}`,
    bmi: value,
  }));
  
  return (
    <div style={{ width: "100%", height: 200, marginTop: "20px" }}>
      <h4 style={{ textAlign: "center" }}>📊 BMI Trend</h4>

      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[10, 40]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="bmi"
            stroke="#007bff"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BMIChart;