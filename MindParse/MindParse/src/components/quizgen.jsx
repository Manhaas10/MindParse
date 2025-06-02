import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Loader2 } from "lucide-react";




const QuizGenerator = ({ onQuizGenerated }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [difficulty, setDifficulty] = useState("Medium");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (validTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        alert('Please select a PDF, DOCX, or TXT file.');
      }
    }
  };

  const generateQuiz = async (file, difficulty) => {
    // Mock quiz generation - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    
    const mockQuiz = {
      title: `Quiz from ${file.name}`,
      difficulty: difficulty,
      questions: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        question: `This is question ${i + 1} based on your document. What is the correct answer for this ${difficulty.toLowerCase()} level question?`,
        options: [
          `Option A for question ${i + 1}`,
          `Option B for question ${i + 1}`,
          `Option C for question ${i + 1}`,
          `Option D for question ${i + 1}`
        ],
        correctAnswer: Math.floor(Math.random() * 4) // Random correct answer for demo
      }))
    };
   
    
    return mockQuiz;
  };

 const handleGenerateQuiz = async () => {
  if (!selectedFile) {
    alert('Please select a file first.');
    return;
  }

  console.log("Starting quiz generation...");
  setIsLoading(true);

  try {
    const quiz = await generateQuiz(selectedFile, difficulty);
    // console.log("Quiz generated:", quiz);
    onQuizGenerated(quiz);
  } catch (error) {
    console.error('Error generating quiz:', error);
    alert('Failed to generate quiz. Please try again.');
  } finally {
    setIsLoading(false);
    console.log("Loading set to false");
  }
};
  const handleDifficultyChange = (value) => {
    setDifficulty(value);
  };


  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Generate a Quiz from Your Document
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
            Upload your document and select difficulty level to create a personalized quiz
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* File Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="file-upload" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload Document
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
            <RadioGroup value={difficulty} onValueChange={handleDifficultyChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Easy" id="easy" />
                <Label htmlFor="easy" className="cursor-pointer text-gray-900 dark:text-gray-100">
                  Easy - Basic comprehension questions
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
            </RadioGroup>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerateQuiz}
            disabled={!selectedFile || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Quiz...
              </span>
            ) : (
              'Generate Quiz'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizGenerator;
