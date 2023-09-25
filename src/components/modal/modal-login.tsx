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




export default function ModalLogin() {

    const { isOpen, onClose, onOpen, type } = useModal();


    const isModalOpen = isOpen && type === "login";



    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent  >
                <DialogHeader >
                    <DialogTitle>Login</DialogTitle>
                    {/* <DialogDescription>
                        É bom o ver novamente 😊
                    </DialogDescription> */}
                </DialogHeader>
                <FromLogin />
            </DialogContent>
        </Dialog>)
}