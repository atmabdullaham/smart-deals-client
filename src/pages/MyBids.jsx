import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../contexts/AuthContext";

const MyBids = () => {
  const { user } = useContext(AuthContext);
  console.log("token", user?.accessToken);
  const [bids, setBids] = useState([]);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBids(data);
        });
    }
  }, [user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        fetch(`http://localhost:3000/bids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remainingBids = bids.filter((bid) => bid._id !== id);
              setBids(remainingBids);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });

    fetch(``);
  };
  return (
    <div>
      <h3>
        My bids <span>{bids.length}</span>
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, i) => (
              <tr key={bid._id}>
                <th>{i + 1}</th>

                <td>{bid.bid_amount}</td>
                <td>
                  <div className="badge badge-info text-white">
                    {bid.status}
                  </div>
                </td>
                <th>
                  <button className="btn btn-secondary btn-xs">Edit</button>
                  <button
                    onClick={() => handleDelete(bid._id)}
                    className="btn btn-error btn-xs"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
