import { predict } from "@/actions/predict";
import PerformanceChart from "./analytics-chart";

export default async function Analytics() {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = [
        { month: "Jan", income: 30000, expense: 32000 },
        { month: "Feb", income: 35000, expense: 33000 },
        { month: "Mar", income: 28000, expense: 30000 },
        { month: "Apr", income: 38000, expense: 35000 },
        { month: "May", income: 32000, expense: 29000 },
        { month: "Jun", income: 30000, expense: 31000 },
        { month: "Jul", income: 28000, expense: 28000 },

    ];

    const predData = [...data];
    const totExpense = data.reduce((acc, item) => acc + item.expense, 0);

    const xMonth = data.map((item) => item.month);
    const yIncome = data.map((item) => item.income);
    const yExpense = data.map((item) => item.expense);
    const pred = await predict(yIncome, xMonth, "A person income and expense prediction");
    const pred1 = await predict(yExpense, xMonth, "A person income and expense prediction");
    const yPred = pred.yVal;
    const yPred1 = pred1.yVal;
    let sum = 0;
    for (let i = 0; i < yPred.length; i++) {
        predData.push({ month: month[((i + xMonth.length) % 12)], income: yPred[i], expense: yPred1[i] });
        sum += yPred1[i];
    }
    console.log(pred);
    return (
        <div className="max-w-2xl p-4 flex flex-col xl:flex-row gap-5">
            <PerformanceChart data={data} text={"Main Cost"} total={totExpense} />
            <PerformanceChart data={predData} text={"Prediction"} total={sum} />
        </div>
    )
}

