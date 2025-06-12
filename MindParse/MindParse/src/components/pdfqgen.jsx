import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Loader2, HelpCircle, Eye, EyeOff, RotateCcw, Plus } from "lucide-react";
import toast from 'react-hot-toast';
import { Badge } from "@/components/ui/badge";
import api from '@/api/axios';
import { v4 as uuidv4 } from 'uuid';
import { set } from "date-fns";

const PDFQuestionGenerator = ({ onBackToHome }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [difficulty, setDifficulty] = useState("All Levels");
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showGenerated, setShowGenerated] = useState(false);
  const [visibleAnswers, setVisibleAnswers] = useState(new Set());
  const [sessionId, setSessionId] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (validTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF, DOCX, or TXT file.",
          variant: "destructive",
        });
      }
    }
  };

 const generateQuestions = async () => {
  if (!selectedFile) {
    toast.error("Please select a PDF file first.");
    return;
  }

  setIsLoading(true);

  // ✅ Generate or retrieve sessionId
  const sessionId = uuidv4();
  localStorage.setItem("pdfSessionId", sessionId);

  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("difficulty", difficulty === "All Levels" ? "ALL" : difficulty.toUpperCase());
  formData.append("email", "user@example.com");
  formData.append("sessionId", sessionId); // ✅ Attach sessionId
setSessionId(sessionId); // Update state with sessionId
  try {
    const response = await api.post("/questions/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

   const { questions: rawText, sessionId: returnedSessionId } = response.data;
    const lines = rawText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const parsedQuestions = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("Q")) {
        const question = lines[i].replace(/^Q\d+:\s*/, "");
        const answerLine = lines[i + 1] || "";
        const answer = answerLine.replace(/^A\d+:\s*/, "");
        parsedQuestions.push({
          id: parsedQuestions.length + 1,
          question,
          answer,
          difficulty,
        });
        i++; // skip answer line
      }
    }

    setQuestions(parsedQuestions);
    setShowGenerated(true);
    setVisibleAnswers(new Set());
  } catch (error) {
    toast({
      title: "Error",
      description: error?.response?.data?.message || error.message || "Something went wrong.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


const loadMoreQuestions = async () => {
  if (!sessionId) return;

  setIsLoading(true);
  try {
    const response = await api.get(`/questions/new-set/${sessionId}`, {
      params: {
        difficulty: difficulty === "All Levels" ? "ALL" : difficulty.toUpperCase(),
      },
    });

    // const  = response.data;
     const { questions: rawText, sessionId: returnedSessionId } = response.data;
    const lines = rawText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const newQuestions = [];

    for (let i = 0,j=0; i < lines.length; i++) {
      if (lines[i].startsWith("Q")) {
        const question = lines[i].replace(/^Q\d+:\s*/, "");
        const answerLine = lines[i + 1] || "";
        const answer = answerLine.replace(/^A\d+:\s*/, "");
        newQuestions.push({
          id: questions.length + j +1,
          question,
          answer,
          difficulty,
        });
        j++;
        i++; // skip answer line
      }
    }
    console.log("New Questions Loaded:", newQuestions);

    setQuestions(prev => [...prev, ...newQuestions]);

    toast.success(`More Questions Loaded! Added ${newQuestions.length} more questions.`);
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not fetch more questions.");
  } finally {
    setIsLoading(false);
  }
};


  const toggleAnswer = (questionId) => {
    const newVisibleAnswers = new Set(visibleAnswers);
    if (newVisibleAnswers.has(questionId)) {
      newVisibleAnswers.delete(questionId);
    } else {
      newVisibleAnswers.add(questionId);
    }
    setVisibleAnswers(newVisibleAnswers);
  };

  const generateNewSet = () => {
    setQuestions([]);
    setVisibleAnswers(new Set());
    setShowGenerated(false);
    generateQuestions();
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Easy": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "Medium": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Hard": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  if (showGenerated) {
    return (
      <div className="max-w-4xl mx-auto p-6 animate-fade-in">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="text-center border-b border-gray-100 dark:border-gray-700">
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Generated Questions
            </CardTitle>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <span>Document: {selectedFile?.name}</span>
              <span>Difficulty: {difficulty}</span>
              <span>Total Questions: {questions.length}</span>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Button
                onClick={loadMoreQuestions}
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                More Questions
              </Button>
              
              <Button
                onClick={generateNewSet}
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Generate New Set
              </Button>
              
              {onBackToHome && (
                <Button
                  onClick={onBackToHome}
                  variant="outline"
                  size="sm"
                >
                  Back to Generator
                </Button>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {questions.map((q) => (
                <Card key={q.id} className="border border-gray-200 dark:border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <Badge className={getDifficultyColor(q.difficulty)}>
                          {q.difficulty}
                        </Badge>
                      </div>
                      <Button
                        onClick={() => toggleAnswer(q.id)}
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        {visibleAnswers.has(q.id) ? (
                          <>
                            <EyeOff className="h-4 w-4" />
                            Hide Answer
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4" />
                            Show Answer
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-gray-900 dark:text-gray-100 font-medium leading-relaxed">
                        {q.question}
                      </p>
                    </div>
                    
                    {visibleAnswers.has(q.id) && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          <strong>Answer:</strong> {q.answer}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => setShowGenerated(false)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3"
              >
                Generate from New Document
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            AI PDF Question Generator
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
            Upload your Document and generate intelligent questions at various difficulty levels
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* File Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="file-upload" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload PDF, DOCX, or TXT Document
            </Label>
            <div className="relative">
              <Input
                id="file-upload"
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              <Label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:border-blue-500 dark:hover:bg-blue-900/20 transition-colors"
              >
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedFile ? selectedFile.name : 'Click to upload PDF, DOCX, or TXT file'}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Max file size: 10MB
                  </p>
                </div>
              </Label>
            </div>
            
            {selectedFile && (
              <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <FileText className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-sm text-green-700 dark:text-green-300">
                  {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            )}
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Difficulty Level
            </Label>
            <RadioGroup value={difficulty} onValueChange={setDifficulty}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Easy" id="easy" />
                <Label htmlFor="easy" className="cursor-pointer text-gray-900 dark:text-gray-100">
                  Easy - Basic comprehension and recall questions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Medium" id="medium" />
                <Label htmlFor="medium" className="cursor-pointer text-gray-900 dark:text-gray-100">
                  Medium - Analytical and application questions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Hard" id="hard" />
                <Label htmlFor="hard" className="cursor-pointer text-gray-900 dark:text-gray-100">
                  Hard - Critical thinking and synthesis questions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="All Levels" id="all" />
                <Label htmlFor="all" className="cursor-pointer text-gray-900 dark:text-gray-100">
                  All Levels - Mix of easy, medium, and hard questions
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateQuestions}
            disabled={!selectedFile || isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Questions...
              </>
            ) : (
              'Generate Questions'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFQuestionGenerator;
