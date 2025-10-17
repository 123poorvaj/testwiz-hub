import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, ArrowLeft, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TEACHER_KEY = "1017286298";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showTeacherAuth, setShowTeacherAuth] = useState(false);
  const [teacherKey, setTeacherKey] = useState("");

  const handleTeacherAccess = () => {
    if (teacherKey === TEACHER_KEY) {
      navigate("/create-test");
    } else {
      toast({
        title: "Invalid Key",
        description: "Please enter the correct teacher access key.",
        variant: "destructive",
      });
    }
  };

  if (showTeacherAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowTeacherAuth(false);
                  setTeacherKey("");
                }}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-center">Teacher Access</CardTitle>
            <CardDescription className="text-center">
              Enter your access key to create and manage questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter teacher key"
                value={teacherKey}
                onChange={(e) => setTeacherKey(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTeacherAccess();
                  }
                }}
                className="text-center text-lg"
              />
            </div>
            <Button
              onClick={handleTeacherAccess}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
              size="lg"
            >
              Access Teacher Portal
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            MCQ Practice Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your role to get started
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="shadow-xl hover:shadow-2xl transition-shadow cursor-pointer border-2 hover:border-blue-500">
            <CardHeader>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-center">Teacher</CardTitle>
              <CardDescription className="text-center text-base">
                Create and manage question papers for students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setShowTeacherAuth(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 text-lg py-6"
                size="lg"
              >
                Enter Teacher Portal
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Requires access key
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl hover:shadow-2xl transition-shadow cursor-pointer border-2 hover:border-green-500">
            <CardHeader>
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-center">Student</CardTitle>
              <CardDescription className="text-center text-base">
                Take practice tests and improve your knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate("/mcq-test")}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 text-lg py-6"
                size="lg"
              >
                Start Practice Test
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-4">
                No key required
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
