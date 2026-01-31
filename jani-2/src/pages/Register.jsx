import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from "../Firebase/auth";
import { useAuth } from "../Context/authcontext/Auth";

const Register = () => {
    const navigate = useNavigate();
    const { userLogged } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    if (userLogged) {
        // If already logged in, redirect to home
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await doCreateUserWithEmailAndPassword(email, password);
            console.log("✅ User registered successfully!");
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.message);
        }

        setLoading(false);
    };

    const handleGoogleSignup = async () => {
        try {
            await doSignInWithGoogle();
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
                    Create Your Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password (min 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                    />

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </button>
                </form>

                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-2 text-gray-500 text-sm">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button
                    onClick={handleGoogleSignup}
                    className="w-full flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-50"
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="text-gray-700 font-medium">Sign Up with Google</span>
                </button>

                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-green-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
