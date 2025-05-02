"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getStockById, updateStock } from "../../actions/queryStock";
import toast from "react-hot-toast";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const stockId = params.id;

  const [stockName, setStockName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const stock = await getStockById(stockId);
        const today = new Date().toISOString().split("T")[0];
        // console.log(stock);
        setStockName(stock.stockName);
        setDate(today);
        setLocation(stock.location);
        setCondition(stock.condition);
        setCount(stock.count);
      } catch (error) {
        toast.error("Failed to load stock data");
      }
    }
    fetchData();
  }, [stockId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStock({
        id: stockId,
        stockName,
        date,
        location,
        condition,
        count: Number(count),
      });
      toast.success("Stock updated!");
      router.push("/stock");
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Edit Stock</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
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
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
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
