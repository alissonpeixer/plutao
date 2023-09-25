import Image from "next/image";
import Link from "next/link";

export default function LayoutAuth(
    { children }: { children: React.ReactNode }
) {

    return (
        <main className="md:container md:mx-auto flex flex-col justify-center md:items-center h-screen">
            <div className="md:bg-neutral-900 p-10 rounded-xl flex flex-col gap-4 md:w-3/6">
                {children}
            </div>
        </main>
    )
}