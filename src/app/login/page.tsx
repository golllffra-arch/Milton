"use client"
import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { GraduationCap, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast({ title: "Error", description: "Invalid email or password", variant: "destructive" })
        return
      }

      const sessionRes = await fetch("/api/auth/session")
      const session = await sessionRes.json()
      const role = session?.user?.role

      if (role === "ADMIN" || role === "SUPER_ADMIN" || role === "ACCOUNTANT" || role === "FACULTY") {
        router.push("/dashboard/admin")
      } else {
        router.push("/dashboard/student")
      }
      router.refresh()
    } catch {
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: "var(--page-primary, #1b3f63)" }}>
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold" style={{ color: "var(--page-text, #000000)" }}>
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your student portal</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Student ID or Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="MICAS001"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full text-white" style={{ background: "var(--page-primary, #1b3f63)" }} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <p className="text-xs text-gray-400 text-center mt-4">
              College password for all students: <span className="font-semibold">milton</span>
            </p>
            <div className="mt-5 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Demo Access</p>
              <p className="text-xs text-gray-500">All passwords: <span className="font-semibold text-gray-700">milton</span></p>
              <div className="mt-2 space-y-1 text-xs text-gray-500">
                <p>
                  <span className="font-semibold text-[var(--page-primary, #1b3f63)]">Admin</span> —{" "}
                  <span className="font-mono">admin@milton.edu</span>
                </p>
                <p>
                  <span className="font-semibold text-[var(--page-accent, #fe0000)]">Student</span> —{" "}
                  <span className="font-mono">MICAS001</span> or your Student ID
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center mt-3">
              New student?{" "}
              <Link href="/register" className="font-medium hover:underline" style={{ color: "var(--page-accent, #fe0000)" }}>
                Get your student ID
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
