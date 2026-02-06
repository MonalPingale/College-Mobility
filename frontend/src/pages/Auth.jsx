import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { GraduationCap, Users } from "lucide-react";

// ✅ correct imports
import { studentLogin } from "../api/studentAuth";
import { teacherLogin } from "../api/teacherAuth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState("mentee");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    department: "",
  });

  const navigate = useNavigate();

  // ✅ UPDATED LOGIN HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        toast.error("Please enter email and password");
        return;
      }

      if (userRole === "mentee") {
        await studentLogin({
          email: formData.email,
          password: formData.password,
        });

        toast.success("Student login successful");
        navigate("/mentee/dashboard");
      }

      if (userRole === "mentor") {
        await teacherLogin({
          email: formData.email,
          password: formData.password,
        });

        toast.success("Mentor login successful");
        navigate("/mentor/dashboard");
      }
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            MentorMeet
          </h1>
          <p className="text-gray-400">Connect mentors with their mentees</p>
        </div>

        <Card className="bg-gray-900/70 border border-gray-700">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Welcome back! Please sign in.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={userRole} onValueChange={setUserRole}>
              <TabsList className="grid grid-cols-2 mb-6 bg-gray-800">
                <TabsTrigger value="mentee">
                  <GraduationCap size={16} /> Mentee
                </TabsTrigger>
                <TabsTrigger value="mentor">
                  <Users size={16} /> Mentor
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Please wait..." : "Sign In"}
                </Button>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
