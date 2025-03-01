import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <NavLink to="/">#VANLIFE</NavLink>
            <nav>
                <NavLink to="/host">Host</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/vans">Vans</NavLink>
            </nav>
        </header>
    );
}
