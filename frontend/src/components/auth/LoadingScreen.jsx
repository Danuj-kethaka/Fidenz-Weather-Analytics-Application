function LoadingScreen() {
    return (
        <div className="loading-screen">
            <div className="loading-brand">
                <div className="loading-logo">☁</div>

                <h2>Fidenz Weather</h2>
            </div>

            <div className="spinner"></div>

            <p>Preparing your weather dashboard...</p>
        </div>
    );
}

export default LoadingScreen;