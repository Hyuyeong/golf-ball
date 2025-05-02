"use server";

import { query } from "@/app/_lib/db";
import { revalidatePath } from "next/cache";

export async function createStock(formData) {
  const { stockName, date, location, condition, count } = formData;

  await query(
    "INSERT INTO Stocks (Name, DateCreated, Location, `Condition`, Count) VALUES (?, ?, ?, ?, ?)",
    [stockName, date, location, condition, count]
  );

  revalidatePath("/stock");
  revalidatePath("/summary");
}

export const getStocks = async () => {
  const sql = `
        SELECT * From Stocks;
      `;
  const stocks = await query(sql);
  return stocks;
};

// export async function getStockById(id) {
//   const sql = `
//   SELECT
//      * FROM Stocks WHERE Id = ? LIMIT 1
//     `;

//   const stock = await query(sql, [id]);
//   return stock[0];
// }

export async function getStockById(id) {
  try {
    const rows = await query(`SELECT * FROM Stocks WHERE Id = ? LIMIT 1`, [id]);

    if (rows.length === 0) throw new Error("Stock not found");

    const stock = rows[0];

    if (!stock) {
      throw new Error("Stock not found");
    }

    return {
      id: stock.Id,
      stockName: stock.Name,
      date: stock.DateCreated,
      location: stock.Location,
      condition: stock.Condition,
      count: stock.Count,
    };
  } catch (error) {
    console.error("getStockById error:", error);
    throw error;
  }
}

export async function updateStock({
  id,
  stockName,
  date,
  location,
  condition,
  count,
}) {
  try {
    await query(
      `UPDATE Stocks SET Name = ?, DateCreated = ?, Location = ?, \`Condition\` = ?, \`Count\` = ? WHERE Id = ?`,
      [stockName, date, location, condition, count, id]
    );
  } catch (error) {
    console.error("updateStock error:", error);
    throw error;
  }
  revalidatePath("/stock");
  revalidatePath("/summary");
}

export async function getTotalStock() {
  const rows = await query("SELECT SUM(Count) AS TotalCount FROM Stocks");
  const total = rows[0].TotalCount;

  return total;
}

export async function deleteStock(stockId) {
  try {
    await query("DELETE FROM Stocks WHERE Id = ?", [stockId]);
  } catch (err) {
    throw new Error("Delete Fail: " + err.message);
  }
  revalidatePath("/stock");
  revalidatePath("/summary");
}
