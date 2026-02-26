"use client";
import { useEffect, useState } from "react";

export default function AuditLogTable() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/logs")
      .then((res) => res.json())
      .then(setLogs)
      .catch(console.error);
  }, []);

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">🧾 Admin Audit Log</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Admin</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Target</th>
              <th className="p-3 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr
                key={log.id}
                className="border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="p-3">{new Date(log.createdAt).toLocaleString()}</td>
                <td className="p-3">{log.admin.name || log.admin.email}</td>
                <td className="p-3 font-medium text-blue-500">{log.action}</td>
                <td className="p-3">{log.target || "—"}</td>
                <td className="p-3">{log.details || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
