import { Link } from "react-router-dom";
import SearchCityInput from "../../components/SearchCityInput";
import { BiHomeAlt } from "react-icons/bi";

const NavBar = () => {
  return (
    <nav
      style={{
        background: "#1e213a",
        padding: "5px 15px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Link to="/">
        <BiHomeAlt size={30} color="#fff" />
      </Link>
      <SearchCityInput />
    </nav>
  );
};

export default NavBar;
