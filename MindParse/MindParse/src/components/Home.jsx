import { Button } from "@/components/ui/button";
import { Brain, ArrowRight } from "lucide-react";



const Home = ({ onGetStarted }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20"></div>

      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo and branding */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="ml-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MindParse
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Turn documents into quizzes and summaries instantly
        </p>

        {/* Subtitle */}
        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          AI-powered document processing that transforms your files into interactive quizzes and intelligent summaries in seconds.
        </p>

        {/* CTA Button */}
        <Button
          onClick={onGetStarted}
          size="lg"
          className="items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Get Started
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Home;
