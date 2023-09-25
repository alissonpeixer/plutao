"use client";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/user-modal-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react";
import { LogoChatWhite } from "@/components/svg/logo";

const socket = io("http://localhost:3003");

export default function Home() {
  const [socketStatus, setSocketStatus] = useState<boolean>(false);

  const { onOpen, isOpen } = useModal();

  // useEffect(() => {

  //   if (!socketStatus) {
  //     fetch("http://localhost:3000/api").then((response: any) => {
  //       setSocketStatus(response)
  //     });
  //   }


  //   socket.on("connect", async () => {
  //     console.log(socket.id);
  //   });
  // }, [])

  const { data: session, status } = useSession()

  return (
    <main className="mx-auto container flex flex-col justify-center h-[97vh]">
      <div className="space-y-2">
        <Badge variant="secondary" className="w-">by alissonpeixer</Badge>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl items-center flex w-full">
          Bem-vindo ao
          <LogoChatWhite
            width={150}
            className="h-10 ml-4"
          />

        </h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          People stopped telling jokes
        </h4>
        <div className="flex gap-3 h-24 items-center">
          <Button onClick={() => onOpen("register")}>
            Não tenho conta
          </Button>
          <Button onClick={() => onOpen("login")}>
            Já tenho conta
          </Button>
        </div>
      </div>
    </main>
  )
}
