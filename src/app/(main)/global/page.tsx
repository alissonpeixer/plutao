"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input";
import { ChatInput } from "@/components/chat/chat-input";
import { useSocket } from "@/components/provider/socket-provider";


interface MensagesItem {
    id: number;
    message: string;
    user: string;
    date: string;
}


export default function Global() {
    const [mensages, setMensages] = useState<MensagesItem[]>([]);

    const [textarea, setTextare] = useState<string>("");


    const { socket } = useSocket();

    useEffect(() => {
        //@ts-ignore
        if (!socket) {
            return;
        }

        socket.on("message", (message: any) => {
            console.log(message)
            sendMensage(message.content);
        });

        return () => {
            socket.off("message");
        };
    }, [socket]);



    const sendMensage = (value: string) => {
        setMensages((prevOld) => {
            return [
                ...prevOld,
                {
                    id: prevOld.length + 1,
                    message: value,
                    user: "Guest",
                    date: new Date().toLocaleString()
                }
            ]
        });
    }

    return (
        <div className="flex flex-col w-full gap-10 h-[87vh] mt-10">
            <ScrollArea className="h-4/5 rounded-md border p-4" >
                {mensages.map((item, id) => (
                    <div key={id} className="flex flex-row items-center  my-4">
                        <div className="flex flex-col">
                            <div className="flex gap-2 ml-2 items-center">
                                <img src={`https://i.pravatar.cc/150?img=${item.id}`} className="w-5 h-5 rounded-full" alt="avatar" />
                                <p className="text-xs font-medium text-sky-50">
                                    {item.user}
                                </p>
                            </div>
                        </div>
                        <p className="ml-4 text-base text-slate-50">
                            {item.message}
                        </p>
                    </div>
                ))}
            </ScrollArea>

            <div className="grid gap-3">
                <ChatInput
                    name="awdawd"
                    type="channel"
                    apiUrl="/api/socket/messages"
                    query={{
                        channelId: "wadaw",
                        serverId: "awdawd",
                    }}
                />
                <Button onClick={() => sendMensage("awdawdawdaw")}>Send message</Button>
            </div>

        </div>
    )
}