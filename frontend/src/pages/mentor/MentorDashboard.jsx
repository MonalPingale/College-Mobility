import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Layout/Navbar";
import { Calendar, Users, FileText, TrendingUp, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

// ✅ API
import { fetchDashboardSummary } from "@/api/teacherAuth";

const MentorDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);

  // 🔐 LOAD DASHBOARD DATA
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await fetchDashboardSummary();

        setSummary(data);

        setUser({
          name: data.teacherName,
          role: "mentor",
          avatar: null,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard");
        navigate("/auth");
      }
    };

    loadDashboard();
  }, [navigate]);

  if (!user || !summary) return null;

  // ✅ STATS FROM BACKEND
  const statCards = [
    {
      title: "Total Mentees",
      value: summary.totalMentees,
      icon: Users,
    },
    {
      title: "Scheduled Meetings",
      value: summary.scheduledSessions,
      icon: Calendar,
    },
    {
      title: "Completed Meetings",
      value: summary.completedSessions,
      icon: TrendingUp,
    },
    {
      title: "Average Attendance",
      value: `${summary.averageAttendancePercentage}%`,
      icon: TrendingUp,
    },
  ];

  // ⚡ QUICK ACTIONS (UNCHANGED)
  const quickActions = [
    { to: "/mentor/ScheduleMeeting", text: "Schedule Meeting", icon: Calendar },
    { to: "/mentor/AttendanceMarking", text: "Mark Attendance", icon: FileText },
    { to: "/mentor/MyMentees", text: "View Mentees", icon: Users },
    { to: "/mentor/AttendanceAnalytics", text: "Attendance Analysis", icon: TrendingUp },
    { to: "/mentor/QRAttendance", text: "QR Attendance", icon: Users },
    { to: "/mentor/ChooseMentee", text: "Choose Mentees", icon: Users },
  ];

  // ⚠️ RECENT MEETINGS — STATIC ठेवले (तू सांगितल्याप्रमाणे delete नाही)
  const recentMeetings = [
    {
      id: 1,
      title: "Weekly Check-in",
      date: "12 Sep 2025",
      time: "10:00 AM",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Project Review",
      date: "08 Sep 2025",
      time: "02:00 PM",
      status: "completed",
    },
    {
      id: 3,
      title: "Career Guidance",
      date: "05 Sep 2025",
      time: "11:30 AM",
      status: "completed",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100">
      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 🔥 WELCOME */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your mentees today.
          </p>
        </motion.div>

        {/* 📊 STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-200">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 📅 RECENT MEETINGS + QUICK ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Meetings */}
          <Card className="bg-gray-800 border-gray-700 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">
                  Recent Meetings
                </CardTitle>
                <Button
                  asChild
                  size="sm"
                  className="bg-blue-700 hover:bg-emerald-900"
                >
                  <Link to="/mentor/ScheduleMeeting">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule New
                  </Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {recentMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between p-3 bg-gray-900 border border-gray-700 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-white">
                        {meeting.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {meeting.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {meeting.time}
                        </span>
                      </div>
                    </div>

                    <Badge
                      variant={
                        meeting.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {meeting.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-white">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {quickActions.map((action) => (
                  <Button
                    key={action.to}
                    asChild
                    className="w-full justify-start bg-blue-700 hover:bg-emerald-900"
                  >
                    <Link to={action.to}>
                      <action.icon className="w-5 h-5 mr-3" />
                      {action.text}
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
