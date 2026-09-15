import { useAuth0 } from "@auth0/auth0-react";

import LoadingScreen from "./components/auth/LoadingScreen";
import LoginPage from "./components/auth/LoginPage";
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
    const {
        isAuthenticated,
        isLoading,
    } = useAuth0();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        return <LoginPage />;
    }

    return <DashboardLayout />;
}

export default App;