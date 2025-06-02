import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";



const QuizDisplay = ({ 
  quiz, 
  onBackToGenerator, 
  initialAnswers = {}, 
  initialScore = 0, 
  initialShowResults = false 
}) => {
  const [answers, setAnswers] = useState(initialAnswers);
  const [showResults, setShowResults] = useState(initialShowResults);
  const [score, setScore] = useState(initialScore);

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const getScoreColor = () => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage >= 80) return "Excellent work! 🎉";
    if (percentage >= 60) return "Good job! 👍";
    return "Keep studying! 📚";
  };
  console.log("Quiz Display Rendered", { quiz, answers, showResults, score });

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Quiz Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`text-6xl font-bold ${getScoreColor()}`}>
              {score}/{quiz.questions.length}
            </div>
            <div className={`text-2xl font-semibold ${getScoreColor()}`}>
              {((score / quiz.questions.length) * 100).toFixed(1)}%
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">{getScoreMessage()}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              {!initialShowResults && (
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="px-6 py-3"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Retake Quiz
                </Button>
              )}
              <Button
                onClick={onBackToGenerator}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3"
              >
                {initialShowResults ? 'Back to Quiz Generator' : 'Generate New Quiz'}
              </Button>
            </div>

            {/* Detailed Results */}
            <div className="mt-8 text-left">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Detailed Results:</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {quiz.questions.map((question, index) => {
                  const userAnswer = answers[question.id];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={question.id} className="p-4 border rounded-lg dark:border-gray-600">
                      <div className="flex items-start gap-2 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                        )}
                        <p className="font-medium dark:text-white">
                          {index + 1}. {question.question}
                        </p>
                      </div>
                      <div className="ml-7 text-sm">
                        <p className={`${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          Your answer: {userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-600">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {quiz.title}
          </CardTitle>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Difficulty: <span className="font-semibold text-blue-600">{quiz.difficulty}</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Answer all {quiz.questions.length} questions and click Submit to see your results
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-8">
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {index + 1}. {question.question}
                </h3>
                
                <RadioGroup
                  value={answers[question.id]?.toString()}
                  onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                >
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={optionIndex.toString()}
                        id={`q${question.id}-option${optionIndex}`}
                      />
                      <Label
                        htmlFor={`q${question.id}-option${optionIndex}`}
                        className="cursor-pointer text-gray-700 dark:text-gray-300 leading-relaxed"
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={onBackToGenerator}
              variant="outline"
              className="px-6 py-3"
            >
              Back to Generator
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== quiz.questions.length}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3"
            >
              Submit Quiz ({Object.keys(answers).length}/{quiz.questions.length} answered)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizDisplay;
