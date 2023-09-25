"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";




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


const formSchema = z.object({
	nameID: z.string().min(2).max(50),
	password: z.string().min(8).max(50),
});

export default function FromCreateRoom() {


	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nameID: "",
		},

		values: {
			password: "",
			nameID: "",
		}
	})


	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	return (

		<div className="flex flex-col">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="nameID"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome da Sala</FormLabel>
								<FormControl>
									<Input placeholder="Ex: Casa Grande" {...field} />
								</FormControl>
								<FormDescription>
									Digite aqui nome da sala.
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
								<FormLabel>Senha de Acesso</FormLabel>
								<FormControl>
									<Input placeholder="Digite uma Senha" {...field} />
								</FormControl>
								<FormDescription>
									Senha para Acessar a Sala.
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
					>Criar</Button>
				</form>
			</Form>
		</div>
	)
}