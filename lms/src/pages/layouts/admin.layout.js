import { Sidebar } from "../../components/admin/admin.component";
import { FooterComponent, HeaderComponent } from "../../components/home/home.component";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
    return (
        <div >
            <div style={{ position: "sticky", top: "0", zIndex: "9000", width: "100%" }}><HeaderComponent /></div>
            <Sidebar />
            <div > <Outlet />
                <FooterComponent /></div>
        </div>

    )
}
export default AdminLayout; 