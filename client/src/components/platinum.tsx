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

const participants: Participant[] = [
  {
    id: 1,
    position: 1,
    movement: 2,
    avatar:
      "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
    name: "Dianne Russell",
    incoming: 50000,
    outgoing: 1000,
  },
  {
    id: 4,
    position: 4,
    movement: 0,
    avatar:
      "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
    name: "Cody Fisher",
    incoming: 35000,
    outgoing: 1300,
  },
  {
    id: 5,
    position: 5,
    movement: 0,
    avatar:
      "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
    name: "Beverly Little",
    incoming: 30000,
    outgoing: 1400,
  },
  {
    id: 10,
    position: 10,
    movement: 0,
    avatar:
      "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
    name: "Cody Fisher",
    incoming: 5000,
    outgoing: 1900,
  },
];

export default function LeaderboardTable() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="text-center items-center justify-center">
            <TableHead className="w-[120px]">Positions</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Incoming</TableHead>
            <TableHead>Outgoing</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {participant.position}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={participant.avatar || "/placeholder.svg"}
                      alt={`${participant.name}'s avatar`}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <span>{participant.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {participant.incoming}
              </TableCell>
              <TableCell className="text-red-600 dark:text-red-400 font-semibold">
                {participant.outgoing}
              </TableCell>
              <TableCell className="text-blue-500 font-semibold">
                {participant.incoming + participant.outgoing}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
