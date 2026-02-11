const { databaseId, tableID, database } = require("../../appwrite.js");

export async function GET() {
  try {
    const result = await database.listRows(databaseId, tableID);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "INTERNAL SERVER ERROR-> Failed to fetch row list.",
      }),
      {
        status: 500,
      },
    );
  }
}
