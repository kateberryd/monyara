import { Link } from "react-router-dom";

const Navbar= props => {
    return (
<div>
  <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="banner">
    <div className="container">
      {/* Brand */}
      <Link className="navbar-brand" to="/"><span><img src="img/core-img/logo.png" alt="logo" /></span> Monyara</Link>
      {/* Toggler/collapsibe Button */}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span className="navbar-toggler-icon" />
      </button>
      {/* Navbar links */}
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/my-loans">My Loans</Link>
          </li>
          <li className="nav-item">
            {props.isAdmin && <Link className="nav-link" to="/admin">Admin</Link>}
          </li>
          <li className="lh-55px"><a href="#" className="btn login-btn ml-50">Balance: {props.usdBalance}cUSD</a></li>
        </ul>
      </div>
    </div>
  </nav>
  {/* ##### Header Area End ##### */}

</div>

    );
}

export default Navbar;