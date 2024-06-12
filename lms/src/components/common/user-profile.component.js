import { auth_service } from "../../services/auth.service";
import { useState, useEffect } from "react";
import "../../assets/css/user-profile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await auth_service.getLoggedInUser();
        setUser(result.user_details);
      } catch (err) {
        setError(err.message || "Error fetching user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-content">
      {/* <img src={user.image ? `path/to/images/${user.image}` : "default-image-path"} alt="User" className="profile-photo" /> */}
      <img
        src={process.env.PUBLIC_URL + "/profile.png"}
        alt="User"
        className="profile-photo"
      />
      <div className="profile-details">
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
          <strong>Role:</strong> {user.role === "user" ? "Student" : user.role}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
