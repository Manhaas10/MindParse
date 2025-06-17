import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Upload, MessageSquare, Send } from "lucide-react";
import toast from "react-hot-toast";
import api from '@/api/axios';


const DoubtSolverGenerator = ({ onChatStarted }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [inputMethod, setInputMethod] = useState("question");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        toast.error("Invalid File Type: Please select a PDF, TXT, DOC, or DOCX file.");
      }
      // console.log(file);
    }
    else{
      setSelectedFile(null);
      toast.error("No file selected. Please choose a document to upload.");
    }
  };

 const handleSubmit = async () => {
  if (inputMethod === "question" && !question.trim()) {
    toast.error("Please enter a question to get started.");
    return;
  }

  if (inputMethod === "document" && !selectedFile) {
    toast.error("Please select a document to analyze.");
    return;
  }

  setIsLoading(true);
  const email = localStorage.getItem("userEmail"); // Replace with actual email
  const conversationId = `${Date.now()}`;

  try {
    let chatTitle = "";
    let userMessage = "";
    let assistantMessage = "";

    if (inputMethod === "question") {
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("question", question);
      params.append("conversationId", conversationId);
      params.append("title", question.length > 30 ? question.substring(0, 30) + "..." : question);
      localStorage.setItem("conversationId", conversationId);
      const response = await api.post("/doubt/ask", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      chatTitle = question.length > 30 ? question.substring(0, 30) + "..." : question;
      userMessage = question;
      assistantMessage = response.data;
    } else {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("email", email);
      formData.append("conversationId", conversationId);
      formData.append("title", selectedFile.name.replace(/\.[^/.]+$/, "")); // Use file name as title
      console.log("hi",selectedFile, email, conversationId);
      localStorage.setItem("conversationId", conversationId);

      const response = await api.post("/doubt/upload", formData, {
         headers: {
           "Content-Type": "multipart/form-data",
          },
        });


      chatTitle = selectedFile.name.replace(/\.[^/.]+$/, "");
      userMessage = `I've uploaded a document: ${selectedFile.name}`;
      assistantMessage = response.data;
    }

    const chatData = {
      conversationId: conversationId,
      title: chatTitle,
      messages: [
        {
          id: 1,
          type: "user",
          content: userMessage,
          timestamp: new Date().toISOString(),
        },
        {
          id: 2,
          type: "assistant",
          content: assistantMessage,
          timestamp: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
    };

    onChatStarted?.(chatData);

    toast.success("Your doubt solver chat has been created successfully.");
  } catch (error) {
    toast.error(error?.response?.data || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Doubt Solver
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Get instant answers to your questions or upload documents for AI-powered explanations
        </p>
      </div>

      {/* Input Method Selection */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-4 block">Choose your input method:</Label>
        <div className="flex space-x-4">
          <button
            onClick={() => setInputMethod("question")}
            className={`flex items-center space-x-2 p-4 border-2 rounded-lg transition-colors ${
              inputMethod === "question"
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Ask a Question</span>
          </button>
          <button
            onClick={() => setInputMethod("document")}
            className={`flex items-center space-x-2 p-4 border-2 rounded-lg transition-colors ${
              inputMethod === "document"
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Question Input */}
      {inputMethod === "question" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="question" className="text-base font-medium">
              What's your question?
            </Label>
            <Textarea
              id="question"
              placeholder="Ask any question you have doubts about... e.g., 'Explain quantum physics', 'How does photosynthesis work?', 'What is machine learning?'"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-2 min-h-[120px]"
            />
          </div>
        </div>
      )}

      {/* Document Upload */}
      {inputMethod === "document" && (
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Upload Document</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              {selectedFile ? (
                <div className="flex items-center justify-center space-x-2">
                  <FileText className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Upload a PDF or text document
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Supported formats: PDF, TXT (Max 10MB)
                  </p>
                </div>
              )}
              <Input
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileChange}
                className="mt-4"
              />
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={handleSubmit}
          disabled={isLoading || (inputMethod === "question" && !question.trim()) || (inputMethod === "document" && !selectedFile)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 text-lg"
        >
          {isLoading ? (
            "Starting Chat..."
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Start Chat
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default DoubtSolverGenerator;
