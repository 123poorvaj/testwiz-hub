import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, Trophy, PenSquare } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            MCQ Practice Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your knowledge with our interactive multiple choice questions. Track your
            progress and improve your skills.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Topics</h3>
            <p className="text-muted-foreground">
              Practice questions across various subjects and difficulty levels
            </p>
          </Card>

          <Card className="p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Feedback</h3>
            <p className="text-muted-foreground">
              Get immediate results and detailed explanations for each answer
            </p>
          </Card>

          <Card className="p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-muted-foreground">
              Monitor your improvement and identify areas for growth
            </p>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate("/create-test")}
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 border-2 border-primary hover:bg-primary/10"
          >
            <PenSquare className="w-5 h-5 mr-2" />
            Create Question Paper
          </Button>
          <Button
            onClick={() => navigate("/mcq-test")}
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg"
          >
            Start Practice Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
