import { use } from "react";
import ProductCard from "./ProductCard";

const LatestProducts = ({ latestProductsPromise }) => {
  const latestProductsData = use(latestProductsPromise);
  console.log(latestProductsData);
  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
      {latestProductsData.map((product) => (
        <ProductCard key={product._id} product={product}></ProductCard>
      ))}
    </div>
  );
};

export default LatestProducts;
