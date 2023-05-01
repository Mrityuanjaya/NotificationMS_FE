import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { LineChartProps } from "components/DashBoard/types";

const SimpleLineChart = (data: LineChartProps) => {
    return (
        <div className="d-flex justify-content-center mt-5">
            <LineChart width={1000} height={600} data={data.lineChartData}>
                <XAxis
                    dataKey="time"
                    label={{
                        value: "Date/Time",
                        position: "insideBottomRight",
                        offset: -8,
                    }}
                />
                <YAxis
                    label={{
                        value: "Notifications",
                        angle: -90,
                        position: "insideLeft",
                    }}
                />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="success" stroke="#1abc9c" />
                <Line type="monotone" dataKey="failure" stroke="#e74c3c" />
                <Line type="monotone" dataKey="total" stroke="#3498db" />
            </LineChart>
        </div>
    );
};

export default SimpleLineChart;
