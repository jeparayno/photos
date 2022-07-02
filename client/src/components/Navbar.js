import { Link } from "react-router-dom";



const Navbar = () => {

    const user = null;

    return (
        <>
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src="https://e7.pngegg.com/pngimages/359/743/png-clipart-logo-community-text-logo-thumbnail.png" alt="logo" width="46" height="44" className="d-inline-block align-text-top" />
                </a>
                {
                    user ? (
                        <div>
                            <span>hi {user.name}</span>
                            <Link to={'/'} ><button className="d-flex btn btn-outline-success" type="submit">Log Out</button></Link>
                        </div>
                    ) : (
                        <Link to={'/login'} ><button className="d-flex btn btn-outline-success" type="submit">Log In</button></Link>
                    )
                }
                
            </div>
        </nav>
        </>
    )
}

export default Navbar;