import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Download,
  CreditCard,
  CheckCircle,
  Whatsapp,
} from "lucide-react";
import { usePaystackPayment } from "react-paystack";

const App = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: 500000, // 5000 NGN in kobo
    publicKey: "pk_test_your_public_key_here", // Placeholder
  };

  const onSuccess = (reference) => {
    console.log(reference);
    setIsSubscribed(true);
    // In a real app, the webhook will handle the backend update,
    // but we can poll the backend here to confirm.
  };

  const onClose = () => {
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="container py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Shield className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold">
            ViewOnce<span className="text-primary">Saver</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#features" className="hover:text-primary transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-primary transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-primary transition-colors">
            FAQ
          </a>
        </div>
        <button className="btn-primary">Get Started</button>
      </nav>

      {/* Hero Section */}
      <section className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Never Lose a <span className="gradient-text">View-Once</span>{" "}
            Message Again.
          </h1>
          <p className="text-text-secondary text-xl mb-10 max-w-2xl mx-auto">
            The ultimate companion for WhatsApp. Automatically save view-once
            photos and videos to your private cloud. Secure, fast, and reliable.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="glass p-1 pl-4 flex items-center gap-2 w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none outline-none flex-1 text-white py-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={() => {
                  if (email) initializePayment(onSuccess, onClose);
                  else alert("Please enter email");
                }}
                className="btn-primary"
              >
                Start Saving <Zap size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="container">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap />,
              title: "Instant Save",
              desc: "Messages are captured the moment they arrive, before they disappear.",
            },
            {
              icon: <Download />,
              title: "Direct Download",
              desc: "Download media directly to your gallery in full resolution.",
            },
            {
              icon: <Shield />,
              title: "Secure & Private",
              desc: "Your data is encrypted and only accessible by you.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="glass p-8 hover:transform hover:-translate-y-2 transition-all cursor-default"
            >
              <div className="w-14 h-14 bg-secondary/20 text-primary rounded-2xl flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-text-secondary">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container text-center">
        <h2 className="text-4xl font-bold mb-16">
          Simple, Transparent <span className="text-primary">Pricing</span>
        </h2>
        <div className="max-w-sm mx-auto glass p-10 border-primary/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-black px-4 py-1 font-bold text-sm transform rotate-45 translate-x-10 translate-y-4">
            POPULAR
          </div>
          <h3 className="text-2xl font-bold mb-2">Premium Access</h3>
          <div className="flex justify-center items-baseline gap-1 my-6">
            <span className="text-4xl font-bold">₦5,000</span>
            <span className="text-text-secondary">/ month</span>
          </div>
          <ul className="text-left space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <CheckCircle className="text-primary" size={18} /> Unlimited Saves
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-primary" size={18} /> HD Video
              Support
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-primary" size={18} /> 24/7 Priority
              Support
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-primary" size={18} /> No
              Advertisements
            </li>
          </ul>
          <button
            onClick={() => {
              if (email) initializePayment(onSuccess, onClose);
              else alert("Please enter email");
            }}
            className="btn-primary w-full justify-center py-4 text-lg"
          >
            Upgrade Now <CreditCard size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-10 border-t border-white/10 text-center text-text-secondary">
        <p>&copy; 2026 ViewOnce Saver. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
