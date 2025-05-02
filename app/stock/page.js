import { getStocks, getTotalStock } from "./actions/queryStock";
import formatDate from "@/app/_lib/utils";

import Actions from "../_components/Actions";

async function page() {
  const stocks = await getStocks();

  const totalStock = await getTotalStock();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Stock List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Location
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Condition
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Count
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {stocks.map((stock, index) => (
              <tr
                key={stock.Id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 text-sm text-gray-900">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {stock.Name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {formatDate(stock.DateCreated)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {stock.Location}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {stock.Condition}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {stock.Count}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 flex">
                  <Actions stock={stock} id={stock.Id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="text-xl font-bold text-right mr-3">
          Total: {totalStock}
        </h3>
      </div>
    </div>
  );
}

export default page;
