"use client";
import React, { useEffect, useState } from "react";
import LogOutBtn from "../components/logOutBtn";
import { getUserData, userProfile } from "../auth/getUser";
import { User } from "@supabase/supabase-js";
import { UserProfile } from "../auth/getUser";
import { redirect } from "next/navigation";
import { Package, Heart, User2, Settings, ShoppingBag } from "lucide-react";
import Orders from "./orders";
import Favorites from "./favorites";

export default function Dashboard() {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserData();

      setData(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userProfile();
      setUserData(data);
    };
    fetchUserData();
  }, []);

  if (userData?.role === "admin") {
    redirect("/Admin/AllProducts");
  } else if (!data) {
    // redirect('/login');
  }

  // console.log(data?.id);
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="container mx-auto p-6 pt-24">
      {/* User Profile Header */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body flex-row items-center gap-4">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-20">
              <span className="text-2xl">
                {userData?.firstname?.[0]}
                {userData?.lastname?.[0]}
              </span>
            </div>
          </div>
          <div className="overflow-auto">
            <h1 className="text-2xl font-bold">
              Welcome, {userData?.firstname || "User"}!
            </h1>
            <p className="text-base-content/60">{data?.email}</p>
          </div>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="tabs tabs-boxed mb-6">
        <a
          className={`tab gap-2 ${activeTab === "orders" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <Package className="h-4 w-4" />
          <p className="md:block hidden">Orders</p>
        </a>
        <a
          className={`tab gap-2 ${
            activeTab === "favorites" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          <Heart className="h-4 w-4" />
          <p className="md:block hidden">Favorites</p>
        </a>
        <a
          className={`tab gap-2 ${activeTab === "profile" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <User2 className="h-4 w-4" />
          <p className="md:block hidden">Profile</p>
        </a>
        <a
          className={`tab gap-2 ${
            activeTab === "settings" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings className="h-4 w-4" />
          
          <p className="md:block hidden">Settings</p>
        </a>
      </div>

      {/* Tab Contents */}
      <div className="card bg-base-100 shadow-xl">
        {/* Orders Tab Content */}
        {activeTab === "orders" && <Orders />}

        {/* Favorites Tab Content */}
        {activeTab === "favorites" && <Favorites />}

        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <div className="card-body">
            <h2 className="card-title">Profile Information</h2>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">First Name</span>
                </label>
                <p className="text-base-content/70">
                  {userData?.firstname || "Not set"}
                </p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Last Name</span>
                </label>
                <p className="text-base-content/70">
                  {userData?.lastname || "Not set"}
                </p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <p className="text-base-content/70">{data?.email}</p>
              </div>
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Role</span>
                </label>
                <p className="text-base-content/70">
                  {userData?.role || "User"}
                </p>
              </div> */}
            </div>
          </div>
        )}

        {/* Settings Tab Content */}
        {activeTab === "settings" && (
          <div className="card-body">
            <h2 className="card-title">Account Settings</h2>
            <div className="space-y-4">
              <button className="btn btn-ghost w-full justify-between">
                <span>Edit Profile</span>
                <Settings className="h-4 w-4" />
              </button>
              <button className="btn btn-ghost w-full justify-between">
                <span>Notification Preferences</span>
                <Settings className="h-4 w-4" />
              </button>
              <LogOutBtn />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
