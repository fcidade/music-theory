import { Link } from "react-router-dom";

export const Navbar = () => {
  return (<nav className="border-b border-b-slate-900/10 py-4 px-4">
    <Link to={'/'}>
      Rudiments
    </Link>
  </nav>);
};
