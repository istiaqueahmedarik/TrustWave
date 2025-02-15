import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Wallet,
  ShoppingCart,
  CreditCard,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  amount: string;
  type: "incoming" | "outgoing";
  category: string;
  icon: LucideIcon;
  timestamp: string;
  receiverAccount?: string;
  trxId?: string;
  status: "completed" | "pending" | "failed";
}

interface List02Props {
  transactions?: Transaction[];
  className?: string;
}

const categoryStyles = {
  shopping: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  food: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  transport: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  entertainment:
    "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
};

const TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Apple Store Purchase",
    amount: "$999.00",
    type: "outgoing",
    category: "shopping",
    icon: ShoppingCart,
    timestamp: "Today, 2:45 PM",
    receiverAccount: "202214112",
    trxId: "0x1234567890",
    status: "completed",
  },
  {
    id: "2",
    title: "Salary Deposit",
    amount: "$4,500.00",
    type: "incoming",
    category: "transport",
    icon: Wallet,
    timestamp: "Today, 9:00 AM",
    receiverAccount: "202214112",
    trxId: "0x1234567890",
    status: "completed",
  },
  {
    id: "3",
    title: "Netflix Subscription",
    amount: "$15.99",
    type: "outgoing",
    category: "entertainment",
    icon: CreditCard,
    timestamp: "Yesterday",
    receiverAccount: "202214112",
    trxId: "0x1234567890",
    status: "pending",
  },
  {
    id: "4",
    title: "Apple Store Purchase",
    amount: "$999.00",
    type: "outgoing",
    category: "shopping",
    icon: ShoppingCart,
    timestamp: "Today, 2:45 PM",
    receiverAccount: "202214112",
    trxId: "0x1234567890",
    status: "completed",
  },
];

export default function List02({
  transactions = TRANSACTIONS,
  className,
}: List02Props) {
  return (
    <div className="w-full  mx-auto bg-white dark:bg-zinc-900/70 border border-zinc-00 dark:border-zinc-800 rounded-xl shadow-sm backdrop-blur-xl">
      <div className="text-center p-1 px-5 border-b-2 flex items-center justify-between">
        <ChevronLeft className="w-8 h-8 text-gray-400 cursor-pointer" />
        <div>
          <h2 className="text-xl p-2 font-medium text-zinc-900 dark:text-zinc-100">
            February 2025 Summary
          </h2>
          <p className="text-sm text-zinc-400">
            Last updated: 12:05pm 15/02/2025
          </p>
        </div>
        <ChevronRight className="w-8 h-8 text-gray-400 cursor-pointer" />
      </div>
      <div className="p-4">
        <div className="p-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg  p-4 shadow-sm text-center bg-gray-100">
              <p className="text-sm text-gray-500">Start Balance</p>
              <p className="text-xl font-medium">৳81.89</p>
            </div>
            <div className="rounded-lg  p-4 shadow-sm text-center bg-gray-100">
              <p className="text-sm text-gray-500">End Balance</p>
              <p className="text-xl font-medium">৳1,641.89</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
              <div>
                <h3 className="font-medium">Send Money</h3>
                <p className="text-sm text-gray-500">1 time</p>
              </div>
              <p className="text-lg font-medium text-red-500">- ৳510.00</p>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
              <div>
                <h3 className="font-medium">Received Money</h3>
                <p className="text-sm text-gray-500">5 times</p>
              </div>
              <p className="text-lg font-medium text-green-500">+ ৳7,245.00</p>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
              <div>
                <h3 className="font-medium">Make Payment</h3>
                <p className="text-sm text-gray-500">2 times</p>
              </div>
              <p className="text-lg font-medium text-red-500">- ৳5,175.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
