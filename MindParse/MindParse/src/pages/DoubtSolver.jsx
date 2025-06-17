import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import ReactMarkdown from "react-markdown";
import { Brain, FileText, PenTool, User, Settings, LogOut, History, Menu, X, Moon, Sun, HelpCircle, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/contexts/ThemeContext";
import DoubtSolverGenerator from "@/components/DoubtSolverGenerator";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
const DoubtSolver = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [currentChat, setCurrentChat] = useState([]);
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const userName = "John Doe";
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, []);

  // useEffect(() => {
  //   const fetchHistory = async () => {
  //     if (!userEmail) return;

  //     try {
  //       const response = await api.get(`/doubt/history`, {
  //         params: { email: userEmail },
  //       });
  //       console.log("Fetched history:", response.data);
  //       setPreviousChats(response.data);
  //     } catch (error) {
  //       console.error("Error fetching history:", error);
  //     }
  //   };

  //   fetchHistory();
  // }, [userEmail]);

  useEffect(() => {
    const savedChat = localStorage.getItem("currentChat") || [];
    // console.log("Saved chat from localStorage:", savedChat);
    if (savedChat) {
      setCurrentChat(JSON.parse(savedChat));
    }
   
  }, []);

  const handleNewChat = () => {
    setCurrentChat(null);
    setShowNewChat(true);
  };

  const handleSelectPreviousChat = (chat) => {
    console.log("Selected previous chat:", chat);
    setCurrentChat(chat);
    setShowNewChat(false);
    localStorage.setItem("currentChat", JSON.stringify(chat));
  };

  const handleChatStarted = (newChat) => {
    setCurrentChat(newChat);
    setShowNewChat(false);
    localStorage.setItem("currentChat", JSON.stringify(newChat));
  };

  const handleLogout = () => {
    if (theme === "dark") toggleTheme();
    navigate("/");
  };
  const handleFollowUpSend = async () => {
    if (!followUpQuestion.trim() || !currentChat) return;

    setIsSending(true);

    const userMessage = {
      id: currentChat.messages.length + 1,
      type: "user",
      content: followUpQuestion,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...currentChat.messages, userMessage];

    try {
      const em = localStorage.getItem("userEmail");
      const params = new URLSearchParams();
      params.append("email", em || "");
      params.append("title", currentChat.title || "Follow-up Question");
      params.append("question", followUpQuestion);
      params.append("conversationId", currentChat.conversationId.toString());

      const response = await api.post("/doubt/ask", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });

      const assistantMessage = {
        id: userMessage.id + 1,
        type: "assistant",
        content: response.data,
        timestamp: new Date().toISOString(),
      };

      const updatedChat = {
        ...currentChat,
        messages: [...updatedMessages, assistantMessage],
      };

      setCurrentChat(updatedChat);
      localStorage.setItem("currentChat", JSON.stringify(updatedChat));
    } catch (error) {
      const errorMessage = {
        id: Date.now(),
        type: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        timestamp: new Date().toISOString(),
      };

      const updatedChat = {
        ...currentChat,
        messages: [...updatedMessages, errorMessage],
      };

      setCurrentChat(updatedChat);
      localStorage.setItem("currentChat", JSON.stringify(updatedChat));
    } finally {
      setFollowUpQuestion("");
      setIsSending(false);
    }
  };

  const sidebarItems = [
    { icon: Brain, label: "Dashboard", href: "/dashboard" },
    { icon: PenTool, label: "Quiz Generator", href: "/quiz" },
    { icon: FileText, label: "Content Summarizer", href: "/summarizer" },
    { icon: HelpCircle, label: "PDF Questions", href: "/pdf-questions" },
    { icon: MessageSquare, label: "Doubt Solver", href: "/doubt-solver", active: true },
    { icon: History, label: "History", href: "/history" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
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

      <div className="flex flex-1 h-[calc(100vh-4rem)] overflow-hidden">
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

          {/* Previous Chats Section */}
          <div className="p-4">
            <div className="mb-4">
              <Button
                onClick={handleNewChat}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                New Chat
              </Button>
            </div>
            
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Previous Chats</h3>
            <div className="space-y-2">
              {previousChats.slice(0,2).map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleSelectPreviousChat(chat)}
                  className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{chat.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{chat.question}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {chat.timestamp ? new Date(chat.timestamp).toLocaleDateString() : 'No date'}
                    </span>
                   
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
        <div className="flex flex-col flex-1">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 ">
          {currentChat ? (
            <div className="max-w-4xl mx-auto p-6">
              <div className="mb-6">
                <Button
                  onClick={() => setCurrentChat(null)}
                  variant="outline"
                  className="mb-4"
                >
                  ← Back to Doubt Solver
                </Button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentChat.title}
                </h1>
              </div>
              
              <div className="space-y-4 mb-6">
                {currentChat?.messages?.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl p-4 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                    }`}>
                     <div className={`${message.type === 'assistant' ? 'text-gray-900 dark:text-white' : ''}`}>
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                     </div>
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Chat Input */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex space-x-2">
                 <input
                 type="text"
                 value={followUpQuestion}
                 onChange={(e) => setFollowUpQuestion(e.target.value)}
                 placeholder="Ask a follow-up question..."
                 className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                 />
                 <Button
                 onClick={handleFollowUpSend}
                 disabled={isSending}
                 className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                 >
                  {isSending ? "Sending..." : "Send"}
                  </Button>
                </div>
              </div>
            </div>
          ) : showNewChat ? (
            <DoubtSolverGenerator onChatStarted={handleChatStarted} />
          ) : (
            <div className="max-w-2xl mx-auto p-6 text-center mt-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Doubt Solver</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Get instant answers to your questions or upload documents for detailed explanations
              </p>
              <Button
                onClick={handleNewChat}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3"
              >
                Start New Chat
              </Button>
            </div>
          )}
        </main>
        </div>
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

export default DoubtSolver;
