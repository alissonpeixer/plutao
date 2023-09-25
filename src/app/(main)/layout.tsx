"use client"

import { LogoChatWhite } from "@/components/svg/logo";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";



export default function LayoutLobby({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const path = usePathname();

    return (
        <main className="pt-3 px-10 min-h-[97vh] flex flex-col md:mx-auto md:container">
            <div className="flex justify-between">
                <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    <LogoChatWhite
                        width={100}
                        className="h-10"
                    />
                </h2>
                <div className="flex gap-4">
                    <Button
                        disabled={path === "/lobby"}
                        onClick={() => router.push("/lobby")}
                        variant="outline"
                    >Lobby</Button>
                    <Button
                        onClick={() => signOut({
                            callbackUrl: "/"
                        })}
                        variant="destructive"
                    >Sair</Button>
                </div>

            </div>
            {children}
        </main>
    )
}