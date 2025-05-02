"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getStocks } from "@/app/stock/actions/queryStock";
import { createUsage } from "../actions/queryUsage";

function Page() {
  const router = useRouter();

  const [usageName, setUsageName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [holes, setHoles] = useState("");
  const [count, setCount] = useState(0);
  const [stockId, setStockId] = useState("");
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const list = await getStocks();
      // do something with stockList, e.g., set it in state
      setStockList(list);
    };

    fetchStocks();
  }, []);

  // console.log(stockId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      usageName,
      date,
      location,
      holes,
      count: Number(count),
      stockId,
    };

    // console.log(formData);

    try {
      await createUsage(formData);
      toast.success("Usage created successfully!");
      router.push("/usage");
    } catch (error) {
      console.error("Usage creation failed:", error);
      toast.error("Failed to create usage. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Create Usage</h2>
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
            <option key={item.id} value={+item.Id}>
              {item.Name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default Page;
