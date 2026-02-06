import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Layout/Navbar";
import { Calendar, Clock, Users } from "lucide-react";

// 🔗 API
const fetchTeacherSessions = async () => {
  const res = await fetch("http://localhost:2121/teacher/sessions", {
    method: "GET",
    credentials: "include", // 🔐 TEACHER_TOKEN
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sessions");
  }

  return res.json();
};

const mockUser = {
  name: "Dr. Suraj Prajapati",
  role: "mentor",
  avatar: "",
};

const AttendanceMarking = () => {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Load sessions
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await fetchTeacherSessions();
        setSessions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-foreground">
      <Navbar user={mockUser} />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Attendance Management
          </h1>
          <p className="text-white/70">
            Select a completed session to mark or view student attendance.
          </p>
        </div>

        {/* SESSION LIST */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5 text-blue-400" />
              Your Sessions
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {loading && (
              <p className="text-gray-400">Loading sessions...</p>
            )}

            {!loading && sessions.length === 0 && (
              <p className="text-gray-400">
                No sessions found
              </p>
            )}

            {sessions.map((session) => (
              <div
                key={session.sessionId}
                className="flex items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg"
              >
                {/* LEFT INFO */}
                <div>
                  <p className="font-medium text-white">
                    {session.sessionTitle}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {session.sessionDate}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {session.startTime}
                    </span>
                  </div>

                  <Badge className="mt-2 bg-gray-700 text-gray-300">
                    {session.status}
                  </Badge>
                </div>

                {/* ACTION */}
                {session.status === "completed" ? (
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() =>
                      navigate(
                        `/mentor/attendance/${session.sessionId}`
                      )
                    }
                  >
                    View Student Attendance
                  </Button>
                ) : (
                  <Badge className="bg-yellow-600 text-white">
                    Not Completed
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceMarking;
