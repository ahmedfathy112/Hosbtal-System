"use client";
import { useState, useEffect } from "react";
import InventoryTable from "./InventoryTable";
import Pagination from "./Pagination";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const mockItems = [
      {
        id: 1,
        name: "باراسيتامول",
        date: "2025-04-01",
        details: "مسكن للألم",
        quantity: 100,
      },
      {
        id: 2,
        name: "أدوات جراحية",
        date: "2025-03-15",
        details: "مجموعة أدوات أساسية",
        quantity: 30,
      },
      {
        id: 3,
        name: "كمامات طبية",
        date: "2025-04-10",
        details: "كمامات N95",
        quantity: 200,
      },
      {
        id: 4,
        name: "كانيولا",
        date: "2025-04-12",
        details: "كانيولا زرقاء",
        quantity: 150,
      },
      {
        id: 5,
        name: "كانيولا حمراء",
        date: "2025-04-17",
        details: "كانيولا حمراء",
        quantity: 100,
      },
    ];
    setItems(mockItems);
  }, []);

  // here to filter the items depend on the search
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // for pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <InventoryTable
        items={paginatedItems}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
