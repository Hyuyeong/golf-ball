"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { createStock } from "../actions/queryStock";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const [stockName, setStockName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("");
  const [count, setCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      stockName,
      date,
      location,
      condition,
      count: Number(count),
    };

    try {
      await createStock(formData);
      toast.success("Stock created successfully!");
      router.push("/stock");
    } catch (error) {
      console.error("Stock creation failed:", error);
      toast.error("Failed to create stock. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Create Stock</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Stock Name"
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
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
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
