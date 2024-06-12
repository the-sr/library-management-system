import React, { useState } from "react";
import "../../assets/css/add-librarian.css";
import { auth_service } from "../../services/auth.service";
import { toast } from "react-toastify";

const AddLibrarian = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "librarian",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { name, email, password, phone } = formData;
    if (!name || !email || !password || !phone) {
      return "All fields are required.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return "Invalid email format.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      return "Phone number must be 10 digits.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      await auth_service.addLibrarian(formData);
      setSuccess("Librarian added successfully!");
      toast.success("Librarian Added Successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "librarian",
      });
    } catch (err) {
      setError(err.message || "Error adding librarian");
      toast.warning("Error Adding Librarian");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-librarian-container">
      <p>Add Librarian</p>
      <hr />
      <form onSubmit={handleSubmit} className="add-librarian-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            readOnly
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Librarian"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default AddLibrarian;
