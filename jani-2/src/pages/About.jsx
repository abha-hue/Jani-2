import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Colors (consistent with Home.jsx)
  const bgDark = "#123524";
  const accentDark = "#3E7B27";
  const accentLight = "#85A947";
  const textLight = "#EFE3C2";

  return (
    <div style={{ backgroundColor: bgDark, color: textLight }} className="min-h-screen font-sans relative overflow-hidden">

      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-[#3E7B27] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-[30%] right-[-10%] w-[35vw] h-[35vw] bg-[#85A947] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
      </motion.div>

      {/* 1. Mission Statement */}
      <section className="container mx-auto px-6 py-24 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-black mb-8 gradient-text"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Our Mission
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            JANI was created to empower communities to identify, report, and reduce pollution in their surroundings.
            <br />
            <span className="font-semibold text-[#85A947] inline-block mt-3">Our mission is simple:</span>{" "}
            make it easy for anyone to take action and protect the environment.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Why JANI Exists (The Problem) */}
      <section className="bg-[#0F2A1C] py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-black mb-10 text-center gradient-text">Why JANI Exists</h2>
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
            >
              <div className="space-y-4">
                {["Pollution often goes unreported", "Authorities rarely get enough real-time data", "Most people don't know how pollution affects their health"].map((item, i) => (
                  <motion.p
                    key={i}
                    className="flex items-start glass-dark p-4 rounded-lg"
                    variants={fadeInUp}
                    whileHover={{ x: 4, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)" }}
                  >
                    <span className="text-[#85A947] mr-3 text-xl">✖</span>
                    <span>{item}</span>
                  </motion.p>
                ))}
              </div>
              <div className="space-y-4">
                {["There is no simple app for people to report pollution quickly", "Communities lack tools to track environmental quality"].map((item, i) => (
                  <motion.p
                    key={i}
                    className="flex items-start glass-dark p-4 rounded-lg"
                    variants={fadeInUp}
                    whileHover={{ x: 4, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)" }}
                  >
                    <span className="text-[#85A947] mr-3 text-xl">✖</span>
                    <span>{item}</span>
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. What JANI Does (Your Solution) */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.h2 className="text-4xl font-black mb-4 gradient-text" variants={fadeInUp}>
            What JANI Does
          </motion.h2>
          <motion.p className="opacity-80 max-w-2xl mx-auto text-lg" variants={fadeInUp}>
            We bridge the gap between awareness and action.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            "Report pollution with photos + location",
            "Live pollution map visualization",
            "Learn about health impacts",
            "Verified data for authorities",
            "Community-driven environmental action"
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              style={{ backgroundColor: accentDark }}
              className="card p-7 rounded-xl shadow-lg text-center"
              whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(0, 0, 0, 0.3)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <p className="font-semibold text-lg leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. How JANI Works */}
      <section className="bg-[#0F2A1C] py-20 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-black mb-16 gradient-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            How It Works
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { step: "1", title: "See Pollution", desc: "Spot an issue in your area." },
              { step: "2", title: "Open JANI", desc: "Launch the app instantly." },
              { step: "3", title: "Submit Report", desc: "Take a photo, add details." },
              { step: "4", title: "Map Update", desc: "Visible to everyone instantly." },
              { step: "5", title: "Action", desc: "Community & authorities respond." }
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="w-44 group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#85A947] to-[#6d8c3a] text-[#123524] flex items-center justify-center text-3xl font-black mb-5 shadow-xl"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {s.step}
                </motion.div>
                <h3 className="font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Impact Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto glass-dark p-10 rounded-3xl border border-[#85A947]/30 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl font-black mb-10 text-center gradient-text">Why It Matters</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.ul className="space-y-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {[
                { icon: "🫁", text: "Air pollution reduces life expectancy" },
                { icon: "💧", text: "Water pollution spreads diseases" }
              ].map((item, i) => (
                <motion.li key={i} className="flex items-center text-lg" variants={fadeInUp}>
                  <span className="text-4xl mr-4">{item.icon}</span>
                  {item.text}
                </motion.li>
              ))}
            </motion.ul>
            <motion.ul className="space-y-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {[
                { icon: "🧠", text: "Noise pollution affects mental health" },
                { icon: "♻️", text: "Waste mismanagement harms ecosystems" }
              ].map((item, i) => (
                <motion.li key={i} className="flex items-center text-lg" variants={fadeInUp}>
                  <span className="text-4xl mr-4">{item.icon}</span>
                  {item.text}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </section>

      {/* 7. Our Values */}
      <section className="bg-[#0F2A1C] py-20 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-black mb-12 gradient-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            Our Values
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {["Transparency", "Community-driven change", "Environmental awareness", "Collaboration", "Accessibility"].map((val, i) => (
              <motion.span
                key={i}
                className="px-7 py-3.5 rounded-full border-2 border-[#85A947] text-[#EFE3C2] font-semibold text-base backdrop-blur-sm"
                variants={scaleIn}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#85A947",
                  color: "#123524",
                  boxShadow: "0 8px 24px rgba(133, 169, 71, 0.3)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {val}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. Future Goals */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <motion.h2
          className="text-4xl font-black mb-14 text-center gradient-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          Future Goals
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            "Collaboration with local authorities",
            "AI-based pollution detection",
            "Verified pollution reports",
            "Community challenges",
            "Educational partnerships",
            "Mobile app launch"
          ].map((goal, i) => (
            <motion.div
              key={i}
              className="flex items-center p-5 glass-dark rounded-xl"
              variants={fadeInUp}
              whileHover={{ x: 4, boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="text-3xl mr-4">🚀</span>
              <span className="font-semibold text-base">{goal}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 9. Call to Action */}
      <section className="py-24 text-center bg-gradient-to-t from-[#0F2A1C] to-[#123524] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-6"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6 gradient-text">Join the movement.</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">Help protect your neighborhood today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <motion.a
              href="/report/new"
              style={{ backgroundColor: accentLight, color: bgDark }}
              className="px-10 py-4 rounded-full font-bold text-lg shadow-xl"
              whileHover={{ scale: 1.08, boxShadow: "0 16px 48px rgba(133, 169, 71, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Start Reporting
            </motion.a>
            <motion.a
              href="/map"
              className="px-10 py-4 rounded-full font-bold text-lg border-2 border-[#85A947] text-[#EFE3C2] backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#85A947",
                color: "#123524",
                boxShadow: "0 16px 48px rgba(133, 169, 71, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Explore Map
            </motion.a>
          </div>
        </motion.div>
      </section>

      <footer className="py-8 text-center text-sm opacity-60 border-t border-white/10 relative z-10">
        © {new Date().getFullYear()} JANI — All Rights Reserved.
      </footer>
    </div>
  );
}
