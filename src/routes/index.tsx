import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./protectedRoutes";
import Login from "../container/Login";
import Layout from "../components/layout";
import Home from "../container/Homepage";
import CvPage from "../container/CV";
import Todo from "../container/Todo";
import MoviePage from "../container/Movies";
import MovieDetail from "../container/MovieDetail";

export const routes = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cv-page",
        element: <CvPage />,
      },
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            element: <Home />,
            index: true,
          },
          {
            path: "/todo",
            element: <Todo />,
          },
          {
            path: "/movie-page",
            element: <MoviePage />,
          },
          {
            path: "/movie/:id",
            element: <MovieDetail />,
          },
        ],
      },
    ],
  },
]);