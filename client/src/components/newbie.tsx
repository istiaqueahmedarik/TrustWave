/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

interface Participant {
  id: number;
  position: number;
  movement: number;
  avatar: string;
  name: string;
  incoming: number;
  outgoing: number;
}


export default function LeaderboardTable({ data }: { data: any[] }) {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="text-center items-center justify-center">
            <TableHead className="w-[120px]">Positions</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((participant, id) =>
            <TableRow key={participant.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {id}
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {participant.user_id}
                </div>
              </TableCell>


              <TableCell className="text-blue-500 font-semibold">{participant.transaction_count}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
