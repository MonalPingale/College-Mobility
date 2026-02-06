import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Layout/Navbar";
import { toast } from "sonner";
import { Calendar } from "lucide-react";

import { createSession } from "@/api/teacherAuth";

const mockUser = {
  name: "Das Sir",
  role: "mentor",
};

const ScheduleMeeting = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    sessionTitle: "",
    topic: "",
    sessionDate: "",
    startTime: "",
    endTime: "",
  });

  // ⏱ duration = end - start
  const getDurationMinutes = (start, end) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    return eh * 60 + em - (sh * 60 + sm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const durationMinutes = getDurationMinutes(
      form.startTime,
      form.endTime
    );

    if (durationMinutes <= 0) {
      toast.error("End time must be after start time");
      return;
    }

    const payload = {
      sessionTitle: form.sessionTitle,
      topic: form.topic,
      sessionDate: form.sessionDate,
      startTime: form.startTime,
      durationMinutes,
      status: "scheduled",
    };

    try {
      await createSession(payload);
      toast.success("Session created successfully ✅");
      navigate("/mentor/dashboard");
    } catch (err) {
      toast.error("Failed to create session ❌");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar user={mockUser} />

      <div className="max-w-xl mx-auto px-6 py-8">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              Create Session
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label>Session Title</Label>
                <Input
                  value={form.sessionTitle}
                  onChange={(e) =>
                    setForm({ ...form, sessionTitle: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Topic</Label>
                <Input
                  value={form.topic}
                  onChange={(e) =>
                    setForm({ ...form, topic: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={form.sessionDate}
                  onChange={(e) =>
                    setForm({ ...form, sessionDate: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={form.startTime}
                    onChange={(e) =>
                      setForm({ ...form, startTime: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={form.endTime}
                    onChange={(e) =>
                      setForm({ ...form, endTime: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <Button className="w-full bg-blue-600">
                Create Session
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
