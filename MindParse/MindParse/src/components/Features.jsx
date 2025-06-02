
import { FileQuestion, FileText, Zap, Target } from "lucide-react";
import { PenTool, HelpCircle, Brain, Shield } from "lucide-react";
const Features = () => {
  const features = [
   {
      icon: PenTool,
      title: "Quiz Generator",
      description: "Transform your documents into interactive quizzes. Create personalized assessments that adapt to different difficulty levels and track your learning progress.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: FileText,
      title: "Content Summarizer", 
      description: "Get intelligent, concise summaries of lengthy documents. Our AI analyzes key concepts and presents them in digestible formats to save you time.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: HelpCircle,
      title: "PDF Question Generator",
      description: "Generate thoughtful questions from PDF documents at various difficulty levels. Perfect for study preparation and comprehension testing.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Leveraging advanced machine learning algorithms to understand context, extract meaning, and generate relevant educational content tailored to your needs.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process documents in seconds, not minutes. Our optimized AI pipeline ensures you get results quickly without compromising on quality or accuracy.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your documents are processed securely with enterprise-grade encryption. We respect your privacy and never store your sensitive information.",
      gradient: "from-red-500 to-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful AI Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your documents with cutting-edge AI technology
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                {/* Icon */}
                <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Feature highlights */}
                <div className="mt-6 flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Zap className="h-4 w-4 mr-1 text-yellow-500" />
                    Instant Results
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Target className="h-4 w-4 mr-1 text-green-500" />
                    AI-Powered
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;