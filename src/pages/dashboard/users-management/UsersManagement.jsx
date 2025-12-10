import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../utils/loading/Loading";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/users/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Your user has been removed.", "warning");
        }
      }
    });
  };

  const updateStatus = async (user, status) => {
    const result = await Swal.fire({
      title: `${
        status === "active"
          ? "Are you sure to approve this user?"
          : "Are you sure to reject this user?"
      }`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(`/users/${user._id}`, { status });
      if (res.data.modifiedCount > 0) {
        if (status === "active") {
          user.status = "active";
          await axiosSecure
            .post("/tutors", user)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
        refetch();
        Swal.fire(
          `${status === "active" ? "Activated" : "Rejected"}`,
          "",
          status === "active" ? "success" : "warning"
        );
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">USERS LIST</h1>
      {users ? (
        <div className="table table-zebra mt-2 md:mt-3">
          <div className="w-full [text-decoration:none]">
            <div>
              <ul className="hidden md:grid grid-cols-[60px_1.5fr_1.5fr_0.5fr_0.5fr_1fr_1fr] items-center px-3 py-3 bg-base-300">
                <li className="no-underline">SL No</li>
                <li className="no-underline">Name</li>
                <li className="no-underline">Email</li>
                <li className="no-underline">Role</li>
                <li className="no-underline">Status</li>
                <li className="no-underline">Approve</li>
                <li className="no-underline">Actions</li>
              </ul>
            </div>

            <div>
              {users.map((user, i) => (
                <ul
                  key={user._id}
                  className="grid grid-cols-2 md:grid-cols-[60px_1.5fr_1.5fr_0.5fr_0.5fr_1fr_1fr] items-center gap-1 md:gap-0 px-3 py-3 border-b border-base-300"
                >
                  <li className="no-underline order-1">{i + 1}</li>
                  <li className="no-underline order-3 md:order-2 font-semibold">
                    {user.displayName}
                  </li>
                  <li className="no-underline col-span-2 md:col-span-1 order-5 md:order-3">
                    {user.email}
                  </li>
                  <li className="no-underline order-4 md:order-4 flex justify-end md:justify-start text-primary">
                    {user.role}
                  </li>
                  <li
                    className={`no-underline order-2 md:order-5 ${
                      user.status === "active" ? "text-success" : "text-warning"
                    } flex justify-end md:justify-start`}
                  >
                    {user.status}
                  </li>
                  <li className={`no-underline order-6 md:order-6`}>
                    {user.status === "active" ? (
                      <p
                        onClick={() => updateStatus(user, "rejected")}
                        className="btn btn-xs md:btn-sm hover:btn-error border-0"
                      >
                        Reject
                      </p>
                    ) : (
                      <>
                        <button
                          onClick={() => updateStatus(user, "active")}
                          className="btn btn-xs md:btn-sm bg-base-300 hover:bg-success mr-1 hover:text-white border-0"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(user, "rejected")}
                          className="btn btn-xs md:btn-sm bg-base-300 hover:bg-error hover:text-white border-0"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </li>
                  <li className="no-underline order-7 flex gap-3 md:gap-5 justify-end md:justify-start">
                    <button className="text-lg text-primary cursor-pointer">
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-lg text-error cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-lg md:text-xl text-center">
          No parcel sends yet
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
