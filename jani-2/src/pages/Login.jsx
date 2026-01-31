import { memo, useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../Firebase/auth';
import { useAuth } from '../Context/authcontext/Auth';
import React from 'react';

const Login = () => {
  const navigate = useNavigate();
  const { userlogged } = useAuth();

  if (userlogged) {
    return <Navigate to="/about" replace />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [signingIn, setSigningIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signingIn) return;

    setSigningIn(true);
    setError(null);

    try {
      await doSignInWithEmailAndPassword(email, password);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setSigningIn(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (signingIn) return;
    setSigningIn(true);
    setError(null);

    try {
      const result = await doSignInWithGoogle();
      console.log(result.user.displayName);

      navigate("/");
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError(err.message);
    } finally {
      setSigningIn(false);
    }
  };



  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={signingIn}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {signingIn ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="text-center my-4 text-gray-500">or</div>

        <button
          onClick={handleGoogleSignIn}
          disabled={signingIn}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {signingIn ? "Signing in..." : "Sign in with Google"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default (Login);