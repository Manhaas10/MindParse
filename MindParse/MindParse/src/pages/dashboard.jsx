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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const userName = "Sahnam"; // Mock user name

  const handleLogout = () => {
    console.log("Logout clicked");
    // TODO: Implement actual logout logic
  };

  const sidebarItems = [
    { icon: Brain, label: "Dashboard", href: "/dashboard", active: true },
    { icon: PenTool, label: "Quiz Generator", href: "/quiz" },
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                Welcome back, {userName.split(' ')[0]}!
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
                What would you like to accomplish today?
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Quiz Generator Card */}
              <Card className="group hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <PenTool className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    Quiz Generator
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    Transform your documents into interactive quizzes. Test knowledge and track progress with AI-generated questions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link to="/quiz">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3">
                      Generate Quiz
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Content Summarizer Card */}
              <Card className="group hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    Content Summarizer
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    Get concise, intelligent summaries of your documents. Save time with AI-powered content analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link to="/summarizer">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3">
                      Summarize Document
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* PDF Question Generator Card */}
              <Card className="group hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <HelpCircle className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    PDF Questions
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    Generate intelligent questions from PDF documents. Perfect for studying and comprehension testing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link to="/pdf-questions">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3">
                      Generate Questions
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity Section */}
            <Card className="animate-fade-in bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                  <History className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="dark:text-gray-300 transition-colors duration-300">
                  Your latest document processing activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                        <PenTool className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Mathematics Quiz</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Generated from calculus_notes.pdf</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">2 hours ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Research Paper Summary</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Summarized ai_trends_2024.pdf</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">1 day ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                        <PenTool className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">History Quiz</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Generated from world_war_2.docx</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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

export default Dashboard;