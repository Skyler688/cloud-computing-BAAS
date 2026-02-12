const { databaseId, tableID, database, ID } = require("../../appwrite.js");

export async function PUT(req) {
  try {
    const data = await req.json();

    data.age = Number(data.age);

    const result = await database.createRow({
      databaseId: databaseId,
      tableId: tableID,
      rowId: ID.unique(),
      data: data,
    });

    return new Response({ status: result.status });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "INTERNAL SERVER ERROR-> Failed to create row",
      }),
      {
        status: 500,
      },
    );
  }
}
