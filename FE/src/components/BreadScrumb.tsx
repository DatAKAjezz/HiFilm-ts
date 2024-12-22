import React, { useMemo } from 'react';
import { Link, useLocation, useParams } from "react-router-dom";
import "../styles/BreadScrumb.css";
import { MdOutlineNavigateNext } from 'react-icons/md';
import { MovieDetails } from '../services/types';

interface BreadcrumbItem {
  label?: string;
  path: string;
}

interface MovieDetailsProps {
  movie: MovieDetails | undefined;
}


const BreadScrumb: React.FC<MovieDetailsProps> = ({movie}: {movie?: MovieDetails}) => {
  const location = useLocation();
  const { ep, sep } = useParams();

  const breadcrumbs = useMemo(() => {
    const pathnames = location.pathname.split('/').filter(x => x);
    
    const items: BreadcrumbItem[] = pathnames.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      path: `/${pathnames.slice(0, index + 1).join('/')}`
    }));

    if (items.length > 0){
        items[0].label = movie?.movie.name;
    }

    if (ep && sep && items.length > 2) {
        items[items.length - 2] = {
          label: `Tập ${movie?.episodes[Number(sep)].server_data[Number(ep)].name} | Server ${movie?.episodes[Number(sep)].server_name}`,
          path: items[items.length - 1].path
      }
      items.pop();
    }

    return items;
  }, [location.pathname, ep, sep, movie?.movie.name]);

  return (
    <nav className="bread-scrumb">
      <Link to="/" style={{ textDecoration: "none", color: "rgb(67, 173, 235)" }}>
        Coi phim
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <p className='abc' key={index}>
          &nbsp;<MdOutlineNavigateNext/>&nbsp;
          <Link 
            style={{ textDecoration: "none", color: index != breadcrumbs.length - 1 ? 'rgb(67, 173, 235)' : "grey" }} 
            to={crumb.path}
          >
            {crumb.label}
          </Link>
        </p>
      ))}
    </nav>
  );
};

export default BreadScrumb;