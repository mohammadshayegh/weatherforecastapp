import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error404Page from "../pages/404";
import City from "../pages/City";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/city",
    element: <City />,
  },
  {
    path: "*",
    element: <Error404Page />,
  },
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
