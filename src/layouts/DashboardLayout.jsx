import React from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { PiSidebarSimpleDuotone } from "react-icons/pi";
import ThemeToggle from "../utils/buttons/ThemeToggle";
import useRole from "../hooks/useRole";
import Loading from "../utils/loading/Loading";
import logo from "../assets/logo.png";
import { IoHomeOutline } from "react-icons/io5";
import {
  FaUser,
  FaList,
  FaUsers,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaPlusCircle,
  FaMoneyBillWave,
  FaFileAlt,
  FaChalkboard,
  FaCog,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <PiSidebarSimpleDuotone className="text-lg md:text-xl" />
          </label>
          <div className="w-full flex items-center justify-between">
            <div className="md:px-4 font-semibold">Dashboard</div>
            <div className="px-4 text-sm md:text-md">
              Dark Mode <ThemeToggle />
            </div>
          </div>
        </nav>

        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div
          className="flex min-h-full flex-col items-start bg-base-200
                     is-drawer-open:w-64
                     is-drawer-close:w-14
                     transition-all duration-300"
        >
          <Link to={'/'} className="p-4 text-xl font-bold flex gap-2">
            <img src={logo} alt="logo" className="w-6 h-7 rounded-md"/>
            <span className="is-drawer-close:hidden">E-TuitionBD</span>
          </Link>

          <ul className="menu w-full grow flex flex-col gap-2 p-2">
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-base-300 text-base-content"
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Profile"
              >
                <FaUser className="text-lg" />
                <span className="is-drawer-close:hidden">Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/tuitions-list"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-base-300 text-base-content"
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Tuitions List"
              >
                <FaList className="text-lg" />
                <span className="is-drawer-close:hidden">Tuitions List</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/users-list"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-base-300 text-base-content"
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Users List"
              >
                <FaUsers className="text-lg" />
                <span className="is-drawer-close:hidden">Users List</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-tuitions"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-base-300 text-base-content"
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="My Tuitions"
              >
                <FaChalkboardTeacher className="text-lg" />
                <span className="is-drawer-close:hidden">My Tuitions</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/applied-tutors"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-base-300 text-base-content"
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Applied Tutors"
              >
                <FaUserGraduate className="text-lg" />
                <span className="is-drawer-close:hidden">Applied Tutors</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/add-tuition"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-base-300 text-base-content"
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Add Tuition"
              >
                <FaPlusCircle className="text-lg" />
                <span className="is-drawer-close:hidden">Add Tuition</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/payments"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-base-300 text-base-content"
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Payments"
              >
                <FaMoneyBillWave className="text-lg" />
                <span className="is-drawer-close:hidden">Payments</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-applications"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-base-300 text-base-content"
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="My Applications"
              >
                <FaFileAlt className="text-lg" />
                <span className="is-drawer-close:hidden">My Applications</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/ongoing-tuitions"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-base-300 text-base-content"
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Ongoing Tuitions"
              >
                <FaChalkboard className="text-lg" />
                <span className="is-drawer-close:hidden">
                  Ongoing Tuitions
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-base-300 text-base-content"
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip="Settings"
              >
                <FaCog className="text-lg" />
                <span className="is-drawer-close:hidden">Settings</span>
              </NavLink>
            </li>

            <div className="divider"></div>

            <li>
              <Link
                to="/"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-300 text-base-content is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Go Home"
              >
                <IoHomeOutline className="text-lg" />
                <span className="is-drawer-close:hidden">Go Home</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
