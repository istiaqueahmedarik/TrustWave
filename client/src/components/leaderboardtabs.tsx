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

export default function TabsDemo() {
  return (
    <Tabs defaultValue="newbie" className="w-full max-w-6xl mx-auto">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="newbie">Newbie</TabsTrigger>
        <TabsTrigger value="bronze">Bronze</TabsTrigger>
        <TabsTrigger value="silver">Silver</TabsTrigger>
        <TabsTrigger value="gold">Gold</TabsTrigger>
        <TabsTrigger value="paltinum">Paltinum</TabsTrigger>
      </TabsList>
      <TabsContent value="newbie">
        <Newbie />
      </TabsContent>
      <TabsContent value="bronze">
        <Bronze />
      </TabsContent>
      <TabsContent value="silver">
        <Silver />
      </TabsContent>
      <TabsContent value="gold">
        <Gold />
      </TabsContent>
      <TabsContent value="paltinum">
        <Paltinum />
      </TabsContent>
    </Tabs>
  );
}
