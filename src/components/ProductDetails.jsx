import { useContext, useRef } from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";

const ProductDetails = () => {
  const productDetails = useLoaderData();
  const { _id: productId } = productDetails;
  const bidModalRef = useRef(null);
  const { user } = useContext(AuthContext);
  const handleModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    const newBid = {
      product_id: productId,
      bidder_name: name,
      bidder_email: email,
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
          toast.success("Your bid placed successfully");
          bidModalRef.current.close();
        } else {
          toast.error(data.message);
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
    </div>
  );
};

export default ProductDetails;
