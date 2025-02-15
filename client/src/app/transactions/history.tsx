import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  ShoppingCart,
  CreditCard,
  type LucideIcon,
  ArrowRight,
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
    amount: "৳999.00",
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
    amount: "৳4,500.00",
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
    amount: "৳15.99",
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
    amount: "৳999.00",
    type: "outgoing",
    category: "shopping",
    icon: ShoppingCart,
    timestamp: "Today, 2:45 PM",
    receiverAccount: "202214112",
    trxId: "0x1234567890",
    status: "completed",
  },
  {
    id: "5",
    title: "Supabase Subscription",
    amount: "৳15.99",
    type: "outgoing",
    category: "entertainment",
    icon: CreditCard,
    timestamp: "Yesterday",
    receiverAccount: "202214112",
    trxId: "0x1234567890",
    status: "pending",
  },
  {
    id: "6",
    title: "Vercel Subscription",
    amount: "৳15.99",
    type: "outgoing",
    category: "entertainment",
    icon: CreditCard,
    timestamp: "Yesterday",
    receiverAccount: "202214112",
    trxId: "0x1234567890",
    status: "pending",
  },
];

export default function List02({
  transactions = TRANSACTIONS,
  className,
}: List02Props) {
  return (
    <div className="w-full  mx-auto bg-white dark:bg-zinc-900/70 border border-zinc-00 dark:border-zinc-800 rounded-xl shadow-sm backdrop-blur-xl">
      <h2 className="text-xl text-center p-2 font-semibold text-zinc-900 dark:text-zinc-100">
        All Transactions
      </h2>
      <div className="p-4 border-t-2">
        <div className="space-y-1">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={cn(
                "group flex items-center gap-3",
                "p-2 rounded-lg",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                "transition-all duration-200"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-lg",
                  "bg-zinc-100 dark:bg-zinc-800",
                  "border border-zinc-200 dark:border-zinc-700"
                )}
              >
                <transaction.icon className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
              </div>

              <div className="flex-1 ml-4 flex items-center justify-between min-w-0">
                <div className="space-y-0.5">
                  <h3 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
                    {transaction.title}
                  </h3>
                  <p className="text-[13px] text-zinc-600 dark:text-zinc-400">
                    {transaction.timestamp}
                  </p>
                  <div className="flex flex-col md:flex-row items-start gap-1.5">
                    <p className="text-[13px] text-zinc-700 dark:text-zinc-400">
                      {transaction.type === "incoming" ? "From" : "To"}
                      {": "}
                      <span className="text-zinc-400">
                        {transaction.receiverAccount}
                      </span>
                    </p>
                    <p className="text-[13px] text-zinc-700 dark:text-zinc-400">
                      Transaction ID: <span></span>
                      <span className="text-zinc-400">{transaction.trxId}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pl-3">
                  <span
                    className={cn(
                      "text-[15px] font-medium flex",
                      transaction.type === "incoming"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    )}
                  >
                    {transaction.type === "incoming" ? "+\u00A0" : "-\u00A0"}
                    <p
                      className={`text-lg font-medium ${
                        transaction.type === "incoming"
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.amount}
                    </p>
                  </span>
                  {transaction.type === "incoming" ? (
                    <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <ArrowUpRight className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
