import "./assets/main.css";
import Notification from "./components/Notification";
import AppRoutes from "./routes";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Notification />
      <AppRoutes />
    </Provider>
  );
}

export default App;
