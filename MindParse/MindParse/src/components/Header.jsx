import { Brain } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import React from "react";
const Header = ({onLogin,onRegister}) => {
    const {isOpen, setIsOpen} = useState(false);
    const scrollToSection = (section) => {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false);
    };
    return (           
        <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* logo */}
                 <div className="flex item-center">
                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <span className="ml-2 text-xl py-1 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    MindParse
                  </span>
                  </div>

                  {/* desktop navigation */}
                  <div className="hidden md:flex space-x-4">
                    <button 
                    onClick={() => scrollToSection("home")}
                    className="text-gray-700 hover:text-blue-600 transition-colors">
                      Home
                    </button>
                    <button 
                    onClick={() => scrollToSection("features")}
                    className="text-gray-700 hover:text-blue-600 transition-colors">
                      Features
                    </button>
                    <Button
                    onClick={onLogin}
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-colors">
                            Login
                    </Button>
                    <Button
                    onClick={onRegister}
                    variant="primary"
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-colors">
                            Register
                    </Button>
                  </div>
                  <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
                </div>
 {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-gray-600 hover:text-gray-900 transition-colors text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-gray-900 transition-colors text-left"
              >
                Features
              </button>
              <div className="flex flex-col space-y-2 pt-2">
                <Button 
                  onClick={onLogin}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Login
                </Button>
                <Button 
                  onClick={onRegister}
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        )}




                </div>
        </nav>
                    );

};
export default Header;