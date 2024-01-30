import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/file-upload'>File Upload</NavLink>
            <NavLink to='/input-detail'>Input Detail</NavLink>
            <NavLink to='/complete'>Complete</NavLink>
        </nav>
    );
};

// {/* <nav id='navBar'>
    // <ul>
    //     <li>
    //         <NavLink to="/">Home</NavLink>
    //     </li>
    //     <li>
    //         <NavLink to="/file-upload">About</NavLink>
    //     </li>
    //     <li>
    //         <NavLink to="/input-detail">Product</NavLink>
    //     </li>
    //     <li>
    //         <NavLink to="/blank">Blank</NavLink>
    //     </li>
    // </ul>
// </nav> */}