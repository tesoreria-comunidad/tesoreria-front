import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function DashboardPage() {
  return (
    <div>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <h1>CONTENIDO</h1>
          <SidebarGroup></SidebarGroup>
          <SidebarGroup></SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </div>
  );
}
