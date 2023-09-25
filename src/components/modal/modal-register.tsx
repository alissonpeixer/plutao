"use client"
import { useEffect, useState } from "react";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/user-modal-store";

import FromRegister from "../form/form-register";




export default function ModalRegister() {

    const { isOpen, onClose, onOpen, type } = useModal();


    const isModalOpen = isOpen && type === "register";



    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent  >
                <DialogHeader >
                    <DialogTitle>Crie sua conta</DialogTitle>
                    {/* <DialogDescription>
                        Para poder usar o sitema de chat, cria uma conta!
                    </DialogDescription> */}

                </DialogHeader>
                <FromRegister />
            </DialogContent>
        </Dialog>)
}