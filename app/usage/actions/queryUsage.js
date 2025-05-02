"use server";

import { query } from "@/app/_lib/db";
import { revalidatePath } from "next/cache";

export async function createUsage(formData) {
  const { usageName, date, location, holes, count, stockId } = formData;

  await query(
    "INSERT INTO Usages (Name, DateCreated, Location, `Holes`, Count, StockId) VALUES (?, ?, ?, ?, ?, ?)",
    [usageName, date, location, holes, count, stockId]
  );

  revalidatePath("/usage");
}

// export const getUsages = async () => {
//   const sql = `
//         SELECT * From Usages;
//       `;
//   const usages = await query(sql);
//   return usages;
// };

export const getUsages = async () => {
  const sql = `
    SELECT 
        u.Id, 
        u.Name, 
        u.DateCreated,
        u.Location,
        u.Holes,
        u.Count,
        u.StockId, 
 
        so.Name AS StockName,
        so.Count AS StockCount
    FROM 
        Usages u
    JOIN 
        Stocks so ON u.StockId = so.Id
      `;

  const usages = await query(sql);
  return usages;
};

export const getUsagesById = async (id) => {
  const sql = `
      SELECT 
          u.Id, 
          u.Name, 
          u.DateCreated,
          u.Location,
          u.Holes,
          u.Count,
          u.StockId, 
   
          so.Name AS StockName
      FROM 
          Usages u
      JOIN 
          Stocks so ON u.StockId = so.Id
      WHERE 
          u.Id = ?;
        `;

  const usage = await query(sql, [id]);
  return usage[0];
};

export async function updateUsage(formData) {
  const { usageName, date, location, holes, count, stockId, id } = formData;

  await query(
    "UPDATE Usages SET Name = ?, DateCreated = ?, Location = ?, Holes = ?, `Count` =? , StockId = ? WHERE Id = ?",
    [usageName, date, location, holes, count, stockId, id]
  );

  revalidatePath("/usage");
}

// export async function getStockById(id) {
//   try {
//     const rows = await query(`SELECT * FROM Stocks WHERE Id = ? LIMIT 1`, [id]);

//     if (rows.length === 0) throw new Error("Stock not found");

//     const stock = rows[0];

//     if (!stock) {
//       throw new Error("Stock not found");
//     }

//     return {
//       id: stock.Id,
//       stockName: stock.Name,
//       date: stock.DateCreated,
//       location: stock.Location,
//       condition: stock.Condition,
//       count: stock.Count,
//     };
//   } catch (error) {
//     console.error("getStockById error:", error);
//     throw error;
//   }
// }

// export async function updateStock({
//   id,
//   stockName,
//   date,
//   location,
//   condition,
//   count,
// }) {
//   try {
//     await query(
//       `UPDATE Stocks SET Name = ?, DateCreated = ?, Location = ?, \`Condition\` = ?, \`Count\` = ? WHERE Id = ?`,
//       [stockName, date, location, condition, count, id]
//     );
//   } catch (error) {
//     console.error("updateStock error:", error);
//     throw error;
//   }
// }

// export async function getTotalStock() {
//   const rows = await query("SELECT SUM(Count) AS TotalCount FROM Stocks");
//   const total = rows[0].TotalCount;

//   return total;
// }

export async function deleteUsage(usageId) {
  try {
    await query("DELETE FROM Usages WHERE Id = ?", [usageId]);
  } catch (err) {
    throw new Error("Delete Fail: " + err.message);
  }
  revalidatePath("/usage");
}
