import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Layout/Navbar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { fetchStudentProfile } from "../../api/studentAuth";

const mockUser = {
  name: "Loading...",
  role: "mentee",
};

const MenteeProfile = () => {
  /* ================= STATIC DATA (UNCHANGED) ================= */
  const menteeData = {
    aadhaarNo: "XXXX-XXXX-XXXX",
    fatherName: "Haidnath",
    motherName: "Suvarna",
    dob: "2004-03-15",
    bloodGroup: "A+",
    address: "Pune, Maharashtra, India",
    mobile: "9876543210",
    parentContact: "9876501234",
    hobbies: "Photography, Coding",
    shortTermGoal: "9.4+ CGPA in First Year",
    longTermGoal: "Software Engineer",
    additionalCourses: "MSCIT",
    xPercentage: "86.64%",
    xiiPercentage: "88.19%",
    cetScore: "73",
    physicsMarks: "53",
    chemistryMarks: "48",
    mathsMarks: "68",
  };

  /* ================= DYNAMIC DATA (FROM BACKEND) ================= */
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    rollNo: "",
    department: "",
    mentorName: "",
  });

  const [loading, setLoading] = useState(true);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchStudentProfile();
        setProfile({
          name: data.name,
          email: data.email,
          rollNo: data.rollNo,
          department: data.department,
          mentorName: data.mentorName,
        });
      } catch (err) {
        console.error("Profile fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <Navbar user={{ ...mockUser, name: profile.name }} />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <User className="w-6 h-6 text-blue-400" />
            Mentee Profile
          </h1>
          <p className="text-gray-300">
            View and update your personal and academic information.
          </p>
        </div>

        {/* ================= PERSONAL INFORMATION ================= */}
        <Card className="bg-gray-900/80 border border-gray-700 text-gray-100">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* PHOTO + NAME */}
            <div className="flex flex-col items-center mb-6">
              <img
                src="https://images.unsplash.com/photo-1757254161345-b4a0238ed1c0?auto=format&fit=crop&q=60&w=600"
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-blue-400"
              />
              <p className="mt-2 text-lg font-semibold">
                {profile.name}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ✅ Mentor Name (dynamic) */}
              <div>
                <Label>Name of Mentor</Label>
                <Input
                  value={profile.mentorName || ""}
                  readOnly
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              {/* ✅ Roll No */}
              <div>
                <Label>Roll No</Label>
                <Input
                  value={profile.rollNo}
                  readOnly
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              {/* ✅ Department → Branch */}
              <div>
                <Label>Branch</Label>
                <Input
                  value={profile.department}
                  readOnly
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label>Aadhaar No</Label>
                <Input
                  value={menteeData.aadhaarNo}
                  readOnly
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  value={menteeData.dob}
                  readOnly
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              {/* ✅ Email */}
              <div>
                <Label>Email</Label>
                <Input
                  value={profile.email}
                  readOnly
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label>Blood Group</Label>
                <Input
                  value={menteeData.bloodGroup}
                  readOnly
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label>Mobile No</Label>
                <Input
                  value={menteeData.mobile}
                  readOnly
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <Label>Address</Label>
              <Textarea
                value={menteeData.address}
                readOnly
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* ================= बाकी sections unchanged ================= */}

        <div className="flex justify-end mt-6">
          <Button className="bg-blue-700 text-white hover:bg-emerald-900">
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenteeProfile;
