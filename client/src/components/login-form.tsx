/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  state,
  pending,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form"> & {
  state?: any
  pending?: boolean
}) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required disabled={pending} />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>

          </div>
          <Input name="password" id="password" type="password" required disabled={pending} />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Logging in..." : "Login"}
        </Button>
        <p>
          {state && state.error && (
            <span className="text-red-500">{state.error}</span>
          )}
        </p>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}