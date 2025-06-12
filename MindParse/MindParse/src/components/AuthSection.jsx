import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { useEffect } from "react";


const AuthSection = ({ onLogin, onRegister }) => {

  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Join thousands of users who are already transforming their documents with MindParse
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={onLogin}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-8 py-3 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Login
          </Button>
          
          <Button 
            onClick={onRegister}
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Create Account
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AuthSection;
