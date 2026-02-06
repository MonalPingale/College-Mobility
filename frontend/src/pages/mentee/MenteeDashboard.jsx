import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Layout/Navbar";
import { Calendar, User, FileText, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  fetchUpcomingSessions,
  fetchAttendanceSummary,
} from "../../api/studentAuth";

/* ================= RECENT ACTIVITY (UNCHANGED) ================= */

const recentActivity = [
  {
    type: "meeting",
    title: "Weekly Progress Review",
    date: "2024-01-15",
    status: "attended",
  },
  {
    type: "complaint",
    title: "Lab Equipment Issue",
    date: "2024-01-12",
    status: "resolved",
  },
  {
    type: "profile",
    title: "Updated contact information",
    date: "2024-01-10",
    status: "completed",
  },
];

const MenteeDashboard = () => {
  /* ================= DASHBOARD SUMMARY ================= */
  const [summary, setSummary] = useState({
    studentName: "",
    mentorName: "",
    attendancePercentage: 0,
    totalSessionsByMentor: 0,
    attendedSessions: 0,
  });

  /* ================= UPCOMING MEETINGS ================= */
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [summaryData, upcomingData] = await Promise.all([
          fetchAttendanceSummary(),
          fetchUpcomingSessions(),
        ]);

        setSummary(summaryData);
        setUpcomingMeetings(upcomingData);
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      } finally {
        setLoadingUpcoming(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navbar user={{ name: summary.studentName, role: "mentee" }} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {summary.studentName}
          </h1>
          <p className="text-gray-400">
            Stay updated with your mentoring sessions and academic progress.
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Meetings",
              value: summary.totalSessionsByMentor,
              icon: <Calendar className="h-4 w-4 text-blue-700" />,
              sub: "By mentor",
            },
            {
              title: "Attendance Rate",
              value: `${summary.attendancePercentage}%`,
              icon: <TrendingUp className="h-4 w-4 text-blue-700" />,
              sub: (
                <Progress
                  value={summary.attendancePercentage}
                  className="mt-2"
                />
              ),
            },
            {
              title: "Upcoming Meetings",
              value: upcomingMeetings.length,
              icon: <Clock className="h-4 w-4 text-blue-700" />,
              sub: "Scheduled / Running",
            },
            {
              title: "Mentor",
              value: summary.mentorName,
              icon: <User className="h-4 w-4 text-blue-700" />,
              sub: "Assigned mentor",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Card className="bg-gray-800/70 border border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm text-gray-300">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-400">{stat.sub}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ================= UPCOMING MEETINGS ================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="bg-gray-800/70 border border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-200">
                    Upcoming Meetings
                  </CardTitle>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 bg-gray-700"
                  >
                    <Link to="/mentee/MeetingPage">
                      <Calendar className="w-4 h-4 mr-2" />
                      View All
                    </Link>
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {loadingUpcoming && (
                  <p className="text-gray-400">
                    Loading upcoming meetings...
                  </p>
                )}

                {!loadingUpcoming && upcomingMeetings.length === 0 && (
                  <p className="text-gray-400">No upcoming meetings</p>
                )}

                <div className="space-y-4">
                  {upcomingMeetings.map((meeting) => (
                    <div
                      key={meeting.sessionId}
                      className="flex items-center justify-between p-3 bg-gray-900/60 border border-gray-700 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-white">
                          {meeting.sessionTitle}
                        </h4>

                        <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {meeting.sessionDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {meeting.startTime}
                          </span>
                        </div>
                      </div>

                      <Badge className="bg-gray-700 text-gray-300">
                        {meeting.sessionStatus}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ================= QUICK ACTIONS + RECENT ACTIVITY ================= */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* QUICK ACTIONS */}
            <Card className="bg-gray-800/70 border border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-200">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start bg-gray-700">
                  <Link to="/mentee/MenteeProfile">
                    <User className="w-4 h-4 mr-3" />
                    Update Profile
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-gray-700 text-gray-300"
                >
                  <Link to="/mentee/ComplaintSystem">
                    <FileText className="w-4 h-4 mr-3" />
                    Submit Complaint
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-gray-700 text-gray-300"
                >
                  <Link to="/mentee/MeetingPage">
                    <Calendar className="w-4 h-4 mr-3" />
                    View Schedule
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* RECENT ACTIVITY */}
            <Card className="bg-gray-800/70 border border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-200">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {activity.date}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs border-gray-600 text-gray-300"
                    >
                      {activity.status}
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MenteeDashboard;
