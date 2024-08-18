import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="position-relative">
            <nav
                className="navbar navbar-expand-lg shadow-sm"
                style={{ height: '63px',backgroundColor: "#303030", marginLeft: "250px", boxShadow: "4px 0 8px rgba(0, 0, 0, 0.1)" }}
            >
            </nav>
            <div className="position-absolute top-0 start-0">
                <Sidebar />
            </div>
            <div style={{ marginLeft: '268px', marginTop: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Navbar;