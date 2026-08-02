"use client"
import { useState } from "react"
import Link from "next/link"
import { GraduationCap, Loader2, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [createdId, setCreatedId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast({ title: "Error", description: data.error || "Registration failed", variant: "destructive" })
        return
      }

      setCreatedId(data.studentId)
      toast({ title: "Success", description: `Your student ID is ${data.studentId}` })
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: "var(--page-primary, #1b3a5c)" }}>
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold" style={{ color: "var(--page-text, #1a1a1a)" }}>
            Get Your Student ID
          </h1>
          <p className="text-sm text-gray-500 mt-1">Each student gets a unique ID based on their name</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg">Register</CardTitle>
            <CardDescription>
              Your ID will be auto-generated (e.g. Manoj Shrestha → MICMS001)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {createdId ? (
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full" style={{ background: "color-mix(in srgb, var(--page-primary, #1b3a5c) 10%, transparent)" }}>
                  <BadgeCheck className="w-8 h-8" style={{ color: "var(--page-accent, #d93a2b)" }} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Your student ID</p>
                  <p className="font-display text-3xl font-bold mt-1" style={{ color: "var(--page-primary, #1b3a5c)" }}>
                    {createdId}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Password for all students: <span className="font-semibold" style={{ color: "var(--page-accent, #d93a2b)" }}>milton</span>
                </p>
                <Link href="/login" className="block">
                  <Button className="w-full text-white" style={{ background: "var(--page-primary, #1b3a5c)" }}>
                    Sign In Now
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="e.g. Manoj Shrestha"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full text-white" style={{ background: "var(--page-primary, #1b3a5c)" }} disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {loading ? "Creating account..." : "Get My Student ID"}
                </Button>
              </form>
            )}
            <p className="text-xs text-gray-400 text-center mt-4">
              Already have an ID?{" "}
              <Link href="/login" className="font-medium hover:underline" style={{ color: "var(--page-accent, #d93a2b)" }}>
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
