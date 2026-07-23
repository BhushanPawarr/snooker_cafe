"use client";

import { useEffect, useState } from "react";

type Table = {
  id: number;
  name: string;
  hourlyRate: number;
  isActive: boolean;
};

export default function TablesClient() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/tables");
    const data = await res.json();
    setTables(data.tables ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function addTable(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const rate = Number(hourlyRate);
    if (!name.trim() || !rate || rate <= 0) {
      setError("Enter a name and a valid hourly rate.");
      return;
    }
    const res = await fetch("/api/tables", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, hourlyRate: rate }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Could not add table.");
      return;
    }
    setName("");
    setHourlyRate("");
    load();
  }

  async function toggleActive(table: Table) {
    await fetch(`/api/tables/${table.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !table.isActive }),
    });
    load();
  }

  async function updateRate(table: Table, rate: number) {
    if (!rate || rate <= 0) return;
    await fetch(`/api/tables/${table.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hourlyRate: rate }),
    });
    load();
  }

  async function deleteTable(id: number) {
    if (!confirm("Delete this table? Existing bookings reference it.")) return;
    const res = await fetch(`/api/tables/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Could not delete — it may have existing bookings.");
      return;
    }
    load();
  }

  return (
    <div>
      <form
        onSubmit={addTable}
        className="flex flex-wrap items-end gap-4 rounded-xl border border-black/10 p-4 dark:border-white/10"
      >
        <div>
          <label className="block text-sm font-medium">Table name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 rounded-lg border border-black/15 bg-background px-3 py-2 dark:border-white/15"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Rate (₹/hr)</label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="mt-1 w-28 rounded-lg border border-black/15 bg-background px-3 py-2 dark:border-white/15"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-felt px-5 py-2 text-sm font-semibold text-white"
        >
          Add Table
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-foreground/60">
            <tr>
              <th className="pb-2">Name</th>
              <th className="pb-2">Rate (₹/hr)</th>
              <th className="pb-2">Active</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((t) => (
              <tr key={t.id} className="border-t border-black/5 dark:border-white/5">
                <td className="py-2">{t.name}</td>
                <td className="py-2">
                  <input
                    type="number"
                    defaultValue={t.hourlyRate}
                    onBlur={(e) => updateRate(t, Number(e.target.value))}
                    className="w-24 rounded-lg border border-black/15 bg-background px-2 py-1 dark:border-white/15"
                  />
                </td>
                <td className="py-2">{t.isActive ? "Yes" : "No"}</td>
                <td className="py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleActive(t)}
                      className="rounded-full bg-black/10 px-3 py-1 text-xs font-medium dark:bg-white/10"
                    >
                      {t.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => deleteTable(t.id)}
                      className="rounded-full bg-red-600/10 px-3 py-1 text-xs font-medium text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && tables.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-foreground/50">
                  No tables yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
