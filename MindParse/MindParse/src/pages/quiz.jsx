import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Brain, ArrowLeft, PenTool, FileText, History, Settings, User, LogOut, Menu, X, Moon, Sun, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import QuizGenerator from "@/components/quizgen";
import QuizDisplay from "@/components/quizdisplay";
import { useTheme } from "@/contexts/ThemeContext";
import { HelpCircle } from "lucide-react";
const Quiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNewQuiz, setShowNewQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const userName = "Sahnam";

  // Mock previous quizzes data with results
  const previousQuizzes = [
    { 
      id: 1, 
      title: "Mathematics Quiz", 
      fileName: "calculus_notes.pdf", 
      date: "2 hours ago", 
      difficulty: "Medium",
      score: 8,
      totalQuestions: 10,
      percentage: 80,
      completedAt: "2024-01-15 14:30"
    },
    { 
      id: 2, 
      title: "History Quiz", 
      fileName: "world_war_2.docx", 
      date: "1 day ago", 
      difficulty: "Hard",
      score: 6,
      totalQuestions: 10,
      percentage: 60,
      completedAt: "2024-01-14 09:15"
    },
    { 
      id: 3, 
      title: "Science Quiz", 
      fileName: "physics_basics.txt", 
      date: "3 days ago", 
      difficulty: "Easy",
      score: 9,
      totalQuestions: 10,
      percentage: 90,
      completedAt: "2024-01-12 16:45"
    },
  ];

  const handleQuizGenerated = (quiz) => {
    console.log("Quiz generated:", quiz);
    setCurrentQuiz(quiz);
    setShowNewQuiz(false);
    setShowResults(false);
  };

  const handleBackToGenerator = () => {
    console.log("Back to quiz generator clicked");
    setCurrentQuiz(null);
    setShowNewQuiz(true);
    setShowResults(false);
    setQuizResults(null);
  };

  const handleNewQuiz = () => {
    setCurrentQuiz(null);
    setShowNewQuiz(true);
    setShowResults(false);
    setQuizResults(null);
  };

  const handleSelectPreviousQuiz = (quiz) => {
    // Show results for previous quiz
    const mockResults = {
      quiz: {
        title: quiz.title,
        difficulty: quiz.difficulty,
        questions: Array.from({ length: quiz.totalQuestions }, (_, i) => ({
          id: i + 1,
          question: `Question ${i + 1} from ${quiz.fileName}`,
          options: [
            `Option A for question ${i + 1}`,
            `Option B for question ${i + 1}`,
            `Option C for question ${i + 1}`,
            `Option D for question ${i + 1}`
          ],
          correctAnswer: Math.floor(Math.random() * 4)
        }))
      },
      answers: Object.fromEntries(
        Array.from({ length: quiz.totalQuestions }, (_, i) => [
          i + 1,
          Math.floor(Math.random() * 4)
        ])
      ),
      score: quiz.score,
      showResults: true
    };
    
    setQuizResults(mockResults);
    setCurrentQuiz(null);
    setShowNewQuiz(false);
    setShowResults(true);
  };

  const handleViewQuizDetails = (quiz) => {
    // Create a detailed view showing all questions and user answers
    const mockQuizWithAnswers = {
      title: quiz.title,
      difficulty: quiz.difficulty,
      questions: Array.from({ length: quiz.totalQuestions }, (_, i) => ({
        id: i + 1,
        question: `Question ${i + 1} from ${quiz.fileName}: What is the correct answer for this ${quiz.difficulty.toLowerCase()} level question?`,
        options: [
          `Option A for question ${i + 1}`,
          `Option B for question ${i + 1}`,
          `Option C for question ${i + 1}`,
          `Option D for question ${i + 1}`
        ],
        correctAnswer: Math.floor(Math.random() * 4)
      }))
    };

    const mockAnswers = Object.fromEntries(
      Array.from({ length: quiz.totalQuestions }, (_, i) => [
        i + 1,
        Math.floor(Math.random() * 4)
      ])
    );

    setCurrentQuiz(mockQuizWithAnswers);
    setQuizResults({
      quiz: mockQuizWithAnswers,
      answers: mockAnswers,
      score: quiz.score,
      showResults: true
    });
    setShowResults(true);
    setShowNewQuiz(false);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const sidebarItems = [
    { icon: Brain, label: "Dashboard", href: "/dashboard"},
    { icon: PenTool, label: "Quiz Generator", href: "/quiz", active: true  },
    { icon: FileText, label: "Content Summarizer", href: "/summarizer" },
    { icon: HelpCircle, label: "PDF Questions", href: "/pdf-questions" },
    { icon: History, label: "History", href: "/history" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
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
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Previous Quizzes Section */}
          <div className="p-4">
            <div className="mb-4">
              <Button
                onClick={handleNewQuiz}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                New Quiz
              </Button>
            </div>
            
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Previous Quizzes</h3>
            <div className="space-y-2">
              {previousQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{quiz.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{quiz.date}</p>
                  <div className="flex justify-between items-center mt-1 mb-2">
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                      {quiz.difficulty}
                    </span>
                    <span className={`text-xs font-medium ${
                      quiz.percentage >= 80 ? 'text-green-600 dark:text-green-400' :
                      quiz.percentage >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {quiz.score}/{quiz.totalQuestions} ({quiz.percentage}%)
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      onClick={() => handleSelectPreviousQuiz(quiz)}
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs py-1 h-7"
                    >
                      Results
                    </Button>
                    <Button
                      onClick={() => handleViewQuizDetails(quiz)}
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs py-1 h-7"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-12">
          {showResults && quizResults ? (
            <QuizDisplay 
              quiz={quizResults.quiz}
              initialAnswers={quizResults.answers}
              initialScore={quizResults.score}
              initialShowResults={true}
              onBackToGenerator={handleBackToGenerator}
            />
          ) : currentQuiz ? (
            <QuizDisplay 
              quiz={currentQuiz} 
              onBackToGenerator={handleBackToGenerator}
            />
          ) : showNewQuiz ? (
            <QuizGenerator onQuizGenerated={handleQuizGenerated} />
          ) : (
            <div className="max-w-2xl mx-auto p-6 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quiz Generator</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Select a previous quiz from the sidebar to view results or create a new one
              </p>
              <Button
                onClick={handleNewQuiz}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8 py-3"
              >
                Create New Quiz
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

export default Quiz;
