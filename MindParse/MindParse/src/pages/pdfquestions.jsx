import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Brain, FileText, PenTool, User, Settings, LogOut, History, Menu, X, Moon, Sun, HelpCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/contexts/ThemeContext";
import PDFQuestionGenerator from "@/components/pdfqgen";

const PDFQuestions = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [currentQuestions, setCurrentQuestions] = useState(null);
    const [showNewQuestions, setShowNewQuestions] = useState(false);
  const userName = "Sahnam"; // Mock user name

  const handleLogout = () => {
    console.log("Logout clicked");
    // TODO: Implement actual logout logic
  };
  const previousQuestions = [
    { 
      id: 1, 
      title: "Physics Concepts", 
      fileName: "physics_fundamentals.pdf", 
      date: "1 day ago", 
      difficulty: "Medium",
      questionCount: 15
    },
    { 
      id: 2, 
      title: "History Questions", 
      fileName: "world_history.pdf", 
      date: "2 days ago", 
      difficulty: "Hard",
      questionCount: 20
    },
    { 
      id: 3, 
      title: "Math Problems", 
      fileName: "calculus_basics.pdf", 
      date: "1 week ago", 
      difficulty: "Easy",
      questionCount: 12
    },
  ];
    const handleNewQuestions = () => {
    setCurrentQuestions(null);
    setShowNewQuestions(true);
  };
    const handleSelectPreviousQuestions = (questions) => {
    // Mock loading previous questions with proper structure
    const mockQuestions = {
      title: questions.title,
      fileName: questions.fileName,
      difficulty: questions.difficulty,
      questions: Array.from({ length: questions.questionCount }, (_, i) => ({
        id: i + 1,
        question: `Question ${i + 1} from ${questions.fileName}: What is the main concept discussed in this ${questions.difficulty.toLowerCase()} level topic?`,
        answer: `This is the answer to question ${i + 1}. It provides detailed explanation about the concept covered in the PDF document.`,
        difficulty: questions.difficulty
      })),
      generatedAt: questions.date
    };
    setCurrentQuestions(mockQuestions);
    setShowNewQuestions(false);
  };
  const sidebarItems = [
    { icon: Brain, label: "Dashboard", href: "/dashboard" },
    { icon: PenTool, label: "Quiz Generator", href: "/quiz" },
    { icon: FileText, label: "Content Summarizer", href: "/summarizer" },
    { icon: HelpCircle, label: "PDF Questions", href: "/pdf-questions", active: true },
    { icon: History, label: "History", href: "/history" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];
  const handleQuestionsGenerated = (newQuestions) => {
    setCurrentQuestions(newQuestions);
    setShowNewQuestions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 ">
            {/* /* Logo and Mobile Menu */ }
                  <div className="flex items-center ">
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="md:hidden mr-2"
                    >
                    {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                    
                    <div className="flex items-center ">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      MindParse
                    </span>
                    </div>
                  </div>

                 
                  <div className="flex justify-start w-0">
                  <div className="flex items-center space-x-4">
                    {/* Dark Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
                <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>

              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={userName} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      j@example.com
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
         <aside className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative z-40 w-64 h-screen bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 transition-all duration-200 ease-in-out`}>
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  item.active
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Previous PDF Questions Section */}
          <div className="p-4">
            <div className="mb-4">
              <Button
                onClick={handleNewQuestions}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                New Questions
              </Button>
            </div>
            
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Previous Questions</h3>
            <div className="space-y-2">
              {previousQuestions.map((questions) => (
                <button
                  key={questions.id}
                  onClick={() => handleSelectPreviousQuestions(questions)}
                  className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{questions.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{questions.date}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="inline-block px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">
                      {questions.difficulty}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {questions.questionCount} questions
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {currentQuestions ? (
            <div className="max-w-4xl mx-auto p-6">
              <div className="mb-6">
                <Button
                  onClick={() => setCurrentQuestions(null)}
                  variant="outline"
                  className="mb-4"
                >
                  ← Back to Generator
                </Button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentQuestions.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  From: {currentQuestions.fileName} • {currentQuestions.difficulty} Level
                </p>
              </div>
              
              <div className="space-y-4">
                {currentQuestions.questions.map((q) => (
                  <div key={q.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      Q{q.id}: {q.question}
                    </h3>
                    <details className="mt-3">
                      <summary className="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        Show Answer
                      </summary>
                      <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
                        <p className="text-gray-700 dark:text-gray-300">{q.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          ) : showNewQuestions ? (
            <PDFQuestionGenerator onQuestionsGenerated={handleQuestionsGenerated} />
          ) : (
            <div className="max-w-2xl mx-auto p-6 text-center mt-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">PDF Question Generator</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Select previous questions from the sidebar or generate new ones
              </p>
              <Button
                onClick={handleNewQuestions}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3"
              >
                Generate New Questions
              </Button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default PDFQuestions;
