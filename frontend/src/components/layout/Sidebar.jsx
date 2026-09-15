function Sidebar({
    isOpen,
    onClose,
    activeSection,
    onNavigate,
}) {
    return (
        <>
            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={onClose}
                />
            )}

            <aside
                className={`sidebar ${isOpen ? "sidebar-open" : ""
                    }`}
            >
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        ☁
                    </div>

                    <div className="sidebar-brand">
                        <strong>Fidenz</strong>
                        <span>Weather Analytics</span>
                    </div>

                    <button
                        className="sidebar-close"
                        onClick={onClose}
                        aria-label="Close menu"
                    >
                        ×
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <div className="sidebar-section">
                        <span className="sidebar-section-title">
                            OVERVIEW
                        </span>

                        <button
                            className={`sidebar-nav-item ${activeSection === "dashboard"
                                    ? "active"
                                    : ""
                                }`}
                            onClick={() =>
                                onNavigate("dashboard")
                            }
                        >
                            <span className="sidebar-nav-icon">
                                ◈
                            </span>

                            <span>Dashboard</span>
                        </button>

                        <button
                            className={`sidebar-nav-item ${activeSection === "weather-cities"
                                    ? "active"
                                    : ""
                                }`}
                            onClick={() =>
                                onNavigate("weather-cities")
                            }
                        >
                            <span className="sidebar-nav-icon">
                                ◉
                            </span>

                            <span>Weather Cities</span>
                        </button>

                        <button
                            className={`sidebar-nav-item ${activeSection === "analytics"
                                    ? "active"
                                    : ""
                                }`}
                            onClick={() =>
                                onNavigate("analytics")
                            }
                        >
                            <span className="sidebar-nav-icon">
                                ◫
                            </span>

                            <span>Analytics</span>
                        </button>
                    </div>

                   
                </nav>

                <div className="sidebar-bottom">
                    <div className="sidebar-status">
                        <span className="status-dot"></span>

                        <div>
                            <strong>
                                System Online
                            </strong>

                            <small>
                                Weather API connected
                            </small>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;