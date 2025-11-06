import { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AuthContext from "../contexts/AuthContext";

const ProductDetails = () => {
  const productDetails = useLoaderData();
  const { _id: productId } = productDetails;
  const [bids, setBids] = useState([]);
  const bidModalRef = useRef(null);
  const { user } = useContext(AuthContext);
  const handleModalOpen = () => {
    bidModalRef.current.showModal();
  };
  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
      });
  }, [productId]);

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    const newBid = {
      product_id: productId,
      bidder_name: name,
      bidder_email: email,
      bidder_image: user?.photoURL,
      bid_amount: bid,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          const updatedBidCollection = [...bids, newBid];
          updatedBidCollection.sort((a, b) => b.bid_amount - a.bid_amount);
          setBids(updatedBidCollection);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  return (
    <div>
      {/* product info */}
      <div>
        <div></div>
        <div>
          <button onClick={handleModalOpen} className="btn btn-primary">
            I want to buy this product
          </button>
          {/* Open the modal using document.getElementById('ID').showModal() method */}

          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Give Big offer</h3>
              <p className="py-4">make sure offer</p>
              <form onSubmit={handleBidSubmit}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input"
                    defaultValue={user?.displayName}
                    readOnly
                  />
                  <label className="label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input"
                    defaultValue={user?.email}
                    readOnly
                  />
                  <label className="label">Bid</label>
                  <input
                    name="bid"
                    type="number"
                    className="input"
                    placeholder="Your bid price"
                  />

                  <button className="btn btn-neutral mt-4">
                    Place your bid
                  </button>
                </fieldset>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      {/* bids for product */}
      <div>
        <h2 className="text-xl font-semibold text-primary">
          Bids For this products{" "}
          <span className="text-secondary">{bids.length}</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Product</th>
                <th>Seller</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, i) => (
                <tr key={bid._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={productDetails?.image} alt="Product" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{productDetails?.title}</div>
                        <div className="text-sm opacity-50">
                          ${productDetails?.price_min}-
                          {productDetails?.price_max}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={bid.bidder_image} alt="Product" />
                      </div>
                    </div>
                    {bid.bidder_name}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {bid.bidder_email}
                    </span>
                  </td>
                  <td>{bid.bid_amount}</td>
                  <th>
                    <button className="btn btn-secondary btn-xs">Accept</button>
                    <button className="btn btn-error btn-xs">Reject</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
