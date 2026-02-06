import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ViewStudentAttendance from "./pages/mentor/ViewOrEditAttendance";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import MenteeDashboard from "./pages/mentee/MenteeDashboard";
import UnassignedStudents from "./pages/mentor/UnassignedStudents";
import ScheduleMeeting from "./pages/mentor/ScheduleMeeting";
import AttendanceMarking from "./pages/mentor/AttendanceMarking";
import MyMentees from "./pages/mentor/MyMentees";
import AttendanceAnalytic from "./pages/mentor/AttendanceAnalytics";
import MentorProfile from "./pages/mentor/MentorProfile";
import QRAttendance from "./pages/mentor/QRAttendance";
import ComplaintSystem from "./pages/mentee/ComplaintSystem";
import MeetingPage from "./pages/mentee/MeetingPage";
import MenteeProfile from "./pages/mentee/MenteeProfile";
import ChooseMentee from "./pages/mentor/ChooseMentee";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/mentee/dashboard" element={<MenteeDashboard />} />
          
          <Route path="/mentee/ComplaintSystem" element={<ComplaintSystem />} />
          <Route path="/mentee/MeetingPage" element={<MeetingPage />} />
          <Route path="/mentee/MenteeProfile" element={<MenteeProfile />} />
          <Route path="/mentor/dashboard" element={<MentorDashboard />} />
          <Route path="/mentor/ScheduleMeeting" element={<ScheduleMeeting />} />
          <Route path="/mentor/AttendanceMarking" element={<AttendanceMarking />} />
          <Route path="/mentor/MyMentees" element={<MyMentees />} />
          <Route path="/mentor/AttendanceAnalytics" element={<AttendanceAnalytic />} />
          <Route path="/mentor/MentorProfile" element={<MentorProfile />} />
          <Route path="/mentor/QRAttendance" element={<QRAttendance />} />
          <Route path="/mentor/ChooseMentee" element={<ChooseMentee />} />
            ✅ {/* THIS IS THE FIX */}
  <Route path="/mentor/unassigned" element={<UnassignedStudents />} />
 
<Route
  path="/mentor/attendance/:sessionId"
  element={<ViewStudentAttendance />}
/>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
