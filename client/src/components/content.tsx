
import { Calendar, CreditCard, Wallet } from "lucide-react"
import List01 from "./list-01"
import List02 from "./list-02"
import List03 from "./list-03"
import Analytics from "./Analytics"
import { get_with_token } from "@/actions/req"

export default async function Content() {

  return (
    <div className="space-y-4">
      <div className="grid grid-rows-1 lg:grid-rows-2 gap-6">

        <Analytics />

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
            <CreditCard className="w-4.5 h-4.5 text-zinc-900 dark:text-zinc-50" />
            Recent Transactions
          </h2>
          <div className="flex-1">
            <List02 className="h-full" />
          </div>
        </div>
      </div>


    </div>
  )
}

