import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.jsx";
import {AppSidebar} from "@/components/app-sidebar.jsx";
import {Link, Outlet} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";

export default function SidebarNavbar() {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between sticky top-0 bg-white z-10">
                    <SidebarTrigger className="-ml-1"/>
                    {/*<Separator orientation="vertical" className="mr-2 h-4"/>*/}
                    {/*<Breadcrumb>*/}
                    {/*    <BreadcrumbList>*/}
                    {/*        <BreadcrumbItem className="hidden md:block">*/}
                    {/*            <BreadcrumbLink href="#">*/}
                    {/*                Building Your Application*/}
                    {/*            </BreadcrumbLink>*/}
                    {/*        </BreadcrumbItem>*/}
                    {/*        <BreadcrumbSeparator className="hidden md:block"/>*/}
                    {/*        <BreadcrumbItem>*/}
                    {/*            <BreadcrumbPage>Data Fetching</BreadcrumbPage>*/}
                    {/*        </BreadcrumbItem>*/}
                    {/*    </BreadcrumbList>*/}
                    {/*</Breadcrumb>*/}
                    <div>
                        <Button asChild={true}>
                            <Link to={'/login'}>
                                Login
                            </Link>
                        </Button>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet/>
                    {/*<div className="grid auto-rows-min gap-4 md:grid-cols-3">*/}
                    {/*    <div className="aspect-video rounded-xl bg-muted/50"/>*/}
                    {/*    <div className="aspect-video rounded-xl bg-muted/50"/>*/}
                    {/*    <div className="aspect-video rounded-xl bg-muted/50"/>*/}
                    {/*</div>*/}
                    {/*<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"/>*/}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
