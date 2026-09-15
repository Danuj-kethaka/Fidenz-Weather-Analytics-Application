function Topbar({
    user,
    onMenuClick,
    onLogout,
    darkMode,
    onThemeToggle,
}) {
    const userEmail = user?.email || "User";

    const userInitial =
        userEmail.charAt(0).toUpperCase();

    return (
        <header className="topbar">

            <div className="topbar-left">

                <button
                    className="mobile-menu-button"
                    onClick={onMenuClick}
                    aria-label="Open menu"
                >
                    ☰
                </button>

                <div className="topbar-title">
                    <span className="topbar-eyebrow">
                        WEATHER INTELLIGENCE
                    </span>

                    <h1>
                        Weather Analytics
                    </h1>
                </div>

            </div>

            <div className="topbar-right">

                <div className="api-status">
                    <span className="status-dot"></span>

                    <span>
                        Live Data
                    </span>
                </div>

                <div className="topbar-divider"></div>

                <div className="topbar-user">

                    <div className="user-avatar">
                        {userInitial}
                    </div>

                    <div className="user-details">
                        <strong>{userEmail}</strong>

                        <span>
                            Authenticated User
                        </span>
                    </div>

                </div>


                <button
                    className="logout-button"
                    onClick={onLogout}
                >
                    Logout
                </button>

            </div>

        </header>
    );
}

export default Topbar;