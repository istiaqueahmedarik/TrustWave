import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/transactions/ui/tabs";

import Gold from "./gold";
import Bronze from "./ui/bronze";
import Newbie from "./newbie";
import Paltinum from "./platinum";
import Silver from "./silver";
import { get_with_token } from "@/actions/req";

export default async function TabsDemo() {
  const res = await get_with_token('payment/auth/leaderboard', false);
  console.log(res);


  return (
    <Tabs defaultValue="newbie" className="w-full max-w-6xl mx-auto">

      <Newbie data={res.data} />

    </Tabs>
  );
}
