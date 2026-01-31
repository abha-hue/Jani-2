import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../Context/authcontext/Auth';
import { doSignOut } from '../Firebase/auth';

const Navigation = () => {
    const navigate = useNavigate();
    const { userLogged, user } = useAuth();

    // Color palette
    const BG_DARK = "#123524";
    const TEXT_LIGHT = "#EFE3C2";
    const ACCENT = "#85A947";
    const ACTIVE_BG = "#3E7B27";

    const navigationLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Report", href: "/report/new" },
        { name: "Map", href: "/map" }
    ];

    const logout = async () => {
        try {
            await doSignOut();
            navigate("/");
        } catch (error) { }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky top-0 z-50 h-20 flex items-center px-8 shadow-2xl backdrop-blur-sm"
            style={{
                backgroundColor: ACTIVE_BG,
                color: TEXT_LIGHT,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
        >
            {/* LOGO/BRAND */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mr-8"
            >
                <Link to="/" className="text-2xl font-black tracking-tight gradient-text">
                    JANI
                </Link>
            </motion.div>

            {/* LEFT LINKS */}
            <div className="flex gap-2">
                {navigationLinks.map((link, index) => (
                    <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * (index + 1), duration: 0.4 }}
                    >
                        <NavLink
                            to={link.href}
                            className={({ isActive }) =>
                                `relative text-base font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 group
                                ${isActive
                                    ? "scale-105"
                                    : "opacity-90 hover:opacity-100"}`
                            }
                            style={({ isActive }) => ({
                                backgroundColor: isActive ? BG_DARK : "transparent",
                                color: TEXT_LIGHT,
                            })}
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-accent-light to-transparent transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                        </NavLink>
                    </motion.div>
                ))}
            </div>

            {/* RIGHT SIDE - AUTH BUTTONS */}
            <motion.div
                className="ml-auto flex items-center gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                {userLogged ? (
                    <>
                        <motion.span
                            className="text-base font-medium opacity-90"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Hello, <span className="font-bold" style={{ color: ACCENT }}>{user?.displayName || "User"}</span>
                        </motion.span>

                        <motion.button
                            onClick={logout}
                            className="btn-primary px-6 py-2.5 text-base font-bold rounded-full shadow-lg"
                            style={{
                                backgroundColor: ACCENT,
                                color: BG_DARK,
                            }}
                            whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(133, 169, 71, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            Logout
                        </motion.button>
                    </>
                ) : (
                    <>
                        <Link to="/signup">
                            <motion.button
                                className="btn-primary px-6 py-2.5 text-base font-bold rounded-full border-2 backdrop-blur-sm"
                                style={{
                                    backgroundColor: "transparent",
                                    borderColor: ACCENT,
                                    color: TEXT_LIGHT,
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: ACCENT,
                                    color: BG_DARK,
                                    boxShadow: '0 8px 24px rgba(133, 169, 71, 0.3)'
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                Register
                            </motion.button>
                        </Link>

                        <Link to="/signin">
                            <motion.button
                                className="btn-primary px-6 py-2.5 text-base font-bold rounded-full shadow-lg"
                                style={{
                                    backgroundColor: ACCENT,
                                    color: BG_DARK,
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 8px 24px rgba(133, 169, 71, 0.4)'
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                Login
                            </motion.button>
                        </Link>
                    </>
                )}
            </motion.div>
        </motion.nav>
    );
};

export default Navigation;
