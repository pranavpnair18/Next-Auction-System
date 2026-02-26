"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface User {
  id: number;
  name: string | null;
  email: string;
  role: string;
  createdAt: string | Date;
  _count: {
    bids: number;
  }
}


export default function Usertable({ users}: { users: User[]}) {
  const [data, setData] = useState(users);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const {data: session} = useSession()

  // 🔍 Filter users dynamically
  const filteredUsers = data.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "ALL" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  async function deleteuser(user: User) {
    const response = await fetch("/api/admin/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, email: user.email }),
    });

    const del = await response.json();
    if (!del.success) {
      alert("❌ Failed to delete user");
      return;
    }

    alert(`✅ User ${user.id} deleted successfully`);

    // Instantly remove deleted user from UI
    setData((prev) => prev.filter((u) => u.id !== user.id));
  }

  async function updateRole(userId: number, newRole: string) {
    const res = await fetch("/api/admin/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, newRole }),
    });

    const json = await res.json();
    if (!res.ok) {
      alert(`❌ ${json.error || "Failed to update role"}`);
      return;
    }

    alert(`✅ Role updated to ${newRole}`);
    setData((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  }

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>

      {/* 🔍 Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="MODERATOR">Moderator</option>
          <option value="USER">User</option>
        </select>
      </div>

      {/* 🧾 Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
  <tr>
    <th className="p-3 text-left">ID</th>
    <th className="p-3 text-left">Name</th>
    <th className="p-3 text-left">Email</th>
    <th className="p-3 text-left">Role</th>
    <th className="p-3 text-left">Actions</th>
    <th className="p-3 text-left">Total Bids</th>
  </tr>
</thead>

<tbody>
  {filteredUsers.map((user) => (
    <tr key={user.id} className="border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="p-3">{user.id}</td>
      <td className="p-3">{user.name || "—"}</td>
      <td className="p-3">{user.email}</td>
      <td className="p-3 font-semibold">
        <span
          className={`px-2 py-1 rounded ${
            user.role === "ADMIN"
              ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
              : user.role === "MODERATOR"
              ? "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
              : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-100"
          }`}
        >
          {user.role}
        </span>
      </td>

      {/* ✅ All three buttons inside one <td> */}
      <td className="p-3 flex gap-2">
  {user.email === "admin@example.com" ? (
    <button
      disabled
      title="This admin cannot be modified"
      className="px-3 py-1 text-sm bg-gray-400 text-white rounded-lg cursor-not-allowed "
    >
      All Actions is Locked for ADMIN
    </button>
  ) : (
    <>
      {session?.user.role=="ADMIN" && <button
        onClick={() => deleteuser(user)}
        className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Delete
      </button> }
      

      <button
        onClick={() => updateRole(user.id, "MODERATOR")}
        className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Promote
      </button>

      <button
        onClick={() => updateRole(user.id, "USER")}
        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
      >
        Demote
      </button>
    </>
  )}
</td>
<td className="p-3">{user._count.bids}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      {/* ⚠️ If no results */}
      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-400 mt-4">
          No users found matching your filters.
        </p>
      )}
    </section>
  );
}
