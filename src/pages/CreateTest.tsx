import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Save, Eye } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const CreateTest = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    },
  ]);

  useEffect(() => {
    // Load existing questions from localStorage
    const saved = localStorage.getItem("teacherQuestions");
    if (saved) {
      setQuestions(JSON.parse(saved));
    }
  }, []);

  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    setQuestions([
      ...questions,
      {
        id: newId,
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);
  };

  const removeQuestion = (id: number) => {
    if (questions.length === 1) {
      toast.error("You must have at least one question!");
      return;
    }
    setQuestions(questions.filter((q) => q.id !== id));
    toast.success("Question removed");
  };

  const updateQuestion = (id: number, field: string, value: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const updateOption = (id: number, optionIndex: number, value: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const updateCorrectAnswer = (id: number, answerIndex: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, correctAnswer: answerIndex } : q
      )
    );
  };

  const saveQuestions = () => {
    // Validate all questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        toast.error(`Question ${i + 1} is empty!`);
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          toast.error(`Question ${i + 1}: Option ${String.fromCharCode(65 + j)} is empty!`);
          return;
        }
      }
    }

    localStorage.setItem("teacherQuestions", JSON.stringify(questions));
    toast.success("Question paper saved successfully!");
  };

  const previewTest = () => {
    saveQuestions();
    navigate("/mcq-test");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Create Question Paper
            </h1>
            <p className="text-muted-foreground">
              Add questions and options for your MCQ test
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={saveQuestions} variant="outline" size="lg">
              <Save className="w-5 h-5 mr-2" />
              Save
            </Button>
            <Button
              onClick={previewTest}
              className="bg-gradient-to-r from-primary to-accent"
              size="lg"
            >
              <Eye className="w-5 h-5 mr-2" />
              Preview Test
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, qIndex) => (
            <Card key={question.id} className="p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">Question {qIndex + 1}</h3>
                <Button
                  onClick={() => removeQuestion(question.id)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                  <Input
                    id={`question-${question.id}`}
                    value={question.question}
                    onChange={(e) =>
                      updateQuestion(question.id, "question", e.target.value)
                    }
                    placeholder="Enter your question here"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Options (Select the correct answer)</Label>
                  <div className="space-y-3 mt-2">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={question.correctAnswer === optIndex}
                          onChange={() => updateCorrectAnswer(question.id, optIndex)}
                          className="w-5 h-5 accent-primary cursor-pointer"
                        />
                        <Label className="text-base font-semibold min-w-[24px]">
                          {String.fromCharCode(65 + optIndex)}.
                        </Label>
                        <Input
                          value={option}
                          onChange={(e) =>
                            updateOption(question.id, optIndex, e.target.value)
                          }
                          placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Select the radio button next to the correct answer
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={addQuestion}
            variant="outline"
            size="lg"
            className="border-2 border-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Another Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
