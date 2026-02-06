import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Navbar } from "@/components/Layout/Navbar";
import { TrendingUp, Users, Calendar, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const mockUser = {
  name: "Dr. Suraj Prajapati",
  role: "mentor",
  avatar: "",
};

const attendanceRecords = [
  {
    studentId: "1",
    studentName: "John Smith",
    totalMeetings: 28,
    attendedMeetings: 24,
    attendancePercentage: 86,
    lastAttendance: "2024-01-15",
  },
  {
    studentId: "2",
    studentName: "Emma Davis",
    totalMeetings: 28,
    attendedMeetings: 26,
    attendancePercentage: 93,
    lastAttendance: "2024-01-15",
  },
  {
    studentId: "3",
    studentName: "Alex Johnson",
    totalMeetings: 28,
    attendedMeetings: 20,
    attendancePercentage: 71,
    lastAttendance: "2024-01-10",
  },
  {
    studentId: "4",
    studentName: "Sarah Wilson",
    totalMeetings: 28,
    attendedMeetings: 27,
    attendancePercentage: 96,
    lastAttendance: "2024-01-15",
  },
  {
    studentId: "5",
    studentName: "Mike Brown",
    totalMeetings: 28,
    attendedMeetings: 22,
    attendancePercentage: 79,
    lastAttendance: "2024-01-12",
  },
];

const getAttendanceColor = (percentage) => {
  if (percentage >= 90) return "text-green-400";
  if (percentage >= 75) return "text-yellow-400";
  return "text-red-400";
};

const getAttendanceBadge = (percentage) => {
  if (percentage >= 90) return "default";
  if (percentage >= 75) return "secondary";
  return "destructive";
};

const AttendanceAnalytics = () => {
  const overallStats = {
    totalStudents: attendanceRecords.length,
    averageAttendance: Math.round(
      attendanceRecords.reduce(
        (sum, record) => sum + record.attendancePercentage,
        0
      ) / attendanceRecords.length
    ),
    excellentAttendance: attendanceRecords.filter(
      (r) => r.attendancePercentage >= 90
    ).length,
    poorAttendance: attendanceRecords.filter((r) => r.attendancePercentage < 75)
      .length,
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100">
      <Navbar user={mockUser} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Attendance Analytics</h1>
          <p className="text-gray-400">
            Comprehensive attendance tracking and student performance analysis.
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overallStats.totalStudents}
              </div>
              <p className="text-xs text-gray-400">Under your mentorship</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-100">
                Average Attendance
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overallStats.averageAttendance}%
              </div>
              <Progress
                value={overallStats.averageAttendance}
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-100">
                Excellent Attendance
              </CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                {overallStats.excellentAttendance}
              </div>
              <p className="text-xs text-gray-400">90% or above</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-100">
                Need Attention
              </CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">
                {overallStats.poorAttendance}
              </div>
              <p className="text-xs text-gray-400">Below 75%</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Attendance Table */}
        <Card className="bg-gray-800 border border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-200">
                Student Attendance Records
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-yellow-500 border-yellow-700 text-gray-200 hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="bg-red-700 border-emerald-950 text-gray-200 hover:bg-emerald-900 transform hover:scale-105 transition-all duration-300"
                >
                  <Link to="/mentor/attendance">Mark Attendance</Link>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-700/30">
                  <TableHead className="text-gray-300">Student Name</TableHead>
                  <TableHead className="text-gray-300">
                    Total Meetings
                  </TableHead>
                  <TableHead className="text-gray-300">Attended</TableHead>
                  <TableHead className="text-gray-300">Attendance %</TableHead>
                  <TableHead className="text-gray-300">
                    Last Attendance
                  </TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <TableRow
                    key={record.studentId}
                    className="border-gray-700 hover:bg-gray-700/20"
                  >
                    <TableCell className="font-medium">
                      <Link
                        to={`/mentor/student/${record.studentId}`}
                        className="text-blue-500 hover:underline"
                      >
                        {record.studentName}
                      </Link>
                    </TableCell>
                    <TableCell>{record.totalMeetings}</TableCell>
                    <TableCell>{record.attendedMeetings}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium ${getAttendanceColor(
                            record.attendancePercentage
                          )}`}
                        >
                          {record.attendancePercentage}%
                        </span>
                        <Progress
                          value={record.attendancePercentage}
                          className="w-20 h-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{record.lastAttendance}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getAttendanceBadge(
                          record.attendancePercentage
                        )}
                      >
                        {record.attendancePercentage >= 90
                          ? "Excellent"
                          : record.attendancePercentage >= 75
                          ? "Good"
                          : "Poor"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="bg-blue-700 border-blue-900 text-gray-200 hover:bg-blue-800 transform hover:scale-110 transition-all duration-300"
                      >
                        <Link to={`/mentor/student/${record.studentId}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Follow-up, Top Performers, Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Follow-up Required */}
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-200">
                Follow-up Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {attendanceRecords
                  .filter((r) => r.attendancePercentage < 75)
                  .map((student) => (
                    <div
                      key={student.studentId}
                      className="flex items-center justify-between p-2 border border-gray-700 rounded"
                    >
                      <span className="text-sm text-gray-100">
                        {student.studentName}
                      </span>
                      <Badge variant="destructive">
                        {student.attendancePercentage}%
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-200">Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {attendanceRecords
                  .filter((r) => r.attendancePercentage >= 90)
                  .slice(0, 3)
                  .map((student) => (
                    <div
                      key={student.studentId}
                      className="flex items-center justify-between p-2 border border-gray-700 rounded"
                    >
                      <span className="text-sm text-gray-100">
                        {student.studentName}
                      </span>
                      <Badge variant="default">
                        {student.attendancePercentage}%
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-200">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-gray-100 text-sm">
                <div>Last meeting: Jan 15, 2024</div>
                <div>Students attended: 24/28</div>
                <div>Attendance rate: 86%</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AttendanceAnalytics;
