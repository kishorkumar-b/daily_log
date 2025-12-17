import React, { useEffect, useState } from "react";
import {api} from "../../api/axiosConfig";
import UpdateProductModal from "./UpdateProductModal";
import DeleteProductModal from "./DeleteProductModal";
import PopupMessage from "../common/PopupMessage"; // Adjust the path if needed

export default function ProductTab({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    product_id: "",
    product_name: "",
    budget: "",
    total_employees: "",
    team: "",
    status: "Active",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  // Popup state
  const [popupMsg, setPopupMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const showMessage = (msg) => {
    setPopupMsg(msg);
    setShowPopup(true);
  };

  // Fetch products and apply role-based filtering
  const fetchProducts = async () => {
    try {
      const res = await api.post("/dashboard/data", {
        username: user.username,
        role: user.role,
        team: user.team,
      });

      let allProducts = res.data.products || [];

      // Role-based filtering
      if (user.role === "MANAGER" || user.role === "EMPLOYEE") {
        allProducts = allProducts.filter((p) => p.team === user.team);
      }

      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      showMessage("Failed to fetch products!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.username) fetchProducts();
  }, [user]);

  if (!user?.role) {
    return (
      <p className="text-red-600 font-semibold">
        Your account is in processing. Access will be provided shortly.
      </p>
    );
  }

  const handleAdd = async () => {
    if (user.role !== "Admin" && user.role !== "MANAGER") {
      showMessage("You don't have permission to add products!");
      return;
    }

    const { product_id, product_name, budget, total_employees, team } = newProduct;

    if (!product_id || !product_name || !budget || !total_employees || total_employees <= 0 || !team) {
      showMessage("Please fill in all fields correctly!");
      return;
    }

    if (user.role !== "Admin" && user.team !== team) {
      showMessage("You can't add products to other teams");
      return;
    }

    try {
      const payload = {
        ...newProduct,
        role: user.role,
        created_by: user.username,
      };

      const res = await api.post("/master/product/add", payload);
      showMessage(res.data || "Product added successfully!");
      setNewProduct({
        product_id: "",
        product_name: "",
        budget: "",
        total_employees: "",
        team: "",
        status: "Active",
      });

      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      showMessage("Failed to add product");
    }
  };

  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  const handleUpdateClick = () => {
    if (!selectedProduct) return showMessage("Select a product first!");
    setShowUpdateModal(true);
  };

  const handleDeleteClick = () => {
    if (!selectedProduct) return showMessage("Select a product first!");
    setShowDeleteModal(true);
  };

  const handleUpdateSuccess = (updated) => {
    setProducts((prev) =>
      prev.map((p) => (p.product_id === updated.product_id ? updated : p))
    );
    setSelectedProduct(null);
    setShowUpdateModal(false);
    showMessage("Product updated successfully!");
  };

  const handleDeleteSuccess = (deletedId) => {
    setProducts((prev) => prev.filter((p) => p.product_id !== deletedId));
    setSelectedProduct(null);
    setShowDeleteModal(false);
    showMessage("Product deleted successfully!");
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + rowsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setSelectedProduct(null);
    setCurrentPage(page);
  };

  if (loading) return <p>Loading products...</p>;
  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto relative">
      <h2 className="text-lg font-semibold mb-4">Product Management</h2>

      {/* Add Product Form */}
      {(user.role === "Admin" || user.role === "MANAGER") && (
        <div className="grid grid-cols-7 gap-2 mb-6">
          <input
            type="number"
            placeholder="Product ID"
            value={newProduct.product_id}
            onChange={(e) => setNewProduct({ ...newProduct, product_id: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Product Name"
            value={newProduct.product_name}
            onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Budget"
            value={newProduct.budget}
            onChange={(e) => setNewProduct({ ...newProduct, budget: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Total Employees"
            value={newProduct.total_employees}
            onChange={(e) => setNewProduct({ ...newProduct, total_employees: e.target.value })}
            className="border p-2 rounded"
          />
          <select
            value={newProduct.team}
            onChange={(e) => setNewProduct({ ...newProduct, team: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Team</option>
            <option value="SDMS">SDMS</option>
            <option value="LIMS">LIMS</option>
            <option value="ELN">ELN</option>
          </select>
          <select
            value={newProduct.status}
            onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option>Active</option>
            <option>Inprocess</option>
            <option>Completed</option>
            <option>Inactive</option>
          </select>
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      )}

      {/* Product Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Budget</th>
            <th className="border p-2">Employees</th>
            <th className="border p-2">Team</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((p) => (
            <tr
              key={p.product_id}
              className={`border-b cursor-pointer ${selectedProduct?.product_id === p.product_id ? "bg-blue-100" : ""}`}
              onClick={() => handleRowClick(p)}
            >
              <td className="border p-2">{p.product_id}</td>
              <td className="border p-2">{p.product_name}</td>
              <td className="border p-2">{p.budget}</td>
              <td className="border p-2">{p.total_employees}</td>
              <td className="border p-2">{p.team}</td>
              <td className="border p-2">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Next
        </button>
      </div>

      {/* Update & Delete Buttons */}
      {(user.role === "Admin" || user.role === "MANAGER") && (
        <div className="fixed bottom-8 right-8 flex gap-4">
          <button
            disabled={!selectedProduct}
            className={`px-3 py-1 rounded-lg shadow-lg ${!selectedProduct ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
            onClick={handleUpdateClick}
          >
            Update
          </button>

          <button
            disabled={!selectedProduct || selectedProduct.status?.toLowerCase() === "active"}
            className={`px-3 py-1 rounded-lg shadow-lg ${!selectedProduct || selectedProduct.status?.toLowerCase() === "active" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      )}

      {/* Modals */}
      {showUpdateModal && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => setShowUpdateModal(false)}
          onSuccess={handleUpdateSuccess}
        />
      )}
      {showDeleteModal && (
        <DeleteProductModal
          product={selectedProduct}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {/* Popup Message */}
      <PopupMessage
        show={showPopup}
        message={popupMsg}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}
