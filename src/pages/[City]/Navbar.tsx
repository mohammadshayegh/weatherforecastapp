import { Link } from "react-router-dom";
import SearchCityInput from "../../components/SearchCityInput";
import { BiHomeAlt } from "react-icons/bi";
import styles from "./styles.module.css";

const NavBar = () => {
  return (
    <nav className={styles["navbar-container"]}>
      <div className={styles["navbar"]}>
        <Link to="/">
          <BiHomeAlt size={30} color="#fff" />
        </Link>
        <SearchCityInput />
      </div>
    </nav>
  );
};

export default NavBar;
