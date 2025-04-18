import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import { Student, Teacher, Admin } from "./User";
import { useSelector } from "react-redux";

const Content = (props) => {
    const { user } = props;
    if (!user) {
        return <div className="">User not valid.</div>;
    }

    switch (user?.role) {
        case "STUDENT":
            return <Student />;
        case "TEACHER":
            return <Teacher />;
        case "ADMIN":
            return <Admin />;
        default:
            return <div className="">User not valid.</div>;
    }
};

export default function AppRoutes() {
    const user = useSelector((s) => s.auth.user);

    return (
        <Routes>
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Content user={user} />} />
        </Routes>
    );
} 