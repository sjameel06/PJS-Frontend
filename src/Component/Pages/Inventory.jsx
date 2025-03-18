import React, { useState } from "react";

function Inventory() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Thermostat", category: "HVAC", quantity: 10 },
    { id: 2, name: "Pipe Wrench", category: "Plumbing", quantity: 5 },
    { id: 3, name: "Circuit Breaker", category: "Electrical", quantity: 8 },
  ]);
  
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "" });

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addItem = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.category && newItem.quantity) {
      setInventory([...inventory, { id: inventory.length + 1, ...newItem, quantity: Number(newItem.quantity) }]);
      setNewItem({ name: "", category: "", quantity: "" });
    }
  };

  return (
    <div className="bg-[#4DA1A9] py-10 min-h-screen text-white px-6">
      <h1 className="text-[3rem] font-bold text-center mb-6">Inventory Management</h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg text-black">
        <form onSubmit={addItem} className="mb-4 text-[1.6rem]">
          <div className="mb-2">
            <label className="block text-gray-700">Item Name:</label>
            <input type="text" name="name" value={newItem.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Category:</label>
            <input type="text" name="category" value={newItem.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Quantity:</label>
            <input type="number" name="quantity" value={newItem.quantity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Item</button>
        </form>
        <table className="w-full text-[1.6rem] border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Item Name</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.category}</td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
