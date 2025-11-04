import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { _id, title, price_min, price_max, image } = product;
  return (
    <div className="card bg-base-100  shadow-sm shadow-primary">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          ${price_min}-{price_max}
        </p>
        <div className="card-actions justify-end">
          <Link to={`/details/${_id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
