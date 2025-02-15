'use client'
import { useActionState, useState } from 'react'
import { filterFraudUser } from '../actions/req'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function FilterFraud({
  __days,
  __ip_freq,
}: {
  __days: number
  __ip_freq: number
}) {
  const [state, formAction, pending] = useActionState(filterFraudUser, null)

  const [days, setDays] = useState(__days)
  const [ip_freq, setIpFreq] = useState(__ip_freq)

  return (
    <div>
      <form
        className="flex md:flex-row flex-col gap-4"
        action={formAction}
      >
        <div className="space-y-2">
          {/* <Label htmlFor="name">Course Name</Label> */}
          <div>
            <Input
              type="number"
              id="day"
              name="day"
              placeholder="Number of Days..."
              className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-2">
          {/* <Label htmlFor="name">Course Name</Label> */}
          <div>
            <Input
              type="number"
              id="ip_freq"
              name="ip_freq"
              placeholder="IP Frequency..."
              className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
              value={ip_freq}
              onChange={(e) => setIpFreq(Number(e.target.value))}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={pending}
        >
          {pending ? 'Searching...' : 'Search'}
        </Button>
      </form>
    </div>
  )
}
