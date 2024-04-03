import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Home'
import SignIn from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import ProjectPage from "../Projects";
import Tasks from "../Tasks";

export default function StackRoutes() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/project/:title" element={<ProjectPage />} />
                    <Route path="/project/:title/tasks" element={<Tasks />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}