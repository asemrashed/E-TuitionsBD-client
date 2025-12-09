import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content">
            <h1 className="text-9xl font-bold text-primary">404</h1>
            <h2 className="text-4xl font-bold mt-4">Page Not Found</h2>
            <p className="text-lg mt-2 mb-8">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="btn btn-primary">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
