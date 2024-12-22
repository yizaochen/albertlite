import React from "react";
import { Navbar } from "react-bootstrap";

const AppNavbar = ({ versionNumber }) => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <div className="container-fluid">
        <Navbar.Brand href="/">
          <span>AlbertLite</span>
        </Navbar.Brand>
        <div>
          <span className="badge bg-success">{versionNumber}</span>
        </div>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
