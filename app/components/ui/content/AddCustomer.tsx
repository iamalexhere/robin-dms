import React, { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";

export default function AddCustomer() {
    const [fullName, setFullName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [birthDate, setBirthDate] = useState("");

    return (
        <div
            className="min-h-screen text-white px-10 py-16"
            style={{ backgroundColor: "#262421" }}
        >
            {/* TITLE */}
            <h1 className="text-4xl font-bold mb-12">Add New Customer</h1>

            <div className="grid grid-cols-1 gap-8 max-w-2xl">
                {/* FULL NAME */}
                <div>
                    <label className="block text-lg font-medium mb-2">Full name:</label>
                    <Input
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        size="lg"
                    />
                </div>

                {/* MOBILE NUMBER */}
                <div>
                    <label className="block text-lg font-medium mb-2">
                        Mobile number:
                    </label>
                    <Input
                        placeholder="Enter phone number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        size="lg"
                        variant="number"
                    />
                </div>

                {/* EMAIL */}
                <div>
                    <label className="block text-lg font-medium mb-2">Email:</label>
                    <Input
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="lg"
                    />
                </div>

                {/* CITY */}
                <div>
                    <label className="block text-lg font-medium mb-2">City:</label>
                    <Input
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        size="lg"
                    />
                </div>

                {/* BIRTH DATE */}
                <div>
                    <label className="block text-lg font-medium mb-2">Birth date:</label>
                    <Input
                        variant="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        size="lg"
                        className="cursor-pointer"
                    />
                </div>

                {/* ADDRESS */}
                <div>
                    <label className="block text-lg font-medium mb-2">Address:</label>
                    <textarea
                        className="w-full rounded-xl px-4 py-3 text-black border-2 border-[#D3D3D3] focus:outline-none"
                        rows={3}
                        placeholder="Enter full address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-6 mt-16">
                <Button
                    variant="danger"
                    size="lg"
                    className="rounded-full px-12 bg-[#E2183D] hover:bg-[#c91536] text-xl"
                >
                    Save
                </Button>

                <Button
                    variant="ghost"
                    size="lg"
                    className="rounded-full px-12 border-[#E2183D] text-xl hover:bg-white/20"
                    onClick={() => window.history.back()}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}