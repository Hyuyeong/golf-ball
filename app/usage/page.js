import { getUsages } from "./actions/queryUsage";
import formatDate from "@/app/_lib/utils";

import Actions from "../_components/Actions";

async function page() {
  const usages = await getUsages();

  console.log(usages);

  // const totalStock = await getTotalStock();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Usage List</h2>

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
                Holes
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Lost
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Get
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                From
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {usages.map((item, index) => (
              <tr
                key={item.Id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 text-sm text-gray-900">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.Name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {formatDate(item.DateCreated)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.Location}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.Holes}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.Count < 0 ? -item.Count : null}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.Count >= 0 ? item.Count : null}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.StockName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 flex">
                  <Actions item={item} id={item.Id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="text-xl font-bold text-right mr-3">
          {/* Total: {totalStock} */}
        </h3>
      </div>
    </div>
  );
}

export default page;
