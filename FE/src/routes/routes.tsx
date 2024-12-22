import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SearchResult from "../pages/SearchResult";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import TopMovies from "../components/TopMovies";
import ErrorPage from "../pages/Error";
import Header from "../components/Header";
import Footer from "../components/Footer";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="all-container">
        <Header />
          <div className = 'main-content'>
            <Home />
            <TopMovies />
          </div> 
        <Footer />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/search",
    element: (
      <>
        <Header />
        <div className = 'main-content'>
          <SearchResult />
          <TopMovies />
        </div>
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/:slug",
    element: (
      <>
        <Header />
        <div className = 'main-content'>
          <MovieDetailsPage />
          <TopMovies />
        </div>
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/:slug/:ep/:sep",
    element: (
      <>
        <Header />
          <div className = 'main-content'>
            <MovieDetailsPage />
            <TopMovies />
          </div>
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default routes;
