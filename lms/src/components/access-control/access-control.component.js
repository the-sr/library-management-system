import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const AdminAccessCntrol = ({ Component }) => {
    let token = localStorage.getItem("library_system_token")
    let [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            //API integration for token verification
            let user_detail = {
                result: {
                    _id: 1,
                    name: "User One",
                    email: "Userone@gmail.com",
                    role: "admin"
                }
            };
            if (user_detail.result.role !== 'admin') {
                toast.warning("You do not have previliage to access admin panel");
            }
            setLoading(false);
        }
    }, [])
    return loading ? <>Loading...</> : Component;
}