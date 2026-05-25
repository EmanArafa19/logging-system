import type { Log } from "../types";

interface LogsTableProps {
  logs: Log[];
}

export default function LogsTable({
  logs,
}: LogsTableProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "INFO":
        return "text-green-400 bg-green-500/10 border border-green-500/20";

      case "WARN":
        return "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20";

      case "ERROR":
        return "text-red-400 bg-red-500/10 border border-red-500/20";

      default:
        return "text-gray-400 bg-gray-500/10 border border-gray-500/20";
    }
  };

  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#11182D] shadow-2xl">
      <table className="min-w-full">
        
        <thead className="bg-[#0B1023] border-b border-white/10">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Message
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Level
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Count
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              First Occurrence
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Last Occurrence
            </th>
          </tr>
        </thead>

      
        <tbody className="divide-y divide-white/5">
          {logs.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-16 text-center text-gray-400"
              >
                <div className="flex flex-col items-center gap-3">
                  

                  <p className="text-lg font-medium">
                    No logs found
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr
                key={log._id}
                className="hover:bg-white/5 transition-all duration-200"
              >
                {}
                <td className="px-6 py-5 text-sm text-gray-200 max-w-md">
                  <div className="truncate font-medium">
                    {log.message}
                  </div>
                </td>

                {}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
                      log.level
                    )}`}
                  >
                    {log.level}
                  </span>
                </td>

                {}
                <td className="px-6 py-5 text-sm text-white font-semibold">
                  {log.count}
                </td>

                {}
                <td className="px-6 py-5 text-sm text-gray-400">
                  {new Date(
                    log.createdAt
                  ).toLocaleString()}
                </td>

                {}
                <td className="px-6 py-5 text-sm text-gray-400">
                  {new Date(
                    log.updatedAt
                  ).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}