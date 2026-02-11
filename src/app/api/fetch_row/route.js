const { databaseId, tableID, database } = require("../../appwrite.js");

export async function POST(req) {
  try {
    const { rowId } = await req.json();
    const row = await database.getRow(databaseId, tableID, rowId);
    return new Response(JSON.stringify(row), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "INTERNAL SERVER ERROR-> Failed to fetch row." }),
      {
        status: 500,
      },
    );
  }
}
