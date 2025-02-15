"use client";

import { useActionState, useState } from "react";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Payment } from "@/actions/payment";

export default function PaymentForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");

  const [state, formAction, pending] = useActionState(Payment, null);
  console.log(state)
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Payment Details</CardTitle>
        <CardDescription>
          Enter your phone number, amount and an optional reference to complete the payment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={formAction}

        >
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <Input
              placeholder="1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              name="phoneNumber"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <Input
              placeholder="e.g. 99.99"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              name="amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Reference (Optional)</label>
            <Input
              placeholder="Enter reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              name="reference"
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            <Phone className="mr-2 h-4 w-4" />
            {pending ? "Processing..." : "Pay"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p className="text-center w-full">

        </p>
      </CardFooter>
    </Card>
  );
}
