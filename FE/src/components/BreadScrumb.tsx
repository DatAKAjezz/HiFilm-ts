import React, { useMemo } from 'react';
import { Link, useLocation, useParams } from "react-router-dom";
import "../styles/BreadScrumb.css";

interface BreadcrumbItem {
  label: string;
  path: string;
}

const BreadScrumb: React.FC = () => {
  const location = useLocation();
  const { ep, sep } = useParams();

  const breadcrumbs = useMemo(() => {
    const pathnames = location.pathname.split('/').filter(x => x);
    
    const items: BreadcrumbItem[] = pathnames.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      path: `/${pathnames.slice(0, index + 1).join('/')}`
    }));

    if (ep && sep) {
      if (items.length >= 2) {
        items[items.length - 2] = {
          label: `Tập ${items[items.length - 1].label} _ Server ${items[items.length - 2].label}`,
          path: items[items.length - 1].path
        };
      }
    }
    items.pop();

    return items;
  }, [location.pathname, ep, sep]);

  return (
    <nav className="bread-scrumb">
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        Trang chủ
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <span key={index}>
          {" > "}
          <Link 
            style={{ textDecoration: "none", color: index != breadcrumbs.length - 1 ? 'cyan' : "grey" }} 
            to={crumb.path}
          >
            {crumb.label}
          </Link>
        </span>
      ))}
    </nav>
  );
};

export default BreadScrumb;