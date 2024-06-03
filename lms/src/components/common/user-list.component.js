import { auth_service } from "../../services/auth.service";
import { useState, useEffect } from "react";
import "../../assets/css/user-list.css"; // Ensure this file contains necessary styles

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortCriteria, setSortCriteria] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const result = await auth_service.getAllUsers();
                setUsers(result);
            } catch (err) {
                setError(err.message || "Error fetching user list ");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleSort = (criteria) => {
        const order = sortOrder === "asc" ? "desc" : "asc";
        setSortCriteria(criteria);
        setSortOrder(order);

        const sortedUsers = [...users].sort((a, b) => {
            if (a[criteria] < b[criteria]) return order === "asc" ? -1 : 1;
            if (a[criteria] > b[criteria]) return order === "asc" ? 1 : -1;
            return 0;
        });

        setUsers(sortedUsers);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="user-list-container">
            <div className="sort-buttons">
                <button onClick={() => handleSort("name")}>Sort by Name</button>
                <button onClick={() => handleSort("email")}>Sort by Email</button>
                <button onClick={() => handleSort("phone")}>Sort by Phone</button>
                <button onClick={() => handleSort("role")}>Sort by Role</button>
            </div>
            <div className="user-list">
                {users.map(user => (
                    <div key={user._id} className="user-card">
                        <img src={user.image ? `path/to/images/${user.image}` : "default-image-path"} alt="User" className="user-photo" />
                        <div className="user-details">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <p><strong>Role:</strong> {user.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserList;
