import { routes } from "@/routes";
import { Link } from "react-router";

export function Navbar() {
  return (
    <nav>
      <ul className="flex items-center justify-around">
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className="flex items-center gap-2 hover:underline"
            >
              {route.icon}
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
