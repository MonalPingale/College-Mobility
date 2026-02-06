import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Layout/Navbar";
import { Users, Calendar, Clock } from "lucide-react";

// ✅ API
import {
  fetchSessionAttendanceInit,
  submitSessionAttendance,
} from "../../api/teacherAuth";

const mentorUser = {
  name: "Das Sir",
  role: "mentor",
};

const ViewOrEditAttendance = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [attendance, setAttendance] = useState([]);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const loadAttendance = async () => {
      const res = await fetchSessionAttendanceInit(sessionId);

      // ✅ default absent, if present already → keep checked
      const prepared = res.mentees.map((s) => ({
        rollNo: s.rollNo,
        name: s.name,
        email: s.email,
        status: s.attendanceStatus || "absent",
      }));

      setSessionData(res);
      setAttendance(prepared);
    };

    loadAttendance();
  }, [sessionId]);

  /* ================= TOGGLE ================= */
  const toggleAttendance = (rollNo) => {
    setAttendance((prev) =>
      prev.map((s) =>
        s.rollNo === rollNo
          ? {
              ...s,
              status: s.status === "present" ? "absent" : "present",
            }
          : s
      )
    );
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    const payload = attendance.map((s) => ({
      rollNo: s.rollNo,
      status: s.status,
    }));

    await submitSessionAttendance(sessionId, payload);
    alert("Attendance saved successfully ✅");
  };

  if (!sessionData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading attendance...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar user={mentorUser} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* SESSION INFO */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              {sessionData.session.sessionTitle}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2 text-gray-300">
            <p>
              <Calendar className="inline w-4 h-4 mr-2" />
              {sessionData.session.sessionDate}
            </p>
            <p>
              <Clock className="inline w-4 h-4 mr-2" />
              {sessionData.session.startTime}
            </p>
            <Badge className="bg-green-600">
              {sessionData.session.status}
            </Badge>
            <p className="text-sm text-gray-400">
              Mentor: {sessionData.teacherName}
            </p>
          </CardContent>
        </Card>

        {/* ATTENDANCE LIST */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Mark Attendance</CardTitle>

            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-800"
            >
              Submit Attendance
            </Button>
          </CardHeader>

          <CardContent className="space-y-3">
            {attendance.map((s) => (
              <div
                key={s.rollNo}
                className="flex justify-between items-center p-3 bg-gray-800 border border-gray-700 rounded"
              >
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-gray-400">{s.email}</p>
                </div>

                <Checkbox
                  checked={s.status === "present"}
                  onCheckedChange={() =>
                    toggleAttendance(s.rollNo)
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewOrEditAttendance;
