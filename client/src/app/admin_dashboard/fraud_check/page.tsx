import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import FilterFraud from '../../../components/filterFraud'
import { Button } from '../../../components/ui/button'

export default async function FraudCheck({
  searchParams,
}: {
  searchParams: Promise<any>
}) {
  const __sp = await searchParams
  const __days = __sp.days ? parseInt(__sp.days) : 1
  const __ip_freq = __sp.ip_freq ? parseInt(__sp.ip_freq) : 10
  return (
    <div className="p-12 flex flex-col gap-4">
      <h1 className="text-2xl font-poppins font-bold text-gray-700">
        Fraud List
      </h1>
      <FilterFraud
        __days={__days}
        __ip_freq={__ip_freq}
      />

      <Table>
        <TableCaption>A list frauds.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SL No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Block</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">01</TableCell>
            <TableCell>Arif Abdullah</TableCell>
            <TableCell>arif@gmail.com</TableCell>
            <TableCell className="text-right">
              <Button>Block</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
