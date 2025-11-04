import { useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../contexts/AuthContext";

const Register = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const handleSignIn = (e) => {
    e.preventDefault();
    const displayName = e.target.displayName.value;
    const photoUrl = e.target.photoUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("Create User successfully");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        toast.success("successfully login");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.

        // ...
      });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto  shrink-0 shadow-2xl shadow-primary my-10">
      <div className="card-body">
        <h2 className="text-xl font-bold">Register</h2>
        <form onSubmit={handleSignIn}>
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full"
              name="displayName"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="label">Photo Url</label>
            <input
              type="url"
              className="input w-full"
              name="photoUrl"
              placeholder="Provide Photo Url"
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              name="email"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input w-full"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="btn mt-4 block w-full bg-linear-to-r from-primary to-secondary text-white "
          >
            Register
          </button>
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white text-black border-[#e5e5e5] w-full"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
