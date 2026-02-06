import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableHead, TableCell,
  TableHeader, TableRow
} from "@/components/ui/table";
import { Navbar } from "@/components/Layout/Navbar";
import {
  User, Mail, Phone, Search, Eye, MessageCircle, Calendar
} from "lucide-react";

import { fetchMentorMentees } from "../../api/teacherAuth";

const mockUser = {
  name: "Dr. Suraj Prajapati",
  role: "mentor",
};

const MyMentees = () => {
  const [mentees, setMentees] = useState([]);
  const [filteredMentees, setFilteredMentees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadMentees = async () => {
      try {
        const data = await fetchMentorMentees();
        setMentees(data);
        setFilteredMentees(data);
      } catch (err) {
        console.error("Failed to fetch mentees", err);
      }
    };
    loadMentees();
  }, []);

  /* SEARCH */
  const handleSearch = (value) => {
    setSearchTerm(value);
    setFilteredMentees(
      mentees.filter(
        (m) =>
          m.name.toLowerCase().includes(value.toLowerCase()) ||
          m.email.toLowerCase().includes(value.toLowerCase()) ||
          String(m.rollNo).includes(value)
      )
    );
  };

  /* ATTENDANCE COLOR */
  const getAttendanceColor = (rate) => {
    if (rate >= 75) return "text-green-400";
    if (rate >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  /* STATUS */
  const getStatusBadge = (rate) => {
    if (rate < 50) {
      return (
        <Badge className="bg-red-700 text-white">
          Needs Attention
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-600 text-white">
        Active
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar user={mockUser} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">{mockUser.name}</h1>
        <p className="text-gray-400 mb-6">
          Manage and track your assigned mentees
        </p>

        {/* TABLE */}
        <Card className="bg-gray-800 border border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Mentee List</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="Search mentee..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-700 text-white"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Info</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Year & Dept</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Counts</TableHead>
                  <TableHead>Last Meeting</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredMentees.map((m) => (
                  <TableRow key={m.rollNo}>
                    {/* STUDENT INFO */}
                    <TableCell>
                      <p className="font-medium text-blue-400">
                        {m.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        Roll No: {m.rollNo}
                      </p>
                    </TableCell>

                    {/* CONTACT */}
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3 text-blue-400" />
                        {m.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3 text-blue-400" />
                        9999999999
                      </div>
                    </TableCell>

                    {/* YEAR & DEPT */}
                    <TableCell>
                      <p>2nd Year</p>
                      <p className="text-sm text-gray-400">
                        Computer Science
                      </p>
                    </TableCell>

                    {/* ATTENDANCE */}
                    <TableCell>
                      <span
                        className={`font-medium ${getAttendanceColor(
                          m.attendancePercentage
                        )}`}
                      >
                        {m.attendancePercentage}%
                      </span>
                      <Progress
                        value={m.attendancePercentage}
                        className="w-20 mt-1"
                      />
                    </TableCell>

                    {/* COUNTS */}
                    <TableCell className="text-sm">
                      <p>Total: {m.totalSessions}</p>
                      <p className="text-green-400">
                        Present: {m.presentCount}
                      </p>
                      <p className="text-red-400">
                        Absent: {m.absentCount}
                      </p>
                    </TableCell>

                    {/* LAST MEETING */}
                    <TableCell>2024-01-15</TableCell>

                    {/* STATUS */}
                    <TableCell>
                      {getStatusBadge(m.attendancePercentage)}
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyMentees;
