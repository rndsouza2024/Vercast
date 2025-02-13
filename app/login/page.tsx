"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signInWithGoogle } from "@/lib/firebase"

export default function Login() {
  const router = useRouter()

  async function handleLogin() {
    try {
      await signInWithGoogle()
      router.push("/")
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to upload and manage your videos</p>
        </div>
        <Button onClick={handleLogin} className="w-full" size="lg">
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}

