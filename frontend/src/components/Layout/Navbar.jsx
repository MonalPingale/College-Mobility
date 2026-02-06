import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

export const Navbar = ({ user = {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ SAFE defaults
  const role = user?.role || "mentee";
  const name = user?.name || "";
  const avatar = user?.avatar || "";

  const handleLogout = () => {
    toast.success("Logged out");
    navigate("/login");
  };

  // ✅ SAFE initials function
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "?";

    return name
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const navLinks =
    role === "mentor"
      ? [
          { to: "/mentor/dashboard", label: "Dashboard" },
          { to: "/mentor/MyMentees", label: "My Mentees" },
          { to: "/mentor/ScheduleMeeting", label: "Schedule" },
          { to: "/mentor/AttendanceMarking", label: "Attendance" },
          { to: "/mentor/unassigned", label: "Unassigned Students" },
        ]
      : [
          { to: "/mentee/dashboard", label: "Dashboard" },
          { to: "/mentee/MeetingPage", label: "Meetings" },
          { to: "/mentee/MenteeProfile", label: "Profile" },
          { to: "/mentee/ComplaintSystem", label: "Complaints" },
        ];

  return (
    <nav className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <Link
            to={role === "mentor" ? "/mentor/dashboard" : "/mentee/dashboard"}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent"
          >
            MentorMeet
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {getInitials(name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-56 bg-gray-800 border-gray-700"
                align="end"
              >
                <DropdownMenuLabel>
                  <p className="text-sm font-medium text-white">
                    {name || "User"}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">{role}</p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-gray-700" />

                <DropdownMenuItem
                  onClick={() =>
                    navigate(
                      role === "mentor"
                        ? "/mentor/MentorProfile"
                        : "/mentee/profile"
                    )
                  }
                  className="cursor-pointer"
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <LogOut className="inline mr-2 h-4 w-4" />
            Log out
          </button>
        </div>
      )}
    </nav>
  );
};
