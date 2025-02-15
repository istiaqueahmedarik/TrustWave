import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from './ui/button'

export default function AdminUserCard() {
  return (
    <div className="w-full flex flex-col gap-4">
      {[1, 2, 3, 4, 5].map((user, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>Arif Abdullah</CardTitle>
            <CardDescription>12 Aug 2024</CardDescription>
          </CardHeader>
          <div className="px-6 py-2">
            <p className="font-sans">
              <span className="font-bold text-green-900">IP:</span>{' '}
              123.111.111.1
            </p>
            <p className="font-sans">
              <span className="font-bold text-green-900">Transaction ID:</span>{' '}
              84729487329
            </p>
            <p>
              Received <span className="font-semibold text-blue-600">400</span>{' '}
              from Saikat Usman
            </p>
          </div>
          <CardFooter>
            <Button>Block User</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
