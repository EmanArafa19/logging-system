import { useNavigate } from "react-router-dom";

interface NavbarProps {
  appName?: string;
}

export default function Navbar({
  appName,
}: NavbarProps) {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0B1023]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">

          
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">
              Log Manager
            </h1>

            {appName && (
              <>
                <span className="text-gray-600 text-xl">
                  /
                </span>

                <span className="bg-violet-600/20 text-violet-300 px-4 py-1 rounded-full text-sm font-medium border border-violet-500/20">
                  {appName}
                </span>
              </>
            )}
          </div>
        </div>

        
        <div className="flex items-center gap-4">
        
          <div className="hidden sm:flex items-center gap-3 bg-[#11182D] border border-white/10 px-4 py-2 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center font-bold text-white">
              {user.username
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </div>

            <span className="text-gray-300 font-medium">
              {user.username || "User"}
            </span>
          </div>

        
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-2 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}