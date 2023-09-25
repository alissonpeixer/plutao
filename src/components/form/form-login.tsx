"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { AlertCircle, FileWarning, Terminal } from "lucide-react"

import axios from "axios";

import { signOut, signIn } from "next-auth/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/user-modal-store";
import Image from "next/image";
import { LogoChatWhite } from "../svg/logo";
import { useRouter } from 'next/navigation';


const formSchema = z.object({
	username: z.string().min(2).max(50),
	password: z.string().min(8).max(50),
});

export default function FromLogin() {

	const { onOpen, onClose, isOpen } = useModal();

	const [erro, setErro] = useState(false);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},

		values: {
			password: "",
			username: "",
		}
	})


	async function onSubmit(values: z.infer<typeof formSchema>) {
		await signIn("signin", {
			...values,
			redirect: false,
		}).then((res) => {
			if (!res?.url) {
				setErro(true);
			} else {
				onClose();
				router.push("/lobby");
			}
		})
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		setErro(false)
	}, [form.formState.isValid])

	return (

		<div className="flex flex-col  rounded-xl gap-10 ">
			<Alert variant="destructive" className={` transition-all ${!erro && "hidden"} `}>
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					Opsss... Senha ou Usuário estão errado!
				</AlertDescription>
			</Alert>
			<div className="flex justify-center">
				<LogoChatWhite
					height={0}
					width={150}
				/>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="Digite seu username" {...field} />
								</FormControl>
								<FormDescription>
									Seu username de acesso
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Senha</FormLabel>
								<FormControl>
									<Input placeholder="Digite sua senha" {...field} />
								</FormControl>
								<FormDescription>
									Sua senha de acesso
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={!form.formState.isValid || form.formState.isSubmitting}
						className="w-full"
						type="submit"
						variant={form.formState.isValid ? "default" : "outline"}
					>Entrar</Button>
				</form>
			</Form>
			{isOpen &&
				<>
					<hr></hr>
					<Button
						onClick={() => (onClose(), onOpen("register"))}
						className="w-full"
					>Ops... Não tenho conta 👀</Button>
				</>
			}

		</div>
	)
}