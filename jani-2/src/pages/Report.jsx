import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from '@supabase/supabase-js';
import { useQueryClient } from "@tanstack/react-query";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Report() {
    const queryClient = useQueryClient();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [description, setDescription] = useState("");
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const fileInputRef = useRef(null);

    const POLLUTION_TYPES = ["Air", "Water", "Waste", "Noise"];
    const MAX_FILE_SIZE_MB = 3;
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

    const bgDark = "#123524";
    const accentDark = "#3E7B27";
    const accentLight = "#85A947";
    const textLight = "#EFE3C2";

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!ALLOWED_TYPES.includes(file.type)) {
            setErrorMessage("Only JPG and PNG images are allowed.");
            return;
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setErrorMessage(`Image size must be less than ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }

        setErrorMessage("");
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const toggleType = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type]
        );
    };

    const handleSubmit = async () => {
        if (!image) {
            setErrorMessage("Please upload an image of the pollution.");
            return;
        }

        setLoading(true);
        setStatus("locating");
        setErrorMessage("");

        if (!navigator.geolocation) {
            setErrorMessage("Geolocation is not supported by your browser.");
            setLoading(false);
            setStatus("idle");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    setStatus("submitting");

                    const fileExt = image.name.split('.').pop();
                    const fileName = `${Date.now()}_${Math.random().toString(10)}.${fileExt}`;
                    const filePath = `${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from("jani-images")
                        .upload(filePath, image)



                    if (uploadError) throw uploadError

                    const reportData = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        image: filePath,
                        description,
                        types: selectedTypes,
                        timestamp: new Date().toISOString(),
                    };
                    const { error: dbError } = await supabase
                        .from("Jani")
                        .insert({
                            latitude: reportData.latitude,
                            longitude: reportData.longitude,
                            public_image_url: reportData.image,
                            description: reportData.description,
                        })
                    queryClient.invalidateQueries({ queryKey: ["reports"] });
                    if (dbError) throw dbError

                    console.log("Report Submitted Successfully:", reportData);
                    setStatus("success");
                } catch (error) {
                    console.error("Submission error:", error);
                    setErrorMessage(error.message || "Failed to submit report. Please try again.");
                    setStatus("idle");
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                setErrorMessage("Unable to retrieve your location. Please enable location services.");
                setLoading(false);
                setStatus("idle");
            }
        );
    };

    const resetForm = () => {
        setImage(null);
        setPreview(null);
        setDescription("");
        setSelectedTypes([]);
        setStatus("idle");
        setErrorMessage("");
    };

    return (
        <div style={{ backgroundColor: bgDark, color: textLight }} className="min-h-screen font-sans flex flex-col items-center py-16 px-4 relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-[#85A947] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[35vw] h-[35vw] bg-[#3E7B27] rounded-full mix-blend-multiply filter blur-[100px] opacity-25 animate-blob animation-delay-2000"></div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-2xl relative z-10">
                <div className="text-center mb-10">
                    <motion.h1 className="text-4xl md:text-5xl font-black mb-3 gradient-text" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                        Report Pollution
                    </motion.h1>
                    <motion.p className="text-lg opacity-80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        Help us track pollution in your community.
                    </motion.p>
                </div>

                {status === "success" ? (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="glass-dark p-10 rounded-3xl text-center shadow-2xl border border-[#85A947]">
                        <motion.div className="w-24 h-24 bg-gradient-to-br from-[#85A947] to-[#6d8c3a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}>
                            <span className="text-5xl text-[#123524]">✓</span>
                        </motion.div>
                        <h2 className="text-3xl font-black mb-3 gradient-text">Report Submitted!</h2>
                        <p className="opacity-80 mb-8 text-lg">Thank you for helping keep our environment clean.</p>
                        <motion.button onClick={resetForm} className="px-8 py-3.5 rounded-full font-bold text-lg text-[#123524] bg-[#EFE3C2] shadow-lg" whileHover={{ scale: 1.05, boxShadow: "0 12px 32px rgba(133, 169, 71, 0.3)" }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            Submit Another Report
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div className="space-y-7" variants={fadeInUp} initial="hidden" animate="visible">
                        <motion.div className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer glass-dark ${errorMessage ? 'border-red-500/50' : 'border-[#85A947]/40 hover:border-[#85A947]/70'}`} onClick={() => fileInputRef.current?.click()} whileHover={{ scale: 1.01, boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)" }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                            <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/png, image/jpeg, image/jpg" className="hidden" />
                            {preview ? (
                                <div className="relative group">
                                    <img src={preview} alt="Preview" className="max-h-80 mx-auto rounded-xl shadow-lg" />
                                    <motion.button onClick={(e) => { e.stopPropagation(); setImage(null); setPreview(null); }} className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm text-white p-2.5 rounded-full hover:bg-red-600 transition shadow-lg" whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>✕</motion.button>
                                </div>
                            ) : (
                                <div className="py-12">
                                    <motion.span className="text-6xl block mb-4" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>📷</motion.span>
                                    <p className="font-semibold text-xl mb-2">Tap to upload photo</p>
                                    <p className="text-sm opacity-60">Max 3MB • JPG, PNG</p>
                                </div>
                            )}
                        </motion.div>

                        <div>
                            <label className="block text-base font-bold mb-4 opacity-90">Pollution Type (Optional)</label>
                            <div className="flex flex-wrap gap-3">
                                {POLLUTION_TYPES.map((type) => (
                                    <motion.button key={type} onClick={() => toggleType(type)} className={`px-6 py-3 rounded-full text-base font-semibold border-2 transition-all ${selectedTypes.includes(type) ? "bg-[#85A947] text-[#123524] border-[#85A947] shadow-lg" : "bg-transparent text-[#EFE3C2] border-[#EFE3C2]/30 hover:border-[#85A947]"}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                                        {type}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-base font-bold mb-3 opacity-90">Description (Optional)</label>
                            <motion.textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={200} placeholder="Describe what you see..." className="w-full glass-dark border-2 border-[#85A947]/30 rounded-2xl p-5 text-[#EFE3C2] placeholder-white/30 focus:outline-none focus:border-[#85A947] transition-all resize-none h-36" whileFocus={{ scale: 1.01 }} />
                            <div className="text-right text-sm opacity-50 mt-2">{description.length}/200</div>
                        </div>

                        <AnimatePresence>
                            {errorMessage && (
                                <motion.div initial={{ opacity: 0, height: 0, y: -10 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -10 }} transition={{ duration: 0.3 }} className="text-red-400 text-sm text-center bg-red-900/20 p-4 rounded-xl border border-red-500/30 backdrop-blur-sm">
                                    {errorMessage}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button onClick={handleSubmit} disabled={loading || !image} style={{ backgroundColor: accentLight, color: bgDark }} className={`w-full py-4.5 rounded-full font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${loading || !image ? "opacity-50 cursor-not-allowed" : ""}`} whileHover={!(loading || !image) ? { scale: 1.02, boxShadow: "0 16px 48px rgba(133, 169, 71, 0.4)" } : {}} whileTap={!(loading || !image) ? { scale: 0.98 } : {}} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            {loading ? (
                                <>
                                    <motion.div className="w-6 h-6 border-3 border-[#123524] border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}></motion.div>
                                    {status === "locating" ? "Getting Location..." : "Submitting..."}
                                </>
                            ) : (
                                <span className="flex items-center gap-2">Report Pollution<span className="text-xl">→</span></span>
                            )}
                        </motion.button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}