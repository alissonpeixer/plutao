import FromRegister from "@/components/form/form-register";
import Link from "next/link";

export default function SignUp() {
    return (
        <>
            <FromRegister />
            <hr></hr>
            <Link href="/signin" className="text-center md:text-start transition-all text-base text-blue-50 hover:text-blue-600">
                Já tenho Conta
            </Link>
        </>
    )
}