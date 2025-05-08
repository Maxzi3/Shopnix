import useProducts from "./useProducts";
import Spinner from "../../UI/Spinner";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../UI/Pagination";
const PAGE_SIZE = 25;

const Products = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, products } = useProducts();
  const product = products?.data || [];

  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const categoryFilter = searchParams.get("category") || "all";

  const filteredProducts = product.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Pagination setup
  const currentPage = Number(searchParams.get("page")) || 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedProducts = Array.isArray(filteredProducts)
    ? filteredProducts.slice(startIndex, startIndex + PAGE_SIZE)
    : [];

  if (isLoading) return <Spinner />;

  if (!paginatedProducts.length)
    return <p className="text-center text-gray-500">No products found.</p>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:space-y-5 justify-items-center gap-2 max-h-auto mb-[100px] ">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* Pagination */}
      {paginatedProducts.length > 0 && (
        <div className="flex flex-row  md:pb-10 pb-24 md:items-center md:justify-self-end md:w-1/2">
          <Pagination count={paginatedProducts.length} />
        </div>
      )}
    </>
  );
};

export default Products;
