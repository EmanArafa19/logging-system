import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getApplications,
  createApplication,
  deleteApplication,
  getApiKey,
} from "../services/api";
import type { Application } from "../types";

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [apiKey, setApiKey] = useState("");
  const [newAppName, setNewAppName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [appsRes, apiKeyRes] = await Promise.all([
        getApplications(),
        getApiKey(),
      ]);

      setApplications(appsRes.data);
      setApiKey(apiKeyRes.data.apiKey);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateApp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAppName.trim()) return;

    try {
      await createApplication(newAppName);

      setNewAppName("");
      setShowModal(false);

      loadData();
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to create application");
    }
  };

  const handleDeleteApp = async (name: string) => {
    if (window.confirm(`Delete "${name}"? This will delete all logs too.`)) {
      try {
        await deleteApplication(name);
        loadData();
      } catch (error) {
        alert("Failed to delete application");
      }
    }
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    alert("API Key copied!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070B1A] flex items-center justify-center text-white">
        <div className="text-2xl font-semibold animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B1A] text-white">
      
      <nav className="border-b border-white/10 bg-[#0B1023]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">
            Log Manager
          </h1>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center font-bold">
              {JSON.parse(localStorage.getItem("user") || "{}")
                .username?.charAt(0)
                ?.toUpperCase()}
            </div>

            <span className="text-gray-300">
              {JSON.parse(localStorage.getItem("user") || "{}").username}
            </span>

            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-500 px-5 py-2 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-10">
    
        <div className="bg-[#11182D] border border-white/10 rounded-3xl p-8 shadow-2xl mb-8">
          <div className="flex items-center gap-4 mb-4">
            
            <div>
              <h2 className="text-2xl font-bold">Your API Key</h2>

              <p className="text-gray-400 text-sm mt-1">
                Use this API key in your client library to send logs
              </p>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap mt-6">
            <code className="flex-1 bg-[#0B1023] border border-white/10 px-5 py-4 rounded-2xl text-gray-300 break-all font-mono">
              {apiKey}
            </code>

            <button
              onClick={copyApiKey}
              className="bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Copy
            </button>
          </div>
        </div>

        
        <div className="bg-[#11182D] border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-bold">My Applications</h2>

            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              + Create Application
            </button>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-[#0B1023]">
              
              <h3 className="text-2xl font-semibold mb-2">
                No applications yet
              </h3>

              

              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 rounded-2xl hover:scale-105 transition-all duration-300"
              >
                + Create your first application
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {applications.map((app) => (
                <div
                  key={app.name}
                  className="bg-[#0B1023] border border-white/10 rounded-3xl p-6 hover:border-violet-500 hover:shadow-violet-500/20 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{app.name}</h3>

                    <span className="text-xs bg-violet-600/20 text-violet-300 px-3 py-1 rounded-full">
                      Active
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 mb-6">
                    Created:{" "}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex gap-3">
                    <Link
                      to={`/apps/${app.name}`}
                      className="flex-1 text-center bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl hover:scale-105 transition-all duration-300"
                    >
                      View Logs
                    </Link>

                    <button
                      onClick={() => handleDeleteApp(app.name)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 py-3 rounded-xl hover:scale-105 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#11182D] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">
              Create New Application
            </h2>

            <form onSubmit={handleCreateApp}>
              <input
                type="text"
                value={newAppName}
                onChange={(e) => setNewAppName(e.target.value)}
                placeholder="Application name"
                className="w-full bg-[#0B1023] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-5"
                required
                pattern="^\S+$"
                title="No spaces allowed"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 py-3 rounded-2xl hover:scale-105 transition-all duration-300"
                >
                  Create
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-700 py-3 rounded-2xl hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}