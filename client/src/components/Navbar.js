import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const uploadHandler =(e)=>{
        e.preventDefault();
        navigate("/upload")
    }

    return (
        <>
            <div className="fluid">
                <img src={process.env.PUBLIC_URL+"Photobomb_Logo.png"} alt="logo" width="200" height="44" classNameName="d-inline-block align-text-top" />
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-p="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <div className="nav-profile">
                    <p onClick={(e)=>uploadHandler(e)}>Upload</p>
                    <p>Profile
                        <select className="select">
                            <option>Edit Account</option>
                            <option>Logout</option>
                        </select>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Navbar;