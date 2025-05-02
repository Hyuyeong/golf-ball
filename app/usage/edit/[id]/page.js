"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
// import { getStockById, updateStock } from "../../actions/queryStock";
import toast from "react-hot-toast";
import { getStocks } from "@/app/stock/actions/queryStock";
import { getUsagesById, updateUsage } from "../../actions/queryUsage";

function Page() {
  const router = useRouter();
  const params = useParams();
  const usageId = params.id;

  const [usageName, setUsageName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [holes, setHoles] = useState("");
  const [count, setCount] = useState(0);
  const [stockId, setStockId] = useState("");
  const [stockList, setStockList] = useState([]);

  //   console.log(stockList);

  useEffect(() => {
    const fetchStocks = async () => {
      const list = await getStocks();
      setStockList(list);
    };
    fetchStocks();
  }, []);

  useEffect(() => {
    const fetchStocks = async () => {
      const list = await getUsagesById(usageId);

      //   console.log(list);
      //   console.log(list.Name);
      const today = new Date().toISOString().split("T")[0];
      // do something with stockList, e.g., set it in state
      // setStockList(list);

      setUsageName(list.Name);
      setDate(today);
      setLocation(list.Location);
      setHoles(list.Holes);
      setCount(list.Count);
      setStockId(list.StockId);
    };

    fetchStocks();
  }, [usageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      usageName,
      date,
      location,
      holes,
      count: Number(count),
      stockId,
      id: +usageId,
    };

    // console.log(formData);

    try {
      await updateUsage(formData);
      toast.success("Usage updated successfully!");
      router.push("/usage");
    } catch (error) {
      console.error("Usage update failed:", error);
      toast.error("Failed to update usage. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Edit Usage</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={usageName}
          onChange={(e) => setUsageName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          className="w-full p-2 border rounded"
          value={holes}
          onChange={(e) => setHoles(e.target.value)}
        >
          <option value="">Select Hole</option>
          <option value="9 Holes">9 Hole</option>
          <option value="18 Holes">18 Hole</option>
        </select>

        <input
          type="number"
          placeholder="Count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <select
          className="w-full p-2 border rounded"
          value={stockId}
          onChange={(e) => setStockId(e.target.value)}
        >
          <option value="">Select Stock</option>
          {stockList.map((item, index) => (
            <option key={item.Id} value={+item.Id}>
              {item.Name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default Page;
