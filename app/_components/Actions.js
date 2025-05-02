"use client";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createStock, deleteStock } from "../stock/actions/queryStock";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { createUsage, deleteUsage } from "../usage/actions/queryUsage";

function Actions({ id, stock, item }) {
  const router = useRouter();

  const [path, setPath] = useState();

  useEffect(() => {
    const currentPath = window.location.pathname;
    setPath(currentPath);
  }, []);

  // console.log("id", id);

  const handleCopy = async (stock, item) => {
    if (path.includes("stock")) {
      const formData = {
        stockName: stock.Name,
        date: new Date(),
        location: stock.Location,
        condition: stock.Condition,
        count: stock.Count,
      };

      try {
        await createStock(formData);
        toast.success("Copy successfully!");
        router.refresh();
      } catch (err) {
        console.error("Copy failed:", err);
        toast.error("Failed to copy");
      }
    } else if (path.includes("usage")) {
      const formData = {
        usageName: item.Name,
        date: new Date(),
        location: item.Location,
        holes: item.Holes,
        count: item.Count,
        stockId: item.StockId,
      };

      try {
        await createUsage(formData);
        toast.success("Copy successfully!");
        router.refresh();
      } catch (err) {
        console.error("Copy failed:", err);
        toast.error("Failed to copy");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      if (path.includes("stock")) {
        await deleteStock(id);
      } else if (path.includes("usage")) {
        await deleteUsage(id);
      }
      toast.success("Deleted successfully!");
      router.refresh();
    } catch (err) {
      toast.error("Failed to delete.");
      console.error(err);
    }
  };

  return (
    <>
      <Link href={`${path}/edit/${id}`}>
        <FaRegEdit />
      </Link>

      <MdContentCopy
        className="cursor-pointer ml-3"
        onClick={() => handleCopy(stock, item)}
      />

      <RiDeleteBin6Line
        className="cursor-pointer ml-3"
        onClick={() => handleDelete(id)}
      />
    </>
  );
}

export default Actions;
