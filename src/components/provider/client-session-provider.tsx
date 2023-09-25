'use client'

import { SessionProvider } from "next-auth/react"

export default function Provider({
    children
}: {
    children: React.ReactNode
}): React.ReactNode {
    return <SessionProvider basePath='/api/auth'>
        {children}
    </SessionProvider>
}