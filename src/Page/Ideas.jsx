import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from '../Components/Nav';
import Banner from '../Components/Banner';

const Ideas = () => {
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(() => parseInt(localStorage.getItem("perPage"), 10) || 10);
  const [sortBy, setSortBy] = useState(() => localStorage.getItem("sortBy") || "newest");
  const [currentPage, setCurrentPage] = useState(() => parseInt(localStorage.getItem("currentPage"), 10) || 1);
  const [loading, setLoading] = useState(true);

  const formatDate = (publishedAt) => {
    const dateObject = new Date(publishedAt);
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const day = dateObject.getDate();
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://suitmedia-backend.suitdev.com/api/ideas", {
          params: {
            "page[number]": currentPage,
            "page[size]": perPage,
            append: ["small_image", "medium_image"],
            sort: sortBy === "newest" ? "-published_at" : "published_at",
          },
        });

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [perPage, sortBy, currentPage]);

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(data?.meta?.total / perPage);
    const pages = [];
    const maxVisiblePages = 5;

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    const startIndex = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    const endIndex = Math.min(totalPages - 1, startIndex + maxVisiblePages - 1);

    const slicedPages = pages.slice(startIndex, endIndex + 1);

    return slicedPages.map((pageNumber) => (
      <button
        key={pageNumber}
        className={`px-3 py-1 rounded-md ${
          currentPage === pageNumber
            ? "bg-orange-500 text-white"
            : "hover:bg-orange-500 hover:text-white"
        }`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    ));
  };

  useEffect(() => {
    localStorage.setItem("perPage", perPage);
    localStorage.setItem("sortBy", sortBy);
    localStorage.setItem("currentPage", currentPage);
  }, [perPage, sortBy, currentPage]);

  return (
    <>
      <div className="bg-orange-500">
        <Nav />
      </div>
      <Banner Title="Ideas" />
      <div className="mx-auto max-w-screen-lg">
        <div className="pt-20">
          <div className="pb-6"></div>
          <div className="flex-1 flex justify-between items-center">
            <h1 className="text-black">Showing 1-{perPage}</h1>
            <div className="flex gap-3">
              <div className="flex gap-3 items-center">
                <p className="text-black">Show per page:</p>
                <select
                  className="border rounded-2xl p-1 w-24"
                  onChange={handlePerPageChange}
                  value={perPage}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div className="flex gap-3 items-center">
                <p className="text-black">Sort by:</p>
                <select
                  className="border rounded-2xl p-1 w-24"
                  onChange={handleSortByChange}
                  value={sortBy}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="text-center mt-8">
              <p className="text-46">Wait a moment...</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-y-4 mt-8">
              {data?.data?.map((item, index) => (
                <div
                  className="flex-grow rounded-xl shadow-md flex flex-col max-w-72"
                  key={item.id}
                >
                  <div className="flex-grow">
                    <div>
                      <img
                        className="w-300 h-200 rounded-t-xl"
                        src={`/data${index % 2 === 0 ? '1' : '2'}.jpeg`}
                        alt="Your Company"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-black font-poppins text-12 flex-grow">
                        {formatDate(item.published_at)}
                      </p>
                      <p className="text-black sm:text-24 text-2xl font-bold line-clamp-3">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-center mt-4">
            <nav className="flex items-center gap-4">
              <button
                className="px-3 py-1 rounded-md bg-orange-500 text-white"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <span className="mr-2">Prev</span>
              </button>
              {renderPageNumbers()}
              <button
                className="px-3 py-1 rounded-md bg-orange-500 text-white"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(data?.meta?.total / perPage)
                }
              >
                <span className="mr-2">Next</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ideas;
