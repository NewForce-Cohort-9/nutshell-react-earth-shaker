import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
    const navigate = useNavigate();
    const currentUser = localStorage.getItem("nutshell_user");

    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link className="navbar-link" to="/home">Home</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/news">News</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/events">Events</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/profile">My Profile</Link>
            </li>
            {currentUser && (
                <li className="navbar-item navbar-logout">
                    <button
                        className="navbar-link"
                        onClick={() => {
                            localStorage.removeItem("nutshell_user");
                            navigate("/login", { replace: true });
                        }}
                    >
                        Logout
                    </button>
                </li>
            )}
        </ul>
    );
};
