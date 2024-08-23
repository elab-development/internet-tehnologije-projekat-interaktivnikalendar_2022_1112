import React from "react";
import { Link } from "react-router-dom";

function NavBar({ loggedInUser, onLogout, isAdmin }) {
  return (
    <div className="navBar">
      <Link to="/">Interaktivni kalendar</Link>
      <Link to="/events">Svi događaji</Link>
      <Link to="/users">Korisnici</Link>
      {loggedInUser && <Link to="/lokacije">Lokacije</Link>}

      {loggedInUser && <button onClick={onLogout}>Odjavi se</button>}
      {!loggedInUser && <Link to="/">Login</Link>}
    </div>
  );
}

export default NavBar;
