import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar.jsx";
import { AppSidebar } from "@/components/app-sidebar.jsx";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { useEffect } from "react";
import axios from "axios";
import { apiUrl } from "@/env.js";
import { LogOut, User, ShoppingBasket, PanelTop } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUserInitials } from "@/services/getUserInitials.js";
import { setUserData } from "@/services/userDataSlice.js";
import { Toaster } from "@/components/ui/toaster.jsx";

export default function SidebarNavbar() {
  const userData = useSelector((state) => state.userData.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    const getUserData = async () => {
      const responseGetUser = await axios.get(
        `${apiUrl}/api/users/${localStorage.getItem("username")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      dispatch(setUserData(responseGetUser.data.data[0]));
    };

    getUserData().then();
  }, [dispatch]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between sticky top-0 bg-white z-10">
          <SidebarTrigger className="-ml-1" />
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
          {userData.username ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={`${apiUrl}/${userData.foto_profil}`} />
                  <AvatarFallback>
                    {getUserInitials(userData.name)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={"mr-3"}>
                <DropdownMenuItem asChild={true}>
                  <Link to={"/profile"}>
                    {" "}
                    <User /> Profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild={true}>
                  <Link to={"/your-product"}>
                    {" "}
                    <ShoppingBasket /> Produk Anda
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild={true}>
                  <Link to={"/your-post"}>
                    {" "}
                    <PanelTop /> Post Anda
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut /> Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div>
              <Button asChild={true}>
                <Link to={"/login"}>Login</Link>
              </Button>
            </div>
          )}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-gray-100">
          <Outlet />
          {/*<div className="grid auto-rows-min gap-4 md:grid-cols-3">*/}
          {/*    <div className="aspect-video rounded-xl bg-muted/50"/>*/}
          {/*    <div className="aspect-video rounded-xl bg-muted/50"/>*/}
          {/*    <div className="aspect-video rounded-xl bg-muted/50"/>*/}
          {/*</div>*/}
          {/*<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"/>*/}
          <Toaster />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
