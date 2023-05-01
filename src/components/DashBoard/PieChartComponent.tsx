import { Cell, Legend, Pie, PieChart } from "recharts";

import { PieChartProps } from "components/DashBoard/types";

const COLORS = ["#0088FE", "#FF8042"];

const generateColors = () => {
    return COLORS.map((color, index) => (
        <Cell key={`cell-${index}`} fill={color} />
    ));
};

const Piechart = (data: PieChartProps) => {
    return (
        <div className="d-flex justify-content-center mt-5 w-50">
            <PieChart width={500} height={500}>
                <text
                    x={205}
                    y={210}
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    PieChart
                </text>

                <Pie
                    data={data.pieChartData}
                    cx={200}
                    cy={200}
                    innerRadius={50}
                    outerRadius={150}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                >
                    {generateColors()}
                </Pie>
                <Legend />
            </PieChart>
        </div>
    );
};

export default Piechart;
