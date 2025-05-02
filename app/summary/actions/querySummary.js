"use server";

import { query } from "@/app/_lib/db";

export async function getSummary() {
  const sql = `SELECT 
  s.Id AS StockId,
  s.Name,
  s.Location,
  s.Count AS StockCount,
  IFNULL(SUM(u.Count), 0) AS UsedCount,
  s.Count + IFNULL(SUM(u.Count), 0) AS Remaining
  FROM 
  Stocks s
  LEFT JOIN 
  Usages u ON s.Id = u.StockId
  GROUP BY 
  s.Id, s.Name, s.Count;
  `;
  const sumarry = await query(sql);
  return sumarry;
}
