import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLogs } from "../services/api";
import Navbar from "../components/Navbar";
import LogsTable from "../components/LogsTable";
import PieChartComponent from "../components/PieChart";
import LineChartComponent from "../components/LineChart";
import type { Log, ChartData, DailyLogData } from "../types";

export default function AppDetails() {
  const { appName } = useParams();

  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [sort, setSort] = useState<"recent" | "count">("recent");

  const [level, setLevel] = useState<string>("");

  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState<
    "table" | "charts"
  >("table");

  useEffect(() => {
    loadLogs();
  }, [appName, currentPage, sort, level, search]);

  const loadLogs = async () => {
    if (!appName) return;

    setLoading(true);

    try {
      const response = await getLogs(appName, {
        page: currentPage,
        limit: 10,
        sort,
        level: level as any,
        search,
      });

      setLogs(response.data.logs);

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to load logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPieChartData = (): ChartData[] => {
    const counts = {
      INFO: 0,
      WARN: 0,
      ERROR: 0,
    };

    logs.forEach((log) => {
      counts[log.level]++;
    });

    return [
      {
        name: "INFO",
        value: counts.INFO,
        color: "#10B981",
      },
      {
        name: "WARN",
        value: counts.WARN,
        color: "#F59E0B",
      },
      {
        name: "ERROR",
        value: counts.ERROR,
        color: "#EF4444",
      },
    ].filter((d) => d.value > 0);
  };

  const getLineChartData = (): DailyLogData[] => {
    const dailyMap = new Map<
      string,
      {
        INFO: number;
        WARN: number;
        ERROR: number;
      }
    >();

    logs.forEach((log) => {
      const date = new Date(
        log.createdAt
      ).toLocaleDateString();

      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          INFO: 0,
          WARN: 0,
          ERROR: 0,
        });
      }

      const day = dailyMap.get(date)!;

      day[log.level]++;
    });

    return Array.from(dailyMap.entries())
      .map(([date, counts]) => ({
        date,
        ...counts,
      }))
      .sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      )
      .slice(-7);
  };

  return (
    <div className="min-h-screen bg-[#070B1A] text-white">
      <Navbar appName={appName} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab("table")}
            className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
              activeTab === "table"
                ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg"
                : "bg-[#11182D] border border-white/10 text-gray-300 hover:bg-[#1A2340]"
            }`}
          >
            Logs Table
          </button>

          <button
            onClick={() => setActiveTab("charts")}
            className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
              activeTab === "charts"
                ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg"
                : "bg-[#11182D] border border-white/10 text-gray-300 hover:bg-[#1A2340]"
            }`}
          >
            Charts
          </button>
        </div>

      
        {activeTab === "charts" && (
          <div className="space-y-6 mb-6">
            <div className="bg-[#11182D] border border-white/10 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold mb-6">
                Log Distribution
              </h3>

              <PieChartComponent
                data={getPieChartData()}
              />
            </div>

            <div className="bg-[#11182D] border border-white/10 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold mb-6">
                Daily Log Trends
              </h3>

              <LineChartComponent
                data={getLineChartData()}
              />
            </div>
          </div>
        )}

      
        <div className="bg-[#11182D] border border-white/10 rounded-3xl p-6 shadow-2xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by message..."
                className="w-full bg-[#0B1023] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Level
              </label>

              <select
                value={level}
                onChange={(e) =>
                  setLevel(e.target.value)
                }
                className="w-full bg-[#0B1023] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">All Levels</option>

                <option value="INFO">INFO</option>

                <option value="WARN">WARN</option>

                <option value="ERROR">ERROR</option>
              </select>
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sort By
              </label>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(
                    e.target.value as
                      | "recent"
                      | "count"
                  )
                }
                className="w-full bg-[#0B1023] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="recent">
                  Most Recent
                </option>

                <option value="count">
                  Most Occurred
                </option>
              </select>
            </div>

          
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearch("");
                  setLevel("");
                  setSort("recent");
                  setCurrentPage(1);
                }}
                className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-3 rounded-2xl hover:scale-105 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        
        {activeTab === "table" && (
          <>
            {loading ? (
              <div className="bg-[#11182D] border border-white/10 rounded-3xl p-16 text-center shadow-2xl">
                <div className="text-gray-400 text-lg animate-pulse">
                  Loading logs...
                </div>
              </div>
            ) : (
              <div className="bg-[#11182D] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <LogsTable logs={logs} />
              </div>
            )}

        
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-6">
                <button
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.max(1, p - 1)
                    )
                  }
                  disabled={currentPage === 1}
                  className="px-5 py-3 bg-[#11182D] border border-white/10 rounded-2xl hover:bg-[#1A2340] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>

                <span className="px-5 py-3 bg-[#11182D] border border-white/10 rounded-2xl text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(totalPages, p + 1)
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                  className="px-5 py-3 bg-[#11182D] border border-white/10 rounded-2xl hover:bg-[#1A2340] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}