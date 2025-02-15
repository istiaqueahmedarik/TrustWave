'use client'
import { Login } from "@/actions/auth"
import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import { useActionState } from "react"

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(Login, null);
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-primary-foreground">
              <Image src="/icon.svg" alt="Icon" width={34} height={34} />
            </div>
            Trust Wave
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm action={formAction} state={state} pending={pending} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/login_1.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          layout="fill"
        />
      </div>
    </div>
  );
}
