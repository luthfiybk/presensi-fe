import { Metadata } from "next";

export const metadataError: Metadata = {
    title: "Forbidden",
    description: "403 Forbidden",
}

export default function ErrorPage({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex justify-center items-center h-screen">
            {children}
        </main>
    )
}