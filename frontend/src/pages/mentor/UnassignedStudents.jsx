import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Layout/Navbar";
import { toast } from "sonner";

import {
  fetchUnassignedStudents,
  assignStudentsToMentor,
} from "../../api/teacherAuth";

const mentorUser = {
  name: "Mentor",
  role: "mentor",
};

const UnassignedStudents = () => {
  const [students, setStudents] = useState([]);   // all unassigned
  const [selected, setSelected] = useState([]);   // selected students
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  /* ================= FETCH ALL STUDENTS ================= */
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchUnassignedStudents();
        setStudents(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch students ❌");
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, []);

  /* ================= SELECT STUDENT ================= */
  const handleSelect = (student) => {
    setSelected((prev) => [...prev, student]);
    setStudents((prev) =>
      prev.filter((s) => s.rollNo !== student.rollNo)
    );
  };

  /* ================= REMOVE SELECTED ================= */
  const handleRemove = (student) => {
    setStudents((prev) => [...prev, student]);
    setSelected((prev) =>
      prev.filter((s) => s.rollNo !== student.rollNo)
    );
  };

  /* ================= ASSIGN MENTOR ================= */
  const handleAssignMentor = async () => {
    if (selected.length === 0) {
      toast.error("Please select at least one student");
      return;
    }

    const payload = {
      studentRollNos: selected.map((s) => s.rollNo),
    };

    try {
      setAssigning(true);
      await assignStudentsToMentor(payload);
      toast.success("Mentor assigned successfully 🎉");
      setSelected([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign mentor ❌");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar user={mentorUser} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">
          Remaining students who have not allocated any mentor
        </h1>
        <p className="text-gray-400 mb-6">
          Select students to assign mentor
        </p>

        {/* ================= UNASSIGNED LIST ================= */}
        <Card className="bg-gray-800 border border-gray-700 mb-8">
          <CardHeader>
            <CardTitle>Unassigned Students</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {loading && <p className="text-gray-400">Loading...</p>}

            {!loading && students.length === 0 && (
              <p className="text-gray-400">
                No more unassigned students 🎉
              </p>
            )}

            {students.map((s) => (
              <div
                key={s.rollNo}
                className="flex justify-between items-center p-3 bg-gray-900 border border-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-blue-400">
                    {s.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    Roll No: {s.rollNo} | {s.department}
                  </p>
                </div>

                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-800"
                  onClick={() => handleSelect(s)}
                >
                  Select
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ================= SELECTED STUDENTS ================= */}
        {selected.length > 0 && (
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle>Selected Students</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {selected.map((s) => (
                <div
                  key={s.rollNo}
                  className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center bg-gray-900 p-3 rounded-lg"
                >
                  <Input value={s.name} readOnly />
                  <Input value={s.rollNo} readOnly />
                  <Input value={s.email} readOnly />
                  <Input value={s.department} readOnly />

                  <Button
                    variant="destructive"
                    onClick={() => handleRemove(s)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button
                className="bg-green-600 hover:bg-green-800 mt-4"
                onClick={handleAssignMentor}
                disabled={assigning}
              >
                {assigning ? "Assigning..." : "Assign Mentor"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UnassignedStudents;
