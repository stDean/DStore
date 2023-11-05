import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const BreadCrumb = ({ text }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Our Store</title>
      </Helmet>
      <div className="bg-white py-4 font-semibold text-center">
        <Link to="/">Home</Link> / <span className="font-normal">{text}</span>
      </div>
    </>
  );
};

export default BreadCrumb;
