import { useState,useEffect } from "react";
import AccountSidebar from "../../components/auth/AccountSidebar";
import ProfileForm from "../../components/auth/ProfileForm";
import OrdersList from "../../components/auth/OrdersList";
import AddressSection from "../../components/auth/AddressSection";
import ChangePassword from "../../components/auth/ChangePassword";

const MyAccountPage = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    });
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 inter">
      <h1 className="text-center text-2xl sm:text-3xl font-semibold py-6 sm:py-8">
        My Account
      </h1>

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md relative">
        <div className="flex flex-col lg:flex-row">
          <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="flex-1 p-6 sm:p-8">
            {activeTab === "profile" && <ProfileForm />}
            {activeTab === "orders" && <OrdersList/>}
            {activeTab === "address" && <AddressSection/>}
            {activeTab === "password" && <ChangePassword/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
