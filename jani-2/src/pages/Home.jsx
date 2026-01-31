// src/components/Home.jsx
import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Enhanced animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Accordion content variants
const contentVariants = {
  collapsed: {
    opacity: 0,
    height: 0,
    transition: {
      opacity: { duration: 0.2 },
      height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const faqs = [
    {
      q: "How does air pollution affect health?",
      a: "Air pollution increases risks of asthma, lung damage, heart disease, and reduces overall lifespan.",
    },
    {
      q: "Are children more affected by pollution?",
      a: "Children breathe more rapidly and their lungs are developing, making them more vulnerable.",
    },
    {
      q: "Why is water pollution dangerous?",
      a: "Contaminated water spreads diseases, affects organs, and can cause long-term neurological issues.",
    },
    {
      q: "Is noise pollution harmful?",
      a: "Chronic noise increases stress, disrupts sleep, and harms heart health.",
    },
  ];

  const features = [
    {
      icon: "📍",
      title: "Report Pollution",
      desc: "Submit pollution reports with photos and geolocation.",
      link: "/report/new",
    },
    {
      icon: "🗺️",
      title: "Pollution Map",
      desc: "See incidents around you on a clean and interactive map.",
      link: "/map",
    },
    {
      icon: "💚",
      title: "Health Impact",
      desc: "Understand how pollution affects your everyday life.",
      link: "/about",
    },
  ];

  // Colors
  const bgDark = "#123524";
  const accentDark = "#3E7B27";
  const accentLight = "#85A947";
  const textLight = "#EFE3C2";

  return (
    <div style={{ backgroundColor: bgDark, color: textLight }} className="min-h-screen font-sans">

      {/* HERO */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">

        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
          style={{ y: backgroundY }}
        >
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#3E7B27] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
          <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#85A947] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-[#123524] rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000"></div>
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.span
              className="inline-block py-2 px-4 rounded-full bg-white/5 border border-white/20 text-sm font-semibold tracking-wider text-[#85A947] backdrop-blur-md mb-6 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(133, 169, 71, 0.2)" }}
            >
              Environmental Awareness Platform
            </motion.span>

            <motion.h1
              className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#EFE3C2] via-white to-[#85A947] drop-shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              JANI
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-[#EFE3C2]/90 font-light max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Empowering communities to report pollution, track hotspots, and build a healthier future together.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-5 justify-center mt-12"
          >
            <motion.a
              href="/report/new"
              className="group relative px-10 py-4 bg-[#85A947] text-[#123524] rounded-full font-bold text-lg shadow-xl overflow-hidden"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: "0 16px 48px rgba(133, 169, 71, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Reporting
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </motion.a>

            <motion.a
              href="/map"
              className="group px-10 py-4 bg-transparent border-2 border-[#85A947]/50 text-[#EFE3C2] rounded-full font-bold text-lg backdrop-blur-sm hover:bg-[#85A947]/10 hover:border-[#85A947] transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: "0 16px 48px rgba(133, 169, 71, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Map
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl font-black mb-14 text-center gradient-text"
        >
          What You Can Do
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((f, i) => (
            <motion.a
              href={f.link}
              key={i}
              variants={scaleIn}
              custom={i * 0.1}
              style={{ backgroundColor: accentDark }}
              className="card group cursor-pointer block relative overflow-hidden"
              whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative z-10">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
                <p className="text-sm opacity-90 leading-relaxed mb-4">{f.desc}</p>
                <span
                  style={{ color: accentLight }}
                  className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all duration-300"
                >
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: "#0F2A1C" }} className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-black mb-10 text-center gradient-text"
          >
            How Pollution Affects You
          </motion.h2>

          <motion.div
            className="max-w-3xl mx-auto space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {faqs.map((f, index) => (
              <motion.div
                key={index}
                className="glass-dark rounded-xl overflow-hidden"
                variants={fadeInUp}
                custom={index * 0.1}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex justify-between items-center p-5 text-left font-semibold text-lg hover:bg-white/5 transition-colors duration-200"
                >
                  <span>{f.q}</span>
                  <motion.span
                    animate={{ rotate: openFAQ === index ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="text-2xl font-light"
                    style={{ color: accentLight }}
                  >
                    +
                  </motion.span>
                </motion.button>

                <AnimatePresence initial={false}>
                  {openFAQ === index && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={contentVariants}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 text-base opacity-90 leading-relaxed">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundColor: accentDark }}
          className="card p-14 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black mb-4">Make your community healthier.</h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Report pollution and help protect local environments.
            </p>

            <motion.a
              href="/report/new"
              style={{ backgroundColor: accentLight, color: bgDark }}
              className="inline-block px-10 py-4 rounded-full font-bold text-lg shadow-xl"
              whileHover={{
                scale: 1.08,
                boxShadow: "0 16px 48px rgba(133, 169, 71, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Start Reporting
            </motion.a>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
        </motion.div>
      </section>

      <footer className="py-8 text-center text-sm opacity-70 relative z-10 border-t border-white/10">
        © {new Date().getFullYear()} JANI — All Rights Reserved.
      </footer>
    </div>
  );
}