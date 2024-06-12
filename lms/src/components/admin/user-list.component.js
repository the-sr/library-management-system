import { useState, useEffect } from "react";
import { auth_service } from "../../services/auth.service";
import UserDetails from "./user-detail.component";
import "../../assets/css/user-list.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-list-container">
      {selectedUser ? (
        <UserDetails user={selectedUser} onBackClick={handleBackClick} />
      ) : (
        <>
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
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="user-card"
                onClick={() => handleUserClick(user)}
              >
                {/* <img src={user.image ? `path/to/images/${user.image}` : "default-image-path"} alt="User" className="user-photo" /> */}
                <img
                  src={process.env.PUBLIC_URL + "/profile.png"}
                  alt="User"
                  className="profile-photo"
                />
                <div className="user-details">
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <p>
                    <strong>Role:</strong>
                    {user.role === "user" ? "Student" : user.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
