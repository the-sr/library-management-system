import { useState, useEffect } from "react";
import { auth_service } from "../../services/auth.service";
import "../../assets/css/only-user-list.css";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortCriteria, setSortCriteria] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const result = await auth_service.getAllUsers();
                setUsers(result);
            } catch (err) {
                setError(err.message || "Error fetching user list");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleSort = (e) => {
        const criteria = e.target.value;
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users
        .filter(user => user.role === "user")
        .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="user-list-container">
            <div className="search-sort-container">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-box"
                />
                <select onChange={handleSort} className="sort-select">
                    <option value="name">Sort by Name</option>
                    <option value="email">Sort by Email</option>
                    <option value="phone">Sort by Phone</option>
                    <option value="role">Sort by Role</option>
                </select>
            </div>
            <div className="user-list">
                {filteredUsers.map(user => (
                    <div key={user._id} className="user-card">
                        <img src={user.image ? `path/to/images/${user.image}` : "default-image-path"} alt="User" className="user-photo" />
                        <div className="user-details">
                            <p><strong style={{ color: 'green' }}>Name:</strong> {user.name}</p>
                            <p><strong style={{ color: 'green' }}>Email:</strong> {user.email}</p>
                            <p><strong style={{ color: 'green' }}>Phone:</strong> {user.phone}</p>
                            <p><strong style={{ color: 'green' }}>Role:</strong> {user.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserList;
