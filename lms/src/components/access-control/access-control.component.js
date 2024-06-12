import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth_service } from "../../services/auth.service";
import HashLoader from "react-spinners/HashLoader";

export const AdminAccessCntrol = ({ Component, accessTo }) => {
  let token = localStorage.getItem("library_system_token");
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const getUserDetails = useCallback(async () => {
    try {
      let response = await auth_service.getLoggedInUser();

      if (response.user_details.role === accessTo) {
        setLoading(false);
      } else {
        toast.warn("You do not have access to admin panel");
        navigate("/" + response.role);
      }
    } catch (e) {}
  }, [loading]);
  useEffect(() => {
    getUserDetails();
  }, []);

  return loading ? (
    <>
      <HashLoader
        color={"#00ff00"}
        loading={loading}
        cssOverride={{
          display: "block",
          margin: "0 auto",
          borderColor: "red",
        }}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  ) : (
    Component
  );
};
