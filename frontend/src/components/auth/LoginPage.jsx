import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginPage() {
    const { loginWithRedirect } = useAuth0();

    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            setError("");

            await loginWithRedirect({
                authorizationParams: {
                    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                    redirect_uri: window.location.origin,
                },
            });
        } catch (err) {
            console.error("Auth0 Login Error:", err);

            setError(
                err.message || "Login failed"
            );
        }
    };

    return (
        <main className="login-page">

            <div className="login-screen">

                {/* LEFT — LOGIN */}
                <section className="login-panel">

                    <div className="login-panel-inner">

                        <div className="login-brand">
                            <div className="login-brand-logo">
                                ☁
                            </div>

                            <div>
                                <strong>Fidenz Weather</strong>
                                <span>Analytics Platform</span>
                            </div>
                        </div>


                        <div className="login-heading">

                            <span className="login-eyebrow">
                                WEATHER INTELLIGENCE
                            </span>

                            <h1>
                                Welcome back.
                            </h1>

                            <p>
                                Access your weather analytics
                                dashboard and explore real-time
                                conditions across cities.
                            </p>

                        </div>


                        <div className="login-features">

                            <div className="login-feature">
                                <span>🌍</span>

                                <div>
                                    <strong>
                                        Global Weather
                                    </strong>

                                    <small>
                                        Monitor weather across
                                        multiple cities.
                                    </small>
                                </div>
                            </div>


                            <div className="login-feature">
                                <span>📊</span>

                                <div>
                                    <strong>
                                        Smart Analytics
                                    </strong>

                                    <small>
                                        Compare weather and
                                        comfort conditions.
                                    </small>
                                </div>
                            </div>


                            <div className="login-feature">
                                <span>🔐</span>

                                <div>
                                    <strong>
                                        Secure Access
                                    </strong>

                                    <small>
                                        Protected by Auth0
                                        authentication.
                                    </small>
                                </div>
                            </div>

                        </div>


                        <button
                            className="login-button"
                            onClick={handleLogin}
                        >
                            <span>
                                Login to Dashboard
                            </span>

                            <span className="login-button-arrow">
                                →
                            </span>
                        </button>


                        {error && (
                            <div className="login-error">
                                {error}
                            </div>
                        )}


                        <div className="login-security">
                            <span className="security-dot"></span>

                            <span>
                                Protected with Auth0 authentication
                            </span>
                        </div>

                    </div>

                </section>


                {/* RIGHT — FULL SCREEN IMAGE */}
                <section className="login-image">

                    <div className="login-image-overlay"></div>

                    <div className="login-image-content">

                        <div className="login-live-badge">
                            <span></span>
                            LIVE WEATHER INTELLIGENCE
                        </div>

                        <h2>
                            See the weather.
                            <br />
                            <span>Understand the data.</span>
                        </h2>

                        <p>
                            Turn real-time weather information
                            into clear insights and meaningful
                            comparisons.
                        </p>

                    </div>

                </section>

            </div>

        </main>
    );
}

export default LoginPage;