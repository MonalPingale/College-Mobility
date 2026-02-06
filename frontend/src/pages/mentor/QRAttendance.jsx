import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Layout/Navbar";
import { QrCode, Clock, Users, RefreshCw, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import QRCode from "qrcode";

const mockUser = {
  name: "Dr. Sarah Johnson",
  role: "mentor",
  avatar: "",
};

const mockMeeting = {
  id: "meeting-123",
  title: "Weekly Progress Review",
  date: "2024-01-18",
  time: "2:00 PM",
  duration: "60 minutes",
  expectedAttendees: 12,
};

const QRAttendance = () => {
  const [qrCodeData, setQrCodeData] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [attendanceList, setAttendanceList] = useState([]);

  const generateQRCode = async () => {
    const attendanceData = {
      meetingId: mockMeeting.id,
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    };

    const qrString = JSON.stringify(attendanceData);
    const qrDataURL = await QRCode.toDataURL(qrString, {
      width: 256,
      margin: 2,
      color: {
        dark: "#FFFFFF", // White QR for dark background
        light: "#1E1E2E", // Dark base background
      },
    });

    setQrCodeData(qrDataURL);
    setIsActive(true);
    setTimeRemaining(300);

    // Simulated student scans
    setTimeout(() => {
      setAttendanceList((prev) => [
        ...prev,
        {
          id: "1",
          name: "John Smith",
          timestamp: new Date().toLocaleTimeString(),
          status: "present",
        },
      ]);
    }, 2000);

    setTimeout(() => {
      setAttendanceList((prev) => [
        ...prev,
        {
          id: "2",
          name: "Emma Davis",
          timestamp: new Date().toLocaleTimeString(),
          status: "present",
        },
      ]);
    }, 4000);

    setTimeout(() => {
      setAttendanceList((prev) => [
        ...prev,
        {
          id: "3",
          name: "Alex Johnson",
          timestamp: new Date().toLocaleTimeString(),
          status: "present",
        },
      ]);
    }, 6000);
  };

  const stopQRSession = () => {
    setIsActive(false);
    setTimeRemaining(0);
  };

  useEffect(() => {
    let interval = null;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100">
      <Navbar user={mockUser} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            QR Code Attendance
          </h1>
          <p className="text-gray-400">
            Generate QR codes for quick and contactless attendance marking.
          </p>
        </div>

        {/* Meeting Info */}
        <Card className="bg-gray-800 border border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Meeting Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-400">
                  Meeting Title
                </h4>
                <p className="text-lg font-semibold text-white">
                  {mockMeeting.title}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-400">
                  Date & Time
                </h4>
                <p className="text-lg font-semibold text-white">
                  {mockMeeting.date} at {mockMeeting.time}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-400">Duration</h4>
                <p className="text-lg font-semibold text-white">
                  {mockMeeting.duration}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-400">
                  Expected Attendees
                </h4>
                <p className="text-lg font-semibold text-white">
                  {mockMeeting.expectedAttendees} students
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Code Generation */}
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <QrCode className="w-5 h-5" />
                QR Code Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isActive ? (
                <div className="text-center space-y-4">
                  <div className="w-64 h-64 mx-auto border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                      <p className="text-gray-400">Click to generate QR code</p>
                    </div>
                  </div>
                  <Button
                    onClick={generateQRCode}
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all duration-300"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="relative">
                    <img
                      src={qrCodeData}
                      alt="QR Code for attendance"
                      className="w-64 h-64 mx-auto border rounded-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={timeRemaining > 60 ? "default" : "destructive"}
                        className="bg-gray-700 text-white"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTime(timeRemaining)}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">
                      Students can scan this QR code to mark their attendance
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={generateQRCode}
                        variant="outline"
                        className="flex-1 border-blue-800 hover:bg-blue-800 hover:border-blue-900 bg-blue-700 text-white hover:scale-105 transition-all duration-300"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                      <Button
                        onClick={stopQRSession}
                        variant="destructive"
                        className="flex-1 bg-red-700 hover:bg-red-800 text-white hover:scale-105 transition-all duration-300"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Stop Session
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Live Attendance */}
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="w-5 h-5" />
                  Live Attendance
                </CardTitle>
                <Badge
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                >
                  {attendanceList.length}/{mockMeeting.expectedAttendees}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceList.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                    <p className="text-gray-400">
                      {isActive
                        ? "Waiting for students to scan..."
                        : "No attendance records yet"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {attendanceList.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-3 border border-gray-600 rounded-lg bg-gray-700/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              {student.name}
                            </p>
                            <p className="text-sm text-gray-400">
                              Scanned at {student.timestamp}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-600 text-white">
                          Present
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8 bg-gray-800 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              How to Use QR Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Generate QR Code",
                  text: "Click the generate button to create a time-limited QR code for your meeting.",
                },
                {
                  step: "2",
                  title: "Share with Students",
                  text: "Display the QR code on screen or share it with students via projection.",
                },
                {
                  step: "3",
                  title: "Track Attendance",
                  text: "Monitor real-time attendance as students scan the QR code with their phones.",
                },
              ].map((s) => (
                <div className="text-center" key={s.step}>
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 hover:scale-105 transition-all duration-300">
                    <span className="text-xl font-bold text-gray-100">
                      {s.step}
                    </span>
                  </div>
                  <h4 className="font-medium mb-2 text-white">{s.title}</h4>
                  <p className="text-sm text-gray-400">{s.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRAttendance;
