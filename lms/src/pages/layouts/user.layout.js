import { Outlet } from "react-router-dom";
import { FooterComponent, HeaderComponent } from "../../components/home/home.component";
import { Sidebar } from "../../components/user/user.component";

const UserLayout = () => {
    return (
        <>
            <HeaderComponent />
            <Sidebar />
            <Outlet />
            <FooterComponent />
        </>
    )
}
export default UserLayout; 