import React, { useState } from "react";
import Search from "../Search";              // :contentReference[oaicite:0]{index=0}
import { Button } from "../Button";          // :contentReference[oaicite:1]{index=1}
import Modal from "../Modal";                // :contentReference[oaicite:2]{index=2}
import { Input } from "../Input";            // :contentReference[oaicite:3]{index=3}

type ActiveTab = "customer" | "vehicle" | "dealer";

type UserManagementProps = {
    setActiveItem: (value: string) => void;
};

export default function UserManagement({ setActiveItem }: UserManagementProps) {
    const [activeTab, setActiveTab] = useState<ActiveTab>("customer");
    const [search, setSearch] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Dummy data
    const customers = [
        { id: "CUST-001", name: "John Doe", email: "john@mail.com", phone: "+62812...", city: "Bandung" },
        { id: "CUST-002", name: "Maria Tan", email: "maria@mail.com", phone: "+62877...", city: "Jakarta" },
        { id: "CUST-003", name: "Budi Santoso", email: "budi@mail.com", phone: "+62813...", city: "Surabaya" }
    ];

    const vehicles = [
        { id: "VEH-001", plate: "D 1234 AB", model: "Avanza", year: "2020", owner: "John Doe" },
        { id: "VEH-002", plate: "B 5678 CD", model: "Innova", year: "2019", owner: "Maria Tan" },
        { id: "VEH-003", plate: "L 9876 EF", model: "Jazz", year: "2021", owner: "Budi Santoso" }
    ];

    const dealers = [
        { id: "DLR-001", name: "Dealer Bandung", city: "Bandung", phone: "+6222 123456", email: "bandung@dealer.com" },
        { id: "DLR-002", name: "Dealer Jakarta", city: "Jakarta", phone: "+6221 654321", email: "jakarta@dealer.com" },
        { id: "DLR-003", name: "Dealer Surabaya", city: "Surabaya", phone: "+6231 789012", email: "surabaya@dealer.com" }
    ];

    // Filtering per tab
    const filteredCustomers = customers.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.id.toLowerCase().includes(search.toLowerCase())
    );
    const filteredVehicles = vehicles.filter(
        (v) =>
            v.plate.toLowerCase().includes(search.toLowerCase()) ||
            v.id.toLowerCase().includes(search.toLowerCase())
    );
    const filteredDealers = dealers.filter(
        (d) =>
            d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.id.toLowerCase().includes(search.toLowerCase())
    );

    const getTabTitle = (tab: ActiveTab) => {
        switch (tab) {
            case "customer": return "Customer Master";
            case "vehicle": return "Vehicle Master";
            case "dealer": return "Dealer Master";
        }
    };

    const getAddLabel = (tab: ActiveTab) => {
        switch (tab) {
            case "customer": return "Add Customer";
            case "vehicle": return "Add Vehicle";
            case "dealer": return "Add Dealer";
        }
    };

    return (
        <div className="p-0 text-white">
            {/* PAGE WRAPPER PADDING */}
            <div className="px-6 pt-6 pb-6">

                {/* TAB CONTAINER */}
                <div className="w-full rounded overflow-hidden">
                    <div className="flex">
                        {(["customer", "vehicle", "dealer"] as ActiveTab[]).map((tab, index) => {
                            const isActive = activeTab === tab;
                            const base = "flex-1 text-center font-semibold py-4 cursor-pointer text-lg";
                            const bg = isActive ? "bg-[#E2183D]" : "bg-[#7B7B7B]";

                            return (
                                <button
                                    key={tab}
                                    className={`${base} ${bg}`}
                                    onClick={() => {
                                        setActiveTab(tab);
                                        setSearch("");
                                    }}
                                >
                                    {getTabTitle(tab)}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* CONTENT AREA (dark background bawah tab) */}
                <div className="pt-6 px-0">
                    {/* SEARCH + ADD BUTTON */}
                    <div className="flex justify-between items-center mb-6">
                        <Search
                            value={search}
                            onChange={setSearch}
                            placeholder={
                                activeTab === "customer"
                                    ? "Search customer..."
                                    : activeTab === "vehicle"
                                        ? "Search vehicle..."
                                        : "Search dealer..."
                            }
                            className="w-full max-w-lg"
                        />

                        <Button
                            variant="danger"
                            className="rounded-full px-6 py-3 ml-6 bg-red-600 hover:bg-red-700 text-lg"
                            onClick={() => {
                                setActiveItem('add-customer');
                            }}
                        >
                            + {getAddLabel(activeTab)}
                        </Button>
                    </div>

                    {/* TABLE AREA – style mengikuti screenshot (pink header & row) */}
                    <div className="overflow-x-auto rounded-lg">
                        <table className="w-full border border-gray-700 text-black bg-white">
                            {/* HEADER */}
                            <thead>
                                {activeTab === "customer" && (
                                    <tr className="bg-red-300">
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Customer ID</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Name</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Phone</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Email</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">City</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Action</th>
                                    </tr>
                                )}
                                {activeTab === "vehicle" && (
                                    <tr className="bg-red-300">
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Vehicle ID</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Plate No.</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Model</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Year</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Owner</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Action</th>
                                    </tr>
                                )}
                                {activeTab === "dealer" && (
                                    <tr className="bg-red-300">
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Dealer ID</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Name</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">City</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Phone</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Email</th>
                                        <th className="px-4 py-3 border border-gray-700 font-semibold">Action</th>
                                    </tr>
                                )}
                            </thead>

                            {/* BODY */}
                            <tbody>
                                {/* CUSTOMER TAB */}
                                {activeTab === "customer" &&
                                    (filteredCustomers.length > 0 ? (
                                        filteredCustomers.map((c) => (
                                            <tr key={c.id} className="bg-red-100">
                                                <td className="border px-4 py-3 underline text-blue-800">
                                                    {c.id}
                                                </td>
                                                <td className="border px-4 py-3">{c.name}</td>
                                                <td className="border px-4 py-3">{c.phone}</td>
                                                <td className="border px-4 py-3">{c.email}</td>
                                                <td className="border px-4 py-3">{c.city}</td>
                                                <td className="border px-4 py-3">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedItem(c);
                                                            setIsEditOpen(true);
                                                        }}
                                                        className="p-2 hover:bg-gray-200 rounded-lg transition"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center py-6 bg-red-100 text-gray-700">
                                                No customers found
                                            </td>
                                        </tr>
                                    ))}

                                {/* VEHICLE TAB */}
                                {activeTab === "vehicle" &&
                                    (filteredVehicles.length > 0 ? (
                                        filteredVehicles.map((v) => (
                                            <tr key={v.id} className="bg-red-100">
                                                <td className="border px-4 py-3 underline text-blue-800">
                                                    {v.id}
                                                </td>
                                                <td className="border px-4 py-3">{v.plate}</td>
                                                <td className="border px-4 py-3">{v.model}</td>
                                                <td className="border px-4 py-3">{v.year}</td>
                                                <td className="border px-4 py-3">{v.owner}</td>
                                                <td className="border px-4 py-3">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedItem(v);
                                                            setIsEditOpen(true);
                                                        }}
                                                        className="p-2 hover:bg-gray-200 rounded-lg transition"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center py-6 bg-red-100 text-gray-700">
                                                No vehicles found
                                            </td>
                                        </tr>
                                    ))}

                                {/* DEALER TAB */}
                                {activeTab === "dealer" &&
                                    (filteredDealers.length > 0 ? (
                                        filteredDealers.map((d) => (
                                            <tr key={d.id} className="bg-red-100">
                                                <td className="border px-4 py-3 underline text-blue-800">
                                                    {d.id}
                                                </td>
                                                <td className="border px-4 py-3">{d.name}</td>
                                                <td className="border px-4 py-3">{d.city}</td>
                                                <td className="border px-4 py-3">{d.phone}</td>
                                                <td className="border px-4 py-3">{d.email}</td>
                                                <td className="border px-4 py-3">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedItem(d);
                                                            setIsEditOpen(true);
                                                        }}
                                                        className="p-2 hover:bg-gray-200 rounded-lg transition"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center py-6 bg-red-100 text-gray-700">
                                                No dealers found
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ADD MODAL */}
            <Modal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                title={`Add ${getTabTitle(activeTab).replace("Master", "")}`}
            >
                <div className="space-y-4">
                    {activeTab === "customer" && (
                        <>
                            <Input label="Customer Name" placeholder="Enter name" />
                            <Input label="Email" placeholder="Enter email" />
                            <Input label="Phone" placeholder="Enter phone" />
                            <Input label="City" placeholder="Enter city" />
                        </>
                    )}

                    {activeTab === "vehicle" && (
                        <>
                            <Input label="Plate Number" placeholder="e.g. D 1234 AB" />
                            <Input label="Model" placeholder="e.g. Avanza" />
                            <Input label="Year" placeholder="e.g. 2020" />
                            <Input label="Owner" placeholder="Owner name" />
                        </>
                    )}

                    {activeTab === "dealer" && (
                        <>
                            <Input label="Dealer Name" placeholder="Enter dealer name" />
                            <Input label="City" placeholder="Enter city" />
                            <Input label="Phone" placeholder="Enter phone" />
                            <Input label="Email" placeholder="Enter email" />
                        </>
                    )}

                    <div className="pt-2">
                        <Button variant="primary" onClick={() => setIsAddOpen(false)}>
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* EDIT MODAL */}
            <Modal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title={`Edit ${getTabTitle(activeTab).replace("Master", "")}`}
            >
                <div className="space-y-4">
                    {activeTab === "customer" && (
                        <>
                            <Input label="Customer Name" defaultValue={selectedItem?.name} />
                            <Input label="Email" defaultValue={selectedItem?.email} />
                            <Input label="Phone" defaultValue={selectedItem?.phone} />
                            <Input label="City" defaultValue={selectedItem?.city} />
                        </>
                    )}

                    {activeTab === "vehicle" && (
                        <>
                            <Input label="Plate Number" defaultValue={selectedItem?.plate} />
                            <Input label="Model" defaultValue={selectedItem?.model} />
                            <Input label="Year" defaultValue={selectedItem?.year} />
                            <Input label="Owner" defaultValue={selectedItem?.owner} />
                        </>
                    )}

                    {activeTab === "dealer" && (
                        <>
                            <Input label="Dealer Name" defaultValue={selectedItem?.name} />
                            <Input label="City" defaultValue={selectedItem?.city} />
                            <Input label="Phone" defaultValue={selectedItem?.phone} />
                            <Input label="Email" defaultValue={selectedItem?.email} />
                        </>
                    )}

                    <div className="pt-2">
                        <Button variant="primary" onClick={() => setIsEditOpen(false)}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

/** Simple edit icon, biar tidak mengulang SVG di banyak tempat */
function EditIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-black"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 3.487l3.651 3.65M4.5 20.25l1.232-4.928a2.25 2.25 0 01.621-1.09L16.862 3.487a1.5 1.5 0 012.121 0l1.128 1.128a1.5 1.5 0 010 2.121L9.603 17.48a2.25 2.25 0 01-1.09.621L4.5 20.25z"
            />
        </svg>
    );
}