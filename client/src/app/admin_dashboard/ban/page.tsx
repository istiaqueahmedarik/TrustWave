/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function BanUser({
  state,
  pending,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form"> & {
  state?: any;
  pending?: boolean;
}) {
  return (
    <div className="flex items-center justify-center h-full">
      <form
        className={cn("flex flex-col max-w-[400px] gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-balance text-lg font-bold text-muted-foreground">
            Enter IP address to ban user
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="ip">IP Address</Label>
            <Input
              id="ip"
              name="ip"
              type="ip"
              placeholder="103.194.117.93"
              required
              disabled={pending}
            />
          </div>

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Blocking in..." : "Block"}
          </Button>
          <p>
            {state && state.error && (
              <span className="text-red-500">{state.error}</span>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}
