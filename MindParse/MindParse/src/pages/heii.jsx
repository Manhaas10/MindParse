

import { useEffect, useState } from "react";
import Header from "@/components/Header.jsx";
import Home from "@/components/Home.jsx";
import Features from "@/components/Features.jsx";
import AuthSection from "@/components/AuthSection.jsx";
import LoginModal from "@/components/LoginModal.jsx";
import RegisterModal from "@/components/RegistarModal.jsx";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const Heii = ()=> {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    
useEffect(() => {
    if (theme === "dark") {
       toggleTheme();
    }
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
}, [theme]);

const navigate = useNavigate();
    const handleLogin = () => {
        if (theme === "dark") {
       toggleTheme();
    }
        setIsLoginOpen(true);
        setIsRegisterOpen(false);
    };
    const handleRegister = () => {
        if (theme === "dark") {
       toggleTheme();
    }
        setIsRegisterOpen(true);
        setIsLoginOpen(false);
    };
    const handleGetstarted = () => {
        if (theme === "dark") {
       toggleTheme();
    }
        setIsRegisterOpen(true);
    };
    const switchtoLogin = () => {
        if (theme === "dark") {
       toggleTheme();
    }
        setIsLoginOpen(true);
        setIsRegisterOpen(false);
    };
    const switchtoRegister = () => {
        if (theme === "dark") {
       toggleTheme();
    }
        setIsRegisterOpen(true);
        setIsLoginOpen(false);
    };

    return (
        <div className="min-h-screen bg-white">
            <Header onLogin={handleLogin} onRegister={handleRegister}/>
            <main>
                <div id="home">
                    <Home onGetStarted={handleGetstarted} />
                </div>
                <div id="features">
                    <Features />    
                    </div>
                <AuthSection onLogin={handleLogin} onRegister={handleRegister}/>  
            </main>
            {/* fOOTER */}
             <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold">MindParse</span>
          </div>
          <p className="text-gray-400">
            Transform your documents with AI-powered intelligence
          </p>
        </div>
      </footer>
      {/* Modals */}
            <LoginModal 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)} 
                onSwitchToRegister={switchtoRegister} 
            />
            <RegisterModal 
                isOpen={isRegisterOpen} 
                onClose={() => setIsRegisterOpen(false)} 
                onSwitchToLogin={switchtoLogin} 
            />

        </div>
    )

}

export default Heii;
