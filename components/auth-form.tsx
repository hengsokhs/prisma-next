"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function AuthForm() {
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email")
        const password = formData.get("password")

        // TODO: hook into your auth logic
        console.log({ email, password })

        setTimeout(() => setLoading(false), 1000)
    }

    return (
        <Card className="w-full max-w-md shadow-xl border bg-background/80 backdrop-blur">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-semibold tracking-tight">
                    Welcome back
                </CardTitle>
                <CardDescription>
                    Enter your credentials to sign in
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                    </div>

                    <Button className="w-full" disabled={loading}>
                        {loading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                    Don’t have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}