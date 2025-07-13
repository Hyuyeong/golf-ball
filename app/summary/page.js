import { getMonthlyUsageCount,getTotalUsageCount,getSummary } from "./actions/querySummary";

async function page() {
  const stockList = await getSummary();

  const monthlyResults = await getMonthlyUsageCount();
  const totalSum = await getMonthlyUsageCount();
  
  const totalUsage = await getTotalUsageCount();

  // console.log(monthlyCounts);
  // console.log(totalUsage);
  // console.log(stockList);

  const totalRemaining = stockList.reduce(
    (sum, item) => sum + +item.Remaining,
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <table className="min-w-full divide-y divide-gray-200 rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Location</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Used</th>
            <th className="px-4 py-2 text-left">Remaining</th>
          </tr>
        </thead>
        <tbody>
          {stockList.map((item, index) => (
            <tr
              key={item.StockId}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-4 py-2">{item.Name}</td>
              <td className="px-4 py-2">{item.Location}</td>
              <td className="px-4 py-2">{item.StockCount}</td>
              <td className="px-4 py-2">{item.UsedCount}</td>
              <td className="px-4 py-2">{item.Remaining}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-xl font-bold text-right mr-3">
        Total : {totalRemaining}
      </h3>

      <table className="min-w-full divide-y divide-gray-200 rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Month</th>
            <th className="px-4 py-2 text-left">Count ({monthlyResults.totalSum})</th>
            <th className="px-4 py-2 text-left">Balls ({totalUsage.TotalUsage})</th>
          </tr>
        </thead>
        <tbody>
          {monthlyResults.monthlyCounts.map((item, index) => (
            <tr
              key={item.Month}
            >
              <td className="px-4 py-2">{item.Month}</td>
              <td className="px-4 py-2">{item.CountDays}</td>
              <td className="px-4 py-2">{item.TotalCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-xl font-bold text-right mr-3"></h3>


    </div>
  );
}

export default page;
