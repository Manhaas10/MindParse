import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, RotateCcw, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";



const SummaryDisplay = ({ summary, onBackToGenerator }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary.content);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Summary has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy summary to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([summary.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${summary.fileName.split('.')[0]}_summary.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: "Summary has been downloaded as a text file.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center border-b border-gray-100 dark:border-gray-700">
          <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {summary.title}
          </CardTitle>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
              {summary.level} Level
            </span>
            <span>Document: {summary.fileName}</span>
            <span>Words: {summary.wordCount}</span>
            <span>Generated: {summary.generatedAt}</span>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 p-6 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Summary
                </>
              )}
            </Button>
            
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            
            <Button
              onClick={onBackToGenerator}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <RotateCcw className="h-4 w-4" />
              New Summary
            </Button>
          </div>

          {/* Summary Content */}
          <div className="p-6">
            <ScrollArea className="h-96 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-6">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                  {summary.content}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Back Button */}
          <div className="flex justify-center p-6 pt-0">
            <Button
              onClick={onBackToGenerator}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3"
            >
              Generate Another Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryDisplay;
