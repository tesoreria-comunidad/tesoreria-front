import { Link } from "react-router";

export function Logo() {
  return (
    <Link to="/dashboard" aria-label="Ir al panel">
      <h2 className="font-semibold tracking-tighter text-2xl max-md:text-lg cursor-pointer">
        Mi Pelícano.
      </h2>
    </Link>
  );
}
