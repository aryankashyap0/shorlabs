import { cookies } from "next/headers"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default async function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies()
    const sidebarState = cookieStore.get("sidebar_state")?.value
    const defaultOpen = sidebarState ? sidebarState === "true" : true

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="w-full">
                <SidebarTrigger className="md:hidden p-4" />
                {children}
            </main>
        </SidebarProvider>
    )
}
