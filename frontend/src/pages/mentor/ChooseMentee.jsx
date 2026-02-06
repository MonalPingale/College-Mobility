import { useState } from "react";
import { Navbar } from "@/components/Layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MAX_SELECTION = 15;

const ChooseMentee = () => {
  // 🔹 Mock mentor user (same pattern as dashboards)
  const user = {
    name: "Dr. Nikhil Shrivastava",
    role: "mentor",
    avatar: null,
  };

  // 🔹 50 predefined mentees
  const initialMentees = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Mentee ${i + 1}`,
    department: ["CSE", "ECE", "ME", "EE"][i % 4],
  }));

  const [availableMentees, setAvailableMentees] = useState(initialMentees);
  const [selectedMentees, setSelectedMentees] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  const selectMentee = (mentee) => {
    if (selectedMentees.length >= MAX_SELECTION) {
      toast.error("You can select only 15 mentees");
      return;
    }

    setSelectedMentees([...selectedMentees, mentee]);
    setAvailableMentees(availableMentees.filter((m) => m.id !== mentee.id));
  };

  const replaceMentee = (mentee) => {
    setAvailableMentees([...availableMentees, mentee]);
    setSelectedMentees(selectedMentees.filter((m) => m.id !== mentee.id));
  };

  const confirmSelection = () => {
    if (selectedMentees.length !== MAX_SELECTION) {
      toast.error("Please select exactly 15 mentees");
      return;
    }
    setConfirmed(true);
    toast.success("Mentees confirmed successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* ✅ NAVBAR INSERTED HERE */}
      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Choose Your Mentees</h1>

        {/* Stats */}
        <div className="mb-6 text-gray-400">
          Selected: {selectedMentees.length} / {MAX_SELECTION} | Remaining:{" "}
          {availableMentees.length}
        </div>

        {/* Available mentees */}
        <Card className="mb-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Available Mentees</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableMentees.map((mentee) => (
              <div
                key={mentee.id}
                className="p-4 border border-gray-700 rounded-lg flex justify-between items-center hover:scale-105 transition"
              >
                <div>
                  <p className="font-semibold">{mentee.name}</p>
                  <p className="text-sm text-gray-400">{mentee.department}</p>
                </div>
                {!confirmed && (
                  <Button size="sm" onClick={() => selectMentee(mentee)}>
                    Select
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Selected mentees */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Selected Mentees</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedMentees.map((mentee) => (
              <div
                key={mentee.id}
                className="p-4 border border-gray-700 rounded-lg flex justify-between items-center hover:scale-105 transition"
              >
                <div>
                  <p className="font-semibold">{mentee.name}</p>
                  <p className="text-sm text-gray-400">{mentee.department}</p>
                </div>

                {!confirmed ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => replaceMentee(mentee)}
                  >
                    Replace
                  </Button>
                ) : (
                  <span className="text-green-400 text-sm">Confirmed</span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Confirm Button */}
        {!confirmed && (
          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={confirmSelection}
              disabled={selectedMentees.length !== MAX_SELECTION}
            >
              Confirm Selected Mentees
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseMentee;
