import useProducts from "./useProducts";
import Spinner from "../../UI/Spinner";
import ProductCard from "./ProductCard";

const Products = () => {
  const { isLoading, products } = useProducts();
  if (isLoading) return <Spinner />;
  return (
    <>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </>
  );
};

export default Products;
