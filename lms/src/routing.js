import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/home/auth/login.page";
import ErrorPage from "./pages/common/error.page";
import RegisterPage from "./pages/home/auth/register.page";
import AdminLayout from "./pages/layouts/admin.layout";
import { AdminAccessCntrol } from "./components/access-control/access-control.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import HomePageLayout from "./pages/layouts/homepage.layout";
import UserLayout from "./pages/layouts/user.layout";
import LibrarianLayout from "./pages/layouts/librarian.layout";
const Routing = () => {
    return (<>
        <ToastContainer />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePageLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>


                <Route path="/admin" element={<AdminAccessCntrol accessTo={"admin"} Component={<AdminLayout />} />}>
                    {/* <Route index element={<>Admin Dashboard</>} />
                    <Route path="users" element={<>List all users</>} />
                    <Route path="user/:id/edit" element={<>Edit User</>} /> */}
                </Route>

                <Route path="/user" element={<AdminAccessCntrol accessTo={"user"} Component={<UserLayout />} />}>
                    {/* <Route index element={<>User DashBoard</>} />
                    <Route path="books" element={<>User's Borrowed Books</>} />
                    <Route path="edit" element={<>Edit User</>} /> */}
                </Route>

                <Route path="/librarian" element={<AdminAccessCntrol accessTo={"librarian"} Component={<LibrarianLayout />} />}>
                    {/* <Route index element={<>User DashBoard</>} />
                    <Route path="books" element={<>User's Borrowed Books</>} />
                    <Route path="edit" element={<>Edit User</>} /> */}
                </Route>

                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    </>)
}
export default Routing;