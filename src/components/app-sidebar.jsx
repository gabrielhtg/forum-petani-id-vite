import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Cloud, Flame, Store, ThumbsUp, Users } from "lucide-react";
import AppLogo from "@/components/custom/app-logo.jsx";
import { Link, useLocation } from "react-router-dom";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Untuk Anda",
      url: "/",
      icon: ThumbsUp,
    },
    {
      title: "Popular",
      url: "/popular",
      icon: Flame,
    },
    {
      title: "Marketplace",
      url: "/marketplace",
      icon: Store,
    },
    {
      title: "Weather",
      url: "/weather",
      icon: Cloud,
    },
    // {
    //   title: "Komunitas",
    //   url: "/community",
    //   icon: Users,
    // },
  ],
};

export function AppSidebar({ ...props }) {
  const location = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarGroup>
          {/*<SidebarGroupLabel>Application</SidebarGroupLabel>*/}
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.url === location.pathname}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
