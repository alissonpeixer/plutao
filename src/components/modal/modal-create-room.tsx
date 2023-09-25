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
import FromLogin from "../form/form-login";
import FromCreateRoom from "../form/form-create-room";




export default function ModalCreateRoom() {

    const { isOpen, onClose, onOpen, type } = useModal();


    const isModalOpen = isOpen && type === "createdRoom";



    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent  >
                <DialogHeader >
                    <DialogTitle>Crie uma Sala de Bate-Papo</DialogTitle>
                    <DialogDescription>
                        Abaixo preencha o nome da sala e a senha de acesso, caso queria usar! 😎
                    </DialogDescription>
                </DialogHeader>
                <FromCreateRoom />
            </DialogContent>
        </Dialog>)
}