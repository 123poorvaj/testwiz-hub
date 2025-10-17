import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "JavaScript", "Java", "C++"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "Which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Earth"],
    correctAnswer: 1,
  },
];

const MCQTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(sampleQuestions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const unanswered = selectedAnswers.filter((answer) => answer === null).length;
    if (unanswered > 0) {
      toast.error(`Please answer all questions. ${unanswered} question(s) remaining.`);
      return;
    }
    setIsSubmitted(true);
    setShowResults(true);
    toast.success("Test submitted successfully!");
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === sampleQuestions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getOptionClassName = (optionIndex: number) => {
    const baseClasses =
      "w-full p-4 text-left rounded-lg border-2 transition-all duration-200";
    const selected = selectedAnswers[currentQuestion] === optionIndex;

    if (!isSubmitted) {
      return `${baseClasses} ${
        selected
          ? "border-primary bg-primary/10 shadow-md"
          : "border-border hover:border-primary/50 hover:bg-muted"
      }`;
    }

    const isCorrect = optionIndex === sampleQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      return `${baseClasses} border-success bg-success/10`;
    }
    if (selected && !isCorrect) {
      return `${baseClasses} border-error bg-error/10`;
    }
    return `${baseClasses} border-border opacity-60`;
  };

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;
  const score = calculateScore();
  const percentage = (score / sampleQuestions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Test Results</h1>
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
                <span className="text-5xl font-bold text-primary-foreground">
                  {percentage.toFixed(0)}%
                </span>
              </div>
              <p className="text-2xl text-muted-foreground">
                You scored {score} out of {sampleQuestions.length}
              </p>
            </div>

            <div className="space-y-6">
              {sampleQuestions.map((q, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === q.correctAnswer;

                return (
                  <Card key={q.id} className="p-6 border-2">
                    <div className="flex items-start gap-3 mb-4">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-error flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-3">
                          {index + 1}. {q.question}
                        </h3>
                        <div className="space-y-2">
                          {q.options.map((option, optIndex) => {
                            const isUserAnswer = userAnswer === optIndex;
                            const isCorrectAnswer = q.correctAnswer === optIndex;

                            return (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-lg border-2 ${
                                  isCorrectAnswer
                                    ? "border-success bg-success/10"
                                    : isUserAnswer
                                    ? "border-error bg-error/10"
                                    : "border-border"
                                }`}
                              >
                                <span className="font-medium mr-2">
                                  {String.fromCharCode(65 + optIndex)}.
                                </span>
                                {option}
                                {isCorrectAnswer && (
                                  <span className="ml-2 text-success font-semibold">
                                    ✓ Correct
                                  </span>
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <span className="ml-2 text-error font-semibold">
                                    ✗ Your answer
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswers(new Array(sampleQuestions.length).fill(null));
                  setShowResults(false);
                  setIsSubmitted(false);
                }}
                className="bg-gradient-to-r from-primary to-accent"
                size="lg"
              >
                Take Test Again
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            MCQ Practice Test
          </h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {sampleQuestions.length}
          </p>
        </div>

        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-6">
            {sampleQuestions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {sampleQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={getOptionClassName(index)}
                disabled={isSubmitted}
              >
                <span className="font-semibold mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>
        </Card>

        <div className="flex items-center justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            size="lg"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          {currentQuestion === sampleQuestions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitted}
              className="bg-gradient-to-r from-primary to-accent"
              size="lg"
            >
              Submit Test
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={currentQuestion === sampleQuestions.length - 1}
              className="bg-gradient-to-r from-primary to-accent"
              size="lg"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>

        <div className="mt-6 flex gap-2 flex-wrap justify-center">
          {sampleQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded-lg border-2 font-semibold transition-all ${
                currentQuestion === index
                  ? "border-primary bg-primary text-primary-foreground"
                  : selectedAnswers[index] !== null
                  ? "border-primary bg-primary/20"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MCQTest;
