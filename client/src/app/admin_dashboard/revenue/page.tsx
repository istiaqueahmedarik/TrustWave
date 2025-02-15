import { ProfitLossChart } from '../../../components/profitLossChart'

export default function Revenue() {
  return (
    <div className="p-12 flex flex-col gap-4">
      <h1 className="text-2xl font-poppins font-bold text-gray-700">Revenue</h1>

      <ProfitLossChart />
    </div>
  )
}
