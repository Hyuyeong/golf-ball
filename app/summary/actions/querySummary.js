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

export const getMonthlyUsageCount = async () => {
  const sql = `
    SELECT 
        DATE_FORMAT(u.DateCreated, '%Y-%m') AS Month,
        SUM(u.Count) AS TotalCount,
        COUNT(DISTINCT DATE(DateCreated)) AS CountDays
    FROM 
        Usages u
    GROUP BY 
        DATE_FORMAT(u.DateCreated, '%Y-%m')
    ORDER BY 
        Month
  `;

  const monthlyCounts = await query(sql);
  const totalSum = monthlyCounts.reduce((sum, row) => sum + Number(row.CountDays), 0);
  return {
    monthlyCounts,
    totalSum
  };
};

export const getTotalUsageCount = async () => {
  const sql = `
    SELECT 
        SUM(Count) AS TotalUsage
    FROM 
        Usages
  `;

  const result = await query(sql);
  return result[0]; // { TotalUsage: number }
};
