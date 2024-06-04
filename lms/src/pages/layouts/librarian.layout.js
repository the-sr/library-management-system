import { Outlet } from "react-router-dom";
import { FooterComponent, HeaderComponent } from "../../components/home/home.component";
import { Sidebar } from "../../components/librarian/librarian.component";

const LibrarianLayout = () => {
    return (
        <div >
            <div style={{ position: "sticky", top: "0", zIndex: "9000", width: "100%" }}><HeaderComponent /></div>
            <Sidebar />
            <div > <Outlet />
                <FooterComponent /></div>
        </div>
    )
}
export default LibrarianLayout; 