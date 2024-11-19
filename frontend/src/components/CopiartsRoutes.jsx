import { Route, Navigate, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Gallery from "./Gallery";
import Admin from "./Admin";
import Login from "./Login";
import AdditionalInformation from "./AdditionalInformation";
// import Redirects from "./Redirects";

function CopiartsRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/gallery" element={<Gallery />}/>
            <Route path="/admin/login" element={<Login />}/>
            <Route path="/admin/calendar" element={<Admin />}/>
            <Route path="/additional-information" element={<AdditionalInformation />}/>
            {/* <Route path="/badrequest/:type" element={<Redirects />}/> */}
            {/* <Route path="*" element={<Navigate to="/badrequest/noPage" replace />}/> */}
        </Routes>
    )

}

export default CopiartsRoutes;