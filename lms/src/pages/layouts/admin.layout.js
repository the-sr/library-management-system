import { Sidebar } from "../../components/admin/admin.component";
import { FooterComponent, HeaderComponent } from "../../components/home/home.component";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
    return (
        <>
            <HeaderComponent />
            <Sidebar />
            <Outlet />
            <FooterComponent />
        </>
    )
}
export default AdminLayout; 