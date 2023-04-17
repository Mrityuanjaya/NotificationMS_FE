import React from "react";
import { Link } from "react-router-dom";
function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">
                    Notification MS
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav">
                        <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/"
                        >
                            Admins
                        </Link>
                        <Link className="nav-link" to="/channels">
                            Channels
                        </Link>
                        <Link className="nav-link" to="/notifications">
                            Notifications
                        </Link>
                        <Link className="nav-link" to="/recipients">
                            Recipients
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
