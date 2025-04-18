import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Conform from "./pages/Conform";
import Multiple from "./pages/Multiple";
import Selection from "./components/ExpertContent/Selection";
import LearningOptions from "./components/ExpertContent/LearningOptions";
import DeckDetails from "./components/flaskcards/DeckDetails";

function App() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "990220425416-j6s1cg42i5jiivr282jfhfj8l5te2ufv.apps.googleusercontent.com"; // Your Google Client ID

  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App min-h-screen flex flex-col">
        <BrowserRouter>
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/con" element={<Conform />} />
              <Route path='/multiple' element={<Multiple />} />
              <Route path='/selection' element={<Selection />} />
              <Route path='/learning-options' element={<LearningOptions />} />
              <Route path="/deck/:deckId" element={<DeckDetails />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
