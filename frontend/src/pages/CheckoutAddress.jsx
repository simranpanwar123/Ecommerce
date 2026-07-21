import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  User,
  Phone,
  MapPin,
  Building2,
  Landmark,
  Hash,
} from "lucide-react";

export default function CheckoutAddress() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async (e) => {
    e.preventDefault();

    try {
      await api.post("/address/add", {
        ...form,
        userId,
      });

      navigate("/checkout");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl overflow-hidden">

        {/* Header */}

        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">
            Delivery Address
          </h1>
          <p className="text-blue-100 mt-1">
            Please enter your shipping details.
          </p>
        </div>

        <form
          onSubmit={saveAddress}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Full Name */}

          <div>
            <label className="font-medium mb-2 block">
              Full Name
            </label>

            <div className="flex items-center border rounded-lg px-3">
              <User className="text-gray-400 w-5 h-5" />

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter Full Name"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Phone */}

          <div>
            <label className="font-medium mb-2 block">
              Phone Number
            </label>

            <div className="flex items-center border rounded-lg px-3">
              <Phone className="text-gray-400 w-5 h-5" />

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Address */}

          <div className="md:col-span-2">
            <label className="font-medium mb-2 block">
              Address
            </label>

            <div className="flex items-center border rounded-lg px-3">
              <MapPin className="text-gray-400 w-5 h-5" />

              <textarea
                rows="3"
                name="addressLine"
                value={form.addressLine}
                onChange={handleChange}
                placeholder="House No, Street, Area"
                className="w-full p-3 outline-none resize-none"
                required
              />
            </div>
          </div>

          {/* City */}

          <div>
            <label className="font-medium mb-2 block">
              City
            </label>

            <div className="flex items-center border rounded-lg px-3">
              <Building2 className="text-gray-400 w-5 h-5" />

              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          {/* State */}

          <div>
            <label className="font-medium mb-2 block">
              State
            </label>

            <div className="flex items-center border rounded-lg px-3">
              <Landmark className="text-gray-400 w-5 h-5" />

              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Pincode */}

          <div>
            <label className="font-medium mb-2 block">
              Pincode
            </label>

            <div className="flex items-center border rounded-lg px-3">
              <Hash className="text-gray-400 w-5 h-5" />

              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Button */}

          <div className="md:col-span-2 mt-4">

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-4 rounded-xl text-lg shadow-lg"
            >
              Save & Continue
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}