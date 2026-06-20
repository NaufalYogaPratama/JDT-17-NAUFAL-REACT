import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./protectedRoutes";
import Login from "../container/Login";
import Layout from "../components/layout";
import Home from "../container/Homepage";
import CvPage from "../pages/CvPage";
import Todo from "../container/Todo";
import Movie from "../container/Movies";
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
        path: "/",
        element: <Layout />,
        children: [
          {
            element: <Home />,
            index: true,
          },
          {
            path: "/cv-page",
            element: <CvPage />,
          },
          {
            path: "/todo",
            element: <Todo />,
          },
          {
            path: "/movie-page",
            element: <Movie />,
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