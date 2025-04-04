
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Trophy, ChevronRight } from "lucide-react";
import { QuizQuestion, quizzes } from "@/data/quiz-data";

const Quiz = () => {
  const { toast } = useToast();
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuiz = activeQuiz ? quizzes.find(q => q.id === activeQuiz) : null;
  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];
  
  const progress = currentQuiz 
    ? (currentQuestionIndex / currentQuiz.questions.length) * 100 
    : 0;

  const handleStartQuiz = (quizId: string) => {
    setActiveQuiz(quizId);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setQuizComplete(false);
    setSelectedAnswer(null);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer || !currentQuiz || !currentQuestion) return;

    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);

    // Update score
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }

    // Move to next question or complete quiz
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizComplete(true);
      toast({
        title: "Quiz Complete!",
        description: `You scored ${score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)} out of ${currentQuiz.questions.length}`,
      });
    }
  };

  const handleRestartQuiz = () => {
    setActiveQuiz(null);
    setQuizComplete(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role="patient" />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Cancer Education Quiz</h1>
          
          {!activeQuiz ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-embrace-50">
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="py-4">
                    <p className="text-sm text-muted-foreground">
                      {quiz.questions.length} questions
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleStartQuiz(quiz.id)}
                      className="w-full"
                    >
                      Start Quiz <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : !quizComplete ? (
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {currentQuiz?.questions.length}
                  </div>
                  <div className="text-sm font-medium">
                    Score: {score}
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
                <CardTitle className="mt-4">{currentQuestion?.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer}>
                  {currentQuestion?.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2 border rounded-lg p-3 my-2 hover:bg-muted/50">
                      <RadioGroupItem value={option} id={`option-${idx}`} />
                      <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer py-1">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleNextQuestion} 
                  disabled={!selectedAnswer}
                  className="w-full"
                >
                  {currentQuestionIndex < (currentQuiz?.questions.length || 0) - 1 ? 'Next Question' : 'Complete Quiz'}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="max-w-3xl mx-auto">
              <CardHeader className="text-center">
                <div className="mx-auto rounded-full bg-embrace-100 p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Trophy className="h-8 w-8 text-embrace-600" />
                </div>
                <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
                <CardDescription>
                  You scored {score} out of {currentQuiz?.questions.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress 
                    value={(score / (currentQuiz?.questions.length || 1)) * 100} 
                    className="h-3"
                  />
                  
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <h3 className="font-medium mb-2">Summary</h3>
                    <p className="text-sm mb-4">
                      {score === currentQuiz?.questions.length 
                        ? "Excellent! You've mastered this topic." 
                        : score > (currentQuiz?.questions.length || 0) / 2 
                          ? "Good job! You know quite a bit about this topic."
                          : "Keep learning! You're making progress."}
                    </p>
                    
                    <div className="text-sm space-y-2">
                      {currentQuiz?.questions.map((question, idx) => (
                        <div 
                          key={idx} 
                          className={`p-2 rounded-md ${
                            answers[idx] === question.correctAnswer 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          <p className="font-medium">{idx+1}. {question.question}</p>
                          <p className="mt-1">Your answer: {answers[idx]}</p>
                          {answers[idx] !== question.correctAnswer && (
                            <p className="mt-1">Correct answer: {question.correctAnswer}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={handleRestartQuiz} 
                  className="w-full"
                >
                  Back to Quizzes
                </Button>
                <Button 
                  onClick={() => handleStartQuiz(activeQuiz)} 
                  className="w-full"
                >
                  Retry Quiz
                </Button>
              </CardFooter>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Quiz;
