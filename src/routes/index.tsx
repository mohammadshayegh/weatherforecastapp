import { RouterProvider, createBrowserRouter } from "react-router-dom";
import City from "../pages/[City]";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:city",
    element: <City />,
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
