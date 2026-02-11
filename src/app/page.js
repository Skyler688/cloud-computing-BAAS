"use client";

export default function Home() {
  async function getRow(rowId) {
    const res = await fetch("/api/fetch_row", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rowId: "698bd0b500211b2efac0" }),
    });

    if (!res.ok) {
      console.error("Failed to fetch row");
    }

    if (res.status === 500) {
      console.log("Internal server error->", res.body);
    }

    const data = await res.json();

    console.log(data);
  }

  async function listRows() {
    const res = await fetch("/api/list_rows", {
      method: "GET",
    });

    if (!res.ok) {
      console.error("Failed to list rows");
    }

    const data = await res.json();

    console.log(data);
  }
  return (
    <main>
      <button onClick={getRow}>GetRow</button>
      <button onClick={listRows}>ListRows</button>
    </main>
  );
}
