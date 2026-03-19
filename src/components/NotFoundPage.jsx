import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container" style={{ textAlign: "center", padding: "6rem 1rem" }}>
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-slate-400 text-lg mb-6">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="inline-block bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-full font-medium transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
