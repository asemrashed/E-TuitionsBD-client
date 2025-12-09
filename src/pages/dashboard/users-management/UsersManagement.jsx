import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../utils/loading/Loading";
import { FiShieldOff } from "react-icons/fi";
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
      console.log(res.data);
      return res.data;
    },
  });
  const handleDelete=(id)=>{
    axiosSecure.delete(`/users/${id}`)
    .then(res=>{
      console.log(res.data)
      refetch()
    })
    .catch(err=>console.log(err))
  }
  const handleApprove=(user)=>{
    axiosSecure.patch(`/users/${user._id}`,{status:"active"})
    .then(res=>{
      console.log(res.data)
      refetch()
    })
    .catch(err=>console.log(err))
  }
  const handleReject=(user)=>{
    axiosSecure.patch(`/users/${user._id}`,{status:"rejected"})
    .then(res=>{
      console.log(res.data)
      refetch()
    })
    .catch(err=>console.log(err))
  }

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
                  className="grid grid-cols-2 md:grid-cols-[60px_1.5fr_1.5fr_0.5fr_0.5fr_1fr_1fr] items-center gap-1 md:gap-0 px-3 py-3 border-b border-primary-content"
                >
                  <li className="no-underline col-span-2 md:col-span-1 order-1">
                    {i + 1}
                  </li>
                  <li className="no-underline order-2 font-semibold">
                    {user.displayName}
                  </li>
                  <li className="no-underline col-span-2 md:col-span-1 order-4">
                    {user.email}
                  </li>
                  <li className="no-underline order-3 md:order-4 flex justify-end md:justify-start">
                    {user.role}
                  </li>
                  <li
                    className={`no-underline order-5 md:order-4 ${
                      user.status === "active" ? "text-success" : "text-warning"
                    } flex justify-end md:justify-start`}
                  >
                    {user.status}
                  </li>
                  <li className={`no-underline order-6 md:order-5`}>
                    {user.status === "active" ? (
                      <button
                        className="btn btn-sm btn-primary hover:text-white border-0"
                      >
                        {/* <LiaUserShieldSolid /> */}
                        Approved
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleApprove(user)}
                          className="btn btn-sm bg-base-300 hover:bg-success mr-1 hover:text-white border-0"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user)}
                          className="btn btn-sm bg-base-300 hover:bg-error hover:text-white border-0"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </li>
                  <li className="no-underline order-7 flex justify-end md:justify-start">
                    <button className="btn btn-sm bg-base-300 hover:bg-info hover:text-white mx-1 border-0">
                      Edit
                    </button>
                    <button
                        onClick={() => handleDelete(user._id)}
                      className="btn btn-sm bg-base-300 hover:bg-error hover:text-white border-0"
                    >
                      Delete
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
