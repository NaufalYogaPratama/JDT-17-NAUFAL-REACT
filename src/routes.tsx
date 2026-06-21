import { createBrowserRouter } from "react-router";
import Home from "./container/Homepage";
import CvPage from "./container/CV";
import Todo from "./container/Todo";
import Movie from "./container/Movies";
import MovieDetail from "./container/MovieDetail";
import Login from "./container/Login";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
  {
    path: "/login",
    element: <Login />,
  },
]);