import SearchCityInput from "../../components/SearchCityInput";

type NavBarProps = {
  setCoordination: (coordination: { lat: number; lon: number }) => void;
  defaultValue: string;
  loading?: boolean;
};

const NavBar = ({ setCoordination, defaultValue, loading }: NavBarProps) => {
  return (
    <nav
      style={{
        background: "#1f1f1f",
        padding: "5px 15px",
      }}
    >
      <SearchCityInput
        onCitySelect={setCoordination}
        defaultValue={defaultValue}
        loading={loading}
      />
    </nav>
  );
};

export default NavBar;
