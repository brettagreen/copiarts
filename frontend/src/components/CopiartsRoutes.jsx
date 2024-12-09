import { Route, Navigate, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Gallery from "./Gallery";
import Admin from "./Admin";
import Login from "./Login";
import AdditionalInformation from './AdditionalInformation';
import Contact from "./Contact";
// import Redirects from "./Redirects";

/**
 * @component /frontend/src/comonents/CopiartsRoutes
 * @requires module:react-router-dom.Route
 * @requires module:react-router-dom.Navigate
 * @requires module:react-router-dom.Routes
 * @requires module:/frontend/src/components/Home
 * @requires module:/frontend/src/components/About
 * @requires module:/frontend/src/components/Gallery
 * @requires module:/frontend/src/components/Admin
 * @requires module:/frontend/src/components/Login
 * @requires module:/frontend/src/components/AdditionalInformation
 * @requires module:/frontend/src/components/Contact
 * 
 * @description CopiartsRoutes component. extension of BrowserRouter component as defined in the App component. 
 * components. specified path values on the Route objects determine which site Component is rendered. url values are 
 * read potential path matches IN ORDER i.e. top-down. 
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0

 * @returns {JSX.Element} BrowswerRouter Routes component which is comprised of individual Route objects. This is essentially
 * the BrowserRouter's navigation table.
 *
 * @example url path '/games' will render the Games component. '/heyiamapagethatdoesntexist/tacos!' will be sent to '/badrequest/noPage'
 * to be handled by the Redirects component.
 */
function CopiartsRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/gallery" element={<Gallery />}/>
            <Route path="/admin/login" element={<Login />}/>
            <Route path="/admin/calendar" element={<Admin />}/>
            <Route path="/additional-information" element={<AdditionalInformation />}/>
            <Route path="/contact" element={<Contact />}/>
            {/* <Route path="/badrequest/:type" element={<Redirects />}/> */}
            {/* <Route path="*" element={<Navigate to="/badrequest/noPage" replace />}/> */}
        </Routes>
    )

}

export default CopiartsRoutes;