import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Loader2 } from "lucide-react";
import api from '@/api/axios';
import { toast } from 'react-hot-toast';


const SummarizerGenerator = ({ onSummaryGenerated }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summaryLevel, setSummaryLevel] = useState("Moderate");
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

const handleGenerateSummary = async () => {
  if (!selectedFile) {
    alert('Please select a file first.');
    return;
  }

  const userEmail = localStorage.getItem("userEmail"); // or get from context/session
  if (!userEmail) {
    alert("User email not found. Please login.");
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('level', summaryLevel);
  formData.append('email', userEmail);

  setIsLoading(true);
  try {
    const response = await api.post("/summarize", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const summaryData = response.data;
    onSummaryGenerated({
      title: `${summaryData.summaryLevel} Summary`,
      fileName: summaryData.fileName,
      level: summaryData.summaryLevel,
      content: summaryData.summaryText,
      wordCount: summaryData.summaryText.split(/\s+/).filter(Boolean).length,
      generatedAt: new Date(summaryData.createdAt).toLocaleString(),
    });

  } catch (error) {
    console.error("Error generating summary:", error);
    toast.error("Failed to generate summary. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Summarize Your Document
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
            Upload your document and select summary level to get an AI-powered summary
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

          {/* Summary Level Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Summary Level
            </Label>
            <RadioGroup value={summaryLevel} onValueChange={setSummaryLevel}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Brief" id="brief" />
                <Label htmlFor="brief" className="cursor-pointer text-gray-900 dark:text-gray-100">
                  Brief - Quick overview and key points
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Moderate" id="moderate" />
                <Label htmlFor="moderate" className="cursor-pointer text-gray-900 dark:text-gray-100">
                  Moderate - Balanced summary with details
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Detailed" id="detailed" />
                <Label htmlFor="detailed" className="cursor-pointer text-gray-900 dark:text-gray-100">
                  Detailed - Comprehensive analysis and insights
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerateSummary}
            disabled={!selectedFile || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? (
                <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Summary...
                </span>
            ) : (
              'Generate Summary'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummarizerGenerator;
