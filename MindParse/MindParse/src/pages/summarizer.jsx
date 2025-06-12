import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Brain, ArrowLeft, PenTool, FileText, History, Settings, User, LogOut, Menu, X, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SummarizerGenerator from "@/components/sumgen";
import SummaryDisplay from "@/components/sumdisplay";
import { useTheme } from "@/contexts/ThemeContext";
import { HelpCircle } from "lucide-react";
import { MessageSquare } from "lucide-react";
import api from '@/api/axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Summarizer = () => {
  const [currentSummary, setCurrentSummary] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNewSummary, setShowNewSummary] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const userName = "John Doe";
const navigate = useNavigate();
  // Mock previous summaries data
  const previousSummaries = [
    { id: 1, title: "Research Paper Summary", fileName: "ai_trends_2024.pdf", date: "1 day ago", level: "Moderate" },
    { id: 2, title: "Business Report Summary", fileName: "quarterly_report.docx", date: "2 days ago", level: "Brief" },
    { id: 3, title: "Technical Guide Summary", fileName: "programming_guide.txt", date: "1 week ago", level: "Detailed" },
  ];
  

  const handleSummaryGenerated = (summary) => {
    setCurrentSummary(summary);
    setShowNewSummary(false);
  };

  const handleBackToGenerator = () => {
    setCurrentSummary(null);
    setShowNewSummary(true);
  };

  const handleNewSummary = () => {
    setCurrentSummary(null);
    setShowNewSummary(true);
  };

  const handleSelectPreviousSummary = (summary) => {
    // Mock loading previous summary
    const mockSummary = {
      title: `${summary.level} Summary`,
      fileName: summary.fileName,
      level: summary.level,
      content: `This is a previously generated ${summary.level.toLowerCase()} summary of ${summary.fileName}. The content has been processed and analyzed to provide key insights and important information from the original document.`,
      wordCount: 156,
      generatedAt: summary.date
    };
    setCurrentSummary(mockSummary);
    setShowNewSummary(false);
  };

  const handleLogout = () => {
    // Ensure theme is set to light (white mode) on logout
    if (theme === "dark") {
      toggleTheme();
    }
    navigate("/");
    console.log("Logout clicked");
    // TODO: Implement actual logout logic
  };

  const sidebarItems = [
    { icon: Brain, label: "Dashboard", href: "/dashboard"},
    { icon: PenTool, label: "Quiz Generator", href: "/quiz" },
    { icon: FileText, label: "Content Summarizer", href: "/summarizer", active: true  },
    { icon: HelpCircle, label: "PDF Questions", href: "/pdf-questions" },
    { icon: MessageSquare, label: "Doubt Solver", href: "/doubt-solver" },
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

          {/* Previous Summaries Section */}
          <div className="p-4">
            <div className="mb-4">
              <Button
                onClick={handleNewSummary}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                New Summary
              </Button>
            </div>
            
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Previous Summaries</h3>
            <div className="space-y-2">
              {previousSummaries.map((summary) => (
                <button
                  key={summary.id}
                  onClick={() => handleSelectPreviousSummary(summary)}
                  className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{summary.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{summary.date}</p>
                  <span className="inline-block px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded mt-1">
                    {summary.level}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-12">
          {currentSummary ? (
            <SummaryDisplay 
              summary={currentSummary} 
              onBackToGenerator={handleBackToGenerator}
            />
          ) : showNewSummary ? (
            <SummarizerGenerator onSummaryGenerated={handleSummaryGenerated} />
          ) : (
            <div className="max-w-2xl mx-auto p-6 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Content Summarizer</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Select a previous summary from the sidebar or create a new one
              </p>
              <Button
                onClick={handleNewSummary}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3"
              >
                Create New Summary
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

export default Summarizer;
