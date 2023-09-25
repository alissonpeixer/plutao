"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/user-modal-store";

import { signOut } from "next-auth/react";

import { useRouter } from "next/navigation";

export default function Lobby() {


    const { onOpen } = useModal();
    const router = useRouter();

    return (
        <>
            <div className="flex justify-between">
                <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Lobby
                </h2>
            </div>
            <div className="flex-1 mt-10 flex flex-col gap-4">
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Crie uma sala ou use o chat Global!
                </p>
                <div className="transition-all flex flex-col gap-4 h-full justify-center md:flex-row md:items-center ">
                    <Button className="md:w-6/12" onClick={() => onOpen("createdRoom")}>
                        Criar Sala
                    </Button>
                    <Button className="md:w-6/12" onClick={() => router.push("/global")} >
                        Chat Global
                    </Button>
                </div>
            </div>
        </>


    )
}