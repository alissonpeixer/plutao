import FromLogin from "@/components/form/form-login";
import Link from "next/link";

export default function signIn() {
    return (
        <>
            <FromLogin />
            <hr></hr>
            <Link href="/signup" className="text-center md:text-start  transition-all text-base text-blue-50 hover:text-blue-600">
                Não tenho Conta
            </Link>
        </>
    )
}