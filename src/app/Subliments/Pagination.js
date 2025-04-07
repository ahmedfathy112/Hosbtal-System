"use client";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    totalPages > 1 && (
      <div className="flex justify-center mt-6">
        <button
          onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 mx-1 bg-gray-800 rounded-lg disabled:opacity-50"
        >
          <FiChevronRight />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`p-2 mx-1 w-10 rounded-lg ${
              currentPage === i + 1 ? "bg-blue-600" : "bg-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 mx-1 bg-gray-800 rounded-lg disabled:opacity-50"
        >
          <FiChevronLeft />
        </button>
      </div>
    )
  );
}
