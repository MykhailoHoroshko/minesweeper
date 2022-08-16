import { Outlet } from "react-router-dom";
import { CustomLink } from "../../components/customLink/CustomLink";
import "./Layout.css";

export const Layout = () => {
  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <CustomLink to="/easy">Easy</CustomLink>
          </li>
          <li>
            <CustomLink to="/medium">Medium</CustomLink>
          </li>
          <li>
            <CustomLink to="/hard">Hard</CustomLink>
          </li>
          <li>
            <CustomLink to="/custom">Custom</CustomLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};
