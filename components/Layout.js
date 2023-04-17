import { Inter } from "next/font/google"
import { useSession, signIn } from "next-auth/react"
import Nav from "@/components/Nav"

export default function Layout({ children }) {
    const { data: session } = useSession()

    if (!session) {
        return (
            <div className="bg-blue-900">
                <div>
                    <button onClick={() => signIn("google")}>Login</button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-blue-900 flex min-h-screen">
            <Nav />
            <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">{children}</div>
        </div>
    )
}
