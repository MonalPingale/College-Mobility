import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Navbar } from "@/components/Layout/Navbar";
import { toast } from "sonner";
import { FileText, Plus, Eye, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockUser = {
  name: "John Smith",
  role: "mentee",
  avatar: "",
};

const mockComplaints = [
  {
    id: "1",
    title: "Lab Equipment Not Working",
    description:
      "The computers in Lab 301 are frequently crashing and affecting our practical sessions.",
    category: "infrastructure",
    status: "under_review",
    submittedAt: "2024-01-15T10:00:00Z",
    actions: [
      {
        id: "1",
        action: "Issue reported to IT department",
        takenBy: "Admin",
        takenAt: "2024-01-16T09:00:00Z",
        status: "in_progress",
      },
    ],
  },
  {
    id: "2",
    title: "Teaching Method Concern",
    description:
      "The current teaching approach in Advanced Mathematics is too fast-paced for most students to follow.",
    category: "teaching",
    status: "resolved",
    submittedAt: "2024-01-10T14:30:00Z",
    actions: [
      {
        id: "2",
        action: "Discussed with faculty head",
        takenBy: "Academic Dean",
        takenAt: "2024-01-12T11:00:00Z",
        status: "completed",
      },
      {
        id: "3",
        action: "Additional tutorial sessions arranged",
        takenBy: "Department Head",
        takenAt: "2024-01-14T16:00:00Z",
        status: "completed",
      },
    ],
  },
];

const ComplaintSystem = () => {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      "Complaint submitted successfully! You will receive updates on its progress."
    );
    setFormData({ title: "", description: "", category: "" });
    setIsSubmitDialogOpen(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "submitted":
        return (
          <Badge className="bg-blue-600 text-white flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Submitted
          </Badge>
        );
      case "under_review":
        return (
          <Badge className="bg-emerald-600 text-white flex items-center gap-1">
            <Eye className="w-3 h-3" />
            Under Review
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-green-600 text-white flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Resolved
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "staff":
        return "bg-blue-500";
      case "teaching":
        return "bg-purple-500";
      case "infrastructure":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <Navbar user={mockUser} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Complaint System
            </h1>
            <p className="text-gray-400">
              Submit anonymous complaints and track their progress.
            </p>
          </div>

          <Dialog
            open={isSubmitDialogOpen}
            onOpenChange={setIsSubmitDialogOpen}
          >
            <DialogTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="flex items-center gap-2 bg-blue-600 border border-blue-600 
                  hover:bg-emerald-900 hover:border-emerald-900 text-white transition"
                >
                  <Plus className="w-4 h-4" />
                  Submit Complaint
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent
              className="max-w-md bg-gray-900 text-gray-100 border border-gray-700"
              asChild
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader>
                  <DialogTitle>Submit New Complaint</DialogTitle>
                </DialogHeader>
                {/* form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 text-gray-100 border border-gray-700">
                        <SelectItem value="staff">Staff Related</SelectItem>
                        <SelectItem value="teaching">
                          Teaching Method
                        </SelectItem>
                        <SelectItem value="infrastructure">
                          Infrastructure
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      className="bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Brief title for your complaint"
                      required
                    />
                  </div>
                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      className="bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Detailed description of the issue..."
                      rows={4}
                      required
                    />
                  </div>
                  {/* Note */}
                  <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">Anonymous Submission</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Your identity will remain completely confidential.
                    </p>
                  </div>
                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="flex-1 bg-blue-600 border-blue-600 hover:bg-emerald-900 text-white"
                    >
                      Submit Complaint
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-blue-600 text-blue-400 hover:bg-emerald-900 hover:text-white"
                      onClick={() => setIsSubmitDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </motion.div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Complaints Tabs */}
        <Tabs defaultValue="my-complaints" className="space-y-6">
          <TabsList className="bg-gray-800 border border-gray-700">
            <TabsTrigger
              value="my-complaints"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
            >
              My Complaints
            </TabsTrigger>
            <TabsTrigger
              value="guidelines"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
            >
              Guidelines
            </TabsTrigger>
          </TabsList>

          {/* Complaints Content */}
          <TabsContent value="my-complaints">
            <motion.div
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
            >
              {mockComplaints.map((complaint) => (
                <motion.div
                  key={complaint.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="bg-gray-900 border border-gray-700 shadow-md hover:shadow-lg hover:border-blue-600 transition">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 text-white">
                            {complaint.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <Badge
                              className={getCategoryColor(complaint.category)}
                            >
                              {complaint.category}
                            </Badge>
                            <span>
                              Submitted:{" "}
                              {new Date(
                                complaint.submittedAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {getStatusBadge(complaint.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">
                        {complaint.description}
                      </p>
                      {/* Actions */}
                      {complaint.actions.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm text-gray-200">
                            Actions Taken:
                          </h4>
                          <div className="space-y-2">
                            {complaint.actions.map((action) => (
                              <motion.div
                                key={action.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-start gap-3 p-3 bg-gray-800 rounded border border-gray-700"
                              >
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <p className="text-sm text-gray-200">
                                    {action.action}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    By {action.takenBy} on{" "}
                                    {new Date(
                                      action.takenAt
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Guidelines */}
          <TabsContent value="guidelines">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-900 border border-gray-700 shadow-md">
                <CardHeader>
                  <CardTitle className="text-white">
                    Complaint Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-medium mb-2">
                      What can you complaint about?
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Teaching methods and faculty concerns</li>
                      <li>Staff behavior and administrative issues</li>
                      <li>
                        Infrastructure problems (labs, classrooms, facilities)
                      </li>
                      <li>Academic policy concerns</li>
                      <li>Discrimination or harassment issues</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      How to write effective complaints:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Be specific and provide clear details</li>
                      <li>Include dates, times, and locations when relevant</li>
                      <li>Focus on facts rather than emotions</li>
                      <li>Suggest potential solutions if possible</li>
                      <li>Be respectful and professional in your language</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <h4 className="font-medium mb-2 flex items-center gap-2 text-white">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      Privacy & Confidentiality
                    </h4>
                    <p className="text-sm text-gray-300">
                      All complaints are submitted anonymously. Your identity
                      will not be revealed to anyone.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComplaintSystem;
