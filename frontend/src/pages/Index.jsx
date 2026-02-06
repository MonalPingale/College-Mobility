import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            MentorMeet
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connecting mentors and mentees for successful academic journeys
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-6 text-center hover:shadow-xl hover:shadow-blue-500/10 transition">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                For Mentors
              </h3>
              <p className="text-gray-400">
                Schedule meetings, track attendance, and guide your mentees
                effectively
              </p>
            </div>

            <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-6 text-center hover:shadow-xl hover:shadow-teal-500/10 transition">
              <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                For Students
              </h3>
              <p className="text-gray-400">
                Stay connected with your mentor and track your academic progress
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/auth"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium shadow-md shadow-blue-500/30 transition"
            >
              Get Started
            </Link>
            <Link
              to="/auth"
              className="border border-gray-600 text-gray-300 hover:bg-gray-700 px-8 py-3 rounded-lg font-medium transition"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">1000+</div>
              <div className="text-sm text-gray-400">Students</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">50+</div>
              <div className="text-sm text-gray-400">Mentors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">5000+</div>
              <div className="text-sm text-gray-400">Meetings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">95%</div>
              <div className="text-sm text-gray-400">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
