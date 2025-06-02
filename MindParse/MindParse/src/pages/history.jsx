import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Brain, PenTool, FileText, History, Settings, User, LogOut, Menu, X, Moon, Sun, Trash2, Calendar } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { HelpCircle } from "lucide-react";
const HistoryPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      type: "quiz",
      title: "Mathematics Quiz",
      fileName: "calculus_notes.pdf",
      timestamp: "2024-01-15 14:30",
      score: "8/10 (80%)",
      difficulty: "Medium"
    },
    {
      id: 2,
      type: "summary",
      title: "Research Paper Summary",
      fileName: "ai_trends_2024.pdf",
      timestamp: "2024-01-15 10:15",
      wordCount: "245 words",
      difficulty: null
    },
    {
      id: 3,
      type: "quiz",
      title: "History Quiz",
      fileName: "world_war_2.docx",
      timestamp: "2024-01-14 09:15",
      score: "6/10 (60%)",
      difficulty: "Hard"
    },
    {
      id: 4,
      type: "summary",
      title: "Science Article Summary",
      fileName: "quantum_physics.txt",
      timestamp: "2024-01-12 16:45",
      wordCount: "180 words",
      difficulty: null
    },
    {
      id: 5,
      type: "quiz",
      title: "Science Quiz",
      fileName: "physics_basics.txt",
      timestamp: "2024-01-12 16:45",
      score: "9/10 (90%)",
      difficulty: "Easy"
    }
  ]);

  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const userName = "John Doe";

  const handleDeleteItem = (id) => {
    setHistoryItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item Deleted",
      description: "History item has been removed successfully.",
    });
  };

  const handleClearAllHistory = () => {
    setHistoryItems([]);
    toast({
      title: "History Cleared",
      description: "All browsing history has been cleared.",
    });
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const sidebarItems = [
    { icon: Brain, label: "Dashboard", href: "/dashboard" },
    { icon: PenTool, label: "Quiz Generator", href: "/quiz" },
    { icon: FileText, label: "Content Summarizer", href: "/summarizer" },
    { icon: HelpCircle, label: "PDF Questions", href: "/pdf-questions" },
    { icon: History, label: "History", href: "/history", active: true  },
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
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Browsing History
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                View and manage your document processing history
              </p>
            </div>

            {/* Clear All Button */}
            <div className="mb-6">
              <Button
                onClick={handleClearAllHistory}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
                disabled={historyItems.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All History
              </Button>
            </div>

            {/* History Items */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                  <Calendar className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {historyItems.length > 0 
                    ? `${historyItems.length} items in your history`
                    : "No history items found"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {historyItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">Your browsing history is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {historyItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center flex-1">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                            item.type === 'quiz' 
                              ? 'bg-green-100 dark:bg-green-900' 
                              : 'bg-blue-100 dark:bg-blue-900'
                          }`}>
                            {item.type === 'quiz' ? (
                              <PenTool className={`h-5 w-5 ${
                                item.type === 'quiz' 
                                  ? 'text-green-600 dark:text-green-400' 
                                  : 'text-blue-600 dark:text-blue-400'
                              }`} />
                            ) : (
                              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                              {item.difficulty && (
                                <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                                  {item.difficulty}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                              {item.fileName}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span>{item.timestamp}</span>
                              {item.score && <span className="font-medium">{item.score}</span>}
                              {item.wordCount && <span>{item.wordCount}</span>}
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleDeleteItem(item.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
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

export default HistoryPage;
