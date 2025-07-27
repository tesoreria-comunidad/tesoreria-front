import { useState } from "react";
import { Button } from "../ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export function Asidebar() {
    const [activeSection, setActiveSection] = useState("perfil")



    const renderContent = () => {
        switch (activeSection) {
            case "perfil":
                return <div>👤 Esta es la sección de Perfil</div>
            case "rama":
                return <div>🌳 Esta es la sección de Rama</div>
            case "cuotas":
                return <div>💸 Esta es la sección de Cuotas</div>
            case "cfa":
                return <div>📚 Esta es la sección de CFA</div>
            default:
                return <div>Seleccioná una sección</div>
        }
    }
    return (
        <div className="flex h-screen bg-cyan-800 ">
            <SidebarProvider>
                <SidebarTrigger />
                <Sidebar className="bg-cyan-800">
                    <SidebarHeader>
                        <p>Mi Pelicano - Familia Romero</p>
                    </SidebarHeader>
                    <SidebarContent className="flex flex-col mt-10 gap-5">
                        <Button variant="ghost" onClick={() => setActiveSection("perfil")}>
                            Perfil
                        </Button>
                        <Button variant="ghost" onClick={() => setActiveSection("rama")}>
                            Rama
                        </Button>
                        <Button variant="ghost" onClick={() => setActiveSection("cuotas")}>
                            Cuotas
                        </Button>
                        <Button variant="ghost" onClick={() => setActiveSection("cfa")}>
                            CFA
                        </Button>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarTrigger />
                    </SidebarFooter>
                </Sidebar>
                <main className="flex-1 p-6 bg-cyan-800 overflow-auto">
                    {renderContent()}
                </main>
            </SidebarProvider>
        </div>
    )
}
