import TablesClient from "./TablesClient";

export default function AdminTablesPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Tables</h1>
      <div className="mt-6">
        <TablesClient />
      </div>
    </div>
  );
}
