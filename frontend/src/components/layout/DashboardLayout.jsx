import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Dashboard from "../dashboard/Dashboard";

function DashboardLayout() {
    const { user, logout } = useAuth0();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("dashboard");

    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
    };

    const handleNavigation = (section) => {
        setActiveSection(section);
        setSidebarOpen(false);

        if (section === "dashboard") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }

        const target = document.getElementById(section);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className="app">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                activeSection={activeSection}
                onNavigate={handleNavigation}
            />

            <div className="main-content">
                <Topbar
                    user={user}
                    onMenuClick={() => setSidebarOpen(true)}
                    onLogout={handleLogout}
                />

                <main className="dashboard">
                    <Dashboard />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;