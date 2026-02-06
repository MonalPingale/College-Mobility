import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import { Navbar } from "@/components/Layout/Navbar";
import { motion } from "framer-motion";

// ✅ CORRECT API FILE
import {
  fetchUpcomingSessions,
  fetchCompletedSessions,
} from "../../api/studentAuth";

export default function MeetingPage() {
  const [tab, setTab] = useState("upcoming");
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ TEMP USER (safe for Navbar)
  const user = {
    role: "mentee",
    name: "Amit Patil",
  };

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const [up, comp] = await Promise.all([
          fetchUpcomingSessions(),
          fetchCompletedSessions(),
        ]);

        setUpcoming(up);
        setCompleted(comp);
      } catch (err) {
        console.error("Failed to fetch sessions", err);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, []);

  const renderMeetings = (meetings, isCompleted) => {
    if (meetings.length === 0) {
      return (
        <p className="text-gray-400">
          No {isCompleted ? "completed" : "upcoming"} meetings found.
        </p>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting, idx) => (
          <motion.div
            key={meeting.sessionId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className="bg-gray-800 border border-gray-700 rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  {isCompleted ? (
                    <CheckCircle2 className="text-green-500" size={20} />
                  ) : (
                    <Calendar className="text-blue-400" size={20} />
                  )}
                  {meeting.sessionTitle}
                </CardTitle>
              </CardHeader>

              <CardContent className="text-sm text-gray-300 space-y-2">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {meeting.sessionDate}
                </p>

                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {meeting.startTime}
                </p>

                <p className="text-xs italic text-gray-400">
                  Status: {meeting.sessionStatus}
                </p>

                {isCompleted && (
                  <p
                    className={`text-xs font-semibold ${
                      meeting.attendanceStatus === "present"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    Attendance: {meeting.attendanceStatus}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* ✅ Navbar safe */}
      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Meetings</h1>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-6 bg-gray-800">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {loading ? "Loading..." : renderMeetings(upcoming, false)}
          </TabsContent>

          <TabsContent value="completed">
            {loading ? "Loading..." : renderMeetings(completed, true)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
