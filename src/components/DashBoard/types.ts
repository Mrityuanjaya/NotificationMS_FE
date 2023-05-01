interface LineChartData {
    time: any;
    total: number;
    success: number;
    failure: number;
}

export interface LineChartProps {
    lineChartData: LineChartData[];
}

type PieChartData = {
    name: string;
    value: number;
}

export type PieChartProps = {
    pieChartData: PieChartData[]
}