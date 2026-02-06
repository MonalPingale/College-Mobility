import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Layout/Navbar";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Briefcase, Calendar, BookOpen, Users } from "lucide-react";

const MentorProfile = () => {
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    // ✅ Predefined mock mentor data
    setMentor({
      name: "Dr. Sakshu Sharma",
      department: "Computer Engineering",
      id: "MNT-1024",
      contact: "+91 9876543210",
      mentees: 15,
      experience: "10 years",
      address: "123, Green Valley, Pune, India",
      dob: "1985-03-12",
      areaOfInterest: "Artificial Intelligence, Data Science, Machine Learning",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    });
  }, []);

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-300">
        Loading Mentor Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navbar - can use your existing one */}
      <Navbar
        user={{ name: mentor.name, role: "mentor", avatar: mentor.image }}
      />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-gray-800/70 border border-gray-700 shadow-xl">
            <CardHeader className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-32 h-32 rounded-full border-4 border-blue-700 shadow-lg"
              />
              <div>
                <CardTitle className="text-3xl font-semibold text-white">
                  {mentor.name}
                </CardTitle>
                <p className="text-gray-400 mt-1">
                  {mentor.department} Department
                </p>
                <p className="text-sm text-blue-400 mt-1">
                  Mentor ID: {mentor.id}
                </p>
              </div>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <Label className="text-gray-400 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Contact Number
                </Label>
                <Input
                  value={mentor.contact}
                  readOnly
                  className="bg-gray-900/40 text-gray-200 border-gray-700 mt-1"
                />
              </div>

              <div>
                <Label className="text-gray-400 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Mentees
                </Label>
                <Input
                  value={mentor.mentees}
                  readOnly
                  className="bg-gray-900/40 text-gray-200 border-gray-700 mt-1"
                />
              </div>

              <div>
                <Label className="text-gray-400 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Experience
                </Label>
                <Input
                  value={mentor.experience}
                  readOnly
                  className="bg-gray-900/40 text-gray-200 border-gray-700 mt-1"
                />
              </div>

              <div>
                <Label className="text-gray-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Date of Birth
                </Label>
                <Input
                  value={mentor.dob}
                  readOnly
                  className="bg-gray-900/40 text-gray-200 border-gray-700 mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <Label className="text-gray-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Address
                </Label>
                <Input
                  value={mentor.address}
                  readOnly
                  className="bg-gray-900/40 text-gray-200 border-gray-700 mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <Label className="text-gray-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Area of Interest
                </Label>
                <Input
                  value={mentor.areaOfInterest}
                  readOnly
                  className="bg-gray-900/40 text-gray-200 border-gray-700 mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex justify-end"
        >
          <Button className="bg-blue-700 hover:bg-emerald-900 text-white shadow-md px-6">
            Edit Profile
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default MentorProfile;
