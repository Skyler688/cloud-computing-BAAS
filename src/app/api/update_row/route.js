const { databaseId, tableID, database } = require("../../appwrite.js");

export async function PUT(req) {
  try {
    const { rowId, data } = await req.json();

    data.age = Number(data.age);

    const result = await database.updateRow({
      databaseId: databaseId,
      tableId: tableID,
      rowId: rowId,
      data: data,
    });

    return new Response({ status: result.status });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "INTERNAL SERVER ERROR-> Failed to update row",
      }),
      {
        status: 500,
      },
    );
  }
}
