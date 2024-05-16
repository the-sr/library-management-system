import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/home/auth/login.page";
import ErrorPage from "./pages/common/error.page";
import RegisterPage from "./pages/home/auth/register.page";
import BookDetails from "./pages/home/book/book-details.page";
import AdminLayout from "./pages/layouts/admin.layout";
const Routing = () => {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/book/:id" element={<BookDetails />} />

                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<>Admin Dashboard</>} />
                    <Route path="user" element={<>List all users</>} />
                    <Route path="user/:id/edit" element={<>Edit User</>} />
                </Route>

                <Route path="/user" element={<>UserLayout</>}>
                    <Route index element={<>User DashBoard</>} />
                    <Route path="books" element={<>User's Borrowed Books</>} />
                    <Route path="edit" element={<>Edit User</>} />
                </Route>



                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    </>)
}
export default Routing;