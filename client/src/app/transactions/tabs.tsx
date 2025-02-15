import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/transactions/ui/tabs";
import Transcations from "./history";
import Summary from "./summary";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="history" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="history">Transaction History</TabsTrigger>
        <TabsTrigger value="summary">Transaction Summary</TabsTrigger>
      </TabsList>
      <TabsContent value="history">
        <Transcations />
      </TabsContent>
      <TabsContent value="summary">
        <Summary />
      </TabsContent>
    </Tabs>
  );
}
