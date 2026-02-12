const { databaseId, tableID, database } = require("../../appwrite.js");

export async function DELETE(req) {
  try {
    const data = await req.json();

    const result = await database.deleteRow(databaseId, tableID, data.rowId);

    return new Response({ status: result.status });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "INTERNAL SERVER ERROR-> Failed to delete row",
      }),
      {
        status: 500,
      },
    );
  }
}
