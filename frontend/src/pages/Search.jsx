import { Button, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

const Search = () => {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    sortDirection: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl) {
      setSideBarData({
        ...sideBarData,
        searchTerm: searchTermFromUrl,
        sortDirection: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setShowMore(false);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPosts(data.posts);
          setLoading(false);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = async (e) => {
    if (e.target.id === "searchTerm") {
      setSideBarData({
        ...sideBarData,
        searchTerm: e.target.value,
      });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSideBarData({
        ...sideBarData,
        sortDirection: order,
      });
    }
    if (e.target.id === "category") {
      const category = e.target.value;
      setSideBarData({
        ...sideBarData,
        category,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("sort", sideBarData.sortDirection);
    urlParams.set("category", sideBarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search/${searchQuery}`);
  };
  const handleShowMore = async (e) => {
    const numbersOfPosts = posts.length;
    const startIndex = numbersOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();

    try {
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      const data = await res.json();
      if (!res.ok) {
        return;
      }
      if (res.ok) {
        setPosts([...posts, ...data.posts]);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <main className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 ">
            <label
              htmlFor="searchTerm"
              className="whitespace-nowrap font-semibold"
            >
              Search Term:{" "}
            </label>
            <TextInput
              placeholder="Search"
              id="searchTerm"
              type="text"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="font-semibold">
              Sort:
            </label>
            <Select
              className=""
              onChange={handleChange}
              id="sort"
              value={sideBarData.sortDirection}
            >
              <option value="asc">Latest</option>
              <option value="desc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="font-semibold">
              Category:
            </label>
            <Select
              className=""
              onChange={handleChange}
              id="category"
              value={sideBarData.category}
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React js</option>
              <option value="nextjs">Next js</option>
              <option value="javascript">Javascript</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Search Results
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-lg text-gray-500">No posts Found!</p>
          )}
          {loading && (
            <div className="mx-auto">
              <svg class="pl" width="240" height="240" viewBox="0 0 240 240">
                <circle
                  class="pl__ring pl__ring--a"
                  cx="120"
                  cy="120"
                  r="105"
                  fill="none"
                  stroke="#000"
                  stroke-width="20"
                  stroke-dasharray="0 660"
                  stroke-dashoffset="-330"
                  stroke-linecap="round"
                ></circle>
                <circle
                  class="pl__ring pl__ring--b"
                  cx="120"
                  cy="120"
                  r="35"
                  fill="none"
                  stroke="#000"
                  stroke-width="20"
                  stroke-dasharray="0 220"
                  stroke-dashoffset="-110"
                  stroke-linecap="round"
                ></circle>
                <circle
                  class="pl__ring pl__ring--c"
                  cx="85"
                  cy="120"
                  r="70"
                  fill="none"
                  stroke="#000"
                  stroke-width="20"
                  stroke-dasharray="0 440"
                  stroke-linecap="round"
                ></circle>
                <circle
                  class="pl__ring pl__ring--d"
                  cx="155"
                  cy="120"
                  r="70"
                  fill="none"
                  stroke="#000"
                  stroke-width="20"
                  stroke-dasharray="0 440"
                  stroke-linecap="round"
                ></circle>
              </svg>
            </div>
          )}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <Button
              className="text-teal-500 text-lg hover:underline p-7 w-full"
              onClick={handleShowMore}
            >
              Show More
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Search;
