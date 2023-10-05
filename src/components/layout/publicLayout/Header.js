import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  const [wasLogin, setWasLogin] = useState(false);

  useEffect(() => {
    setWasLogin(window.localStorage.getItem('token') != null);
  }, []);
  return (
    <>
      <div style={{ backgroundColor: "#E1E4EB" }} className="container-fluid fixed-top px-0 wow fadeIn" data-wow-delay="0.1s">
        <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
          <div className="col-lg-6 px-5 text-start">
            <small><i className="fa fa-map-marker-alt me-2"></i>FPT University, Hòa Lạc, HN, VN</small>
            <small className="ms-4"><i className="fa fa-envelope me-2"></i>cookingtogether@cooking.com</small>
          </div>
          <div className="col-lg-6 px-5 text-end">
            <small>Follow us:</small>
            <a className="text-body ms-3" href=""><i className="fab fa-facebook-f"></i></a>
            <a className="text-body ms-3" href=""><i className="fab fa-twitter"></i></a>
            <a className="text-body ms-3" href=""><i className="fab fa-linkedin-in"></i></a>
            <a className="text-body ms-3" href=""><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
          <Link to="/" className="navbar-brand ms-4 ms-lg-0">
            <h1 className="fw-bold text-primary m-0">C<span className="text-secondary">oo</span>ky</h1>
          </Link>
          <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto p-4 p-lg-0">
              <Link to='/' className="nav-item nav-link active d-lg-none">Home</Link>
              <Link className="nav-item nav-link d-lg-none">About Us</Link>
            </div>
            <div className="d-none d-lg-flex ms-2">
              <Link style={{ textDecoration: "none", color: "black" }} className="btn-sm-square bg-white rounded-circle ms-3" to='/'>
                <i className="fa-solid fa-house"></i>
              </Link>
              <Link style={{ textDecoration: "none", color: "black" }} className="btn-sm-square bg-white rounded-circle ms-3" to='/search'>
                <small className="fa fa-search text-body"></small>
              </Link>
              <Link style={{ textDecoration: "none", color: "black" }} className="btn-sm-square bg-white rounded-circle ms-3" to='/minhquang/profile'>
                <i className="fa-regular fa-heart"></i>
              </Link>
              {!wasLogin ?
                <Link style={{ textDecoration: "none", color: "black", padding: "0 10px", borderRadius: "20px", paddingTop: "2.5px" }} className=" bg-white ms-3" to='/login'>
                  <small className="text-body">Đăng nhập</small>
                </Link> :
                <Link style={{ textDecoration: "none", color: "black" }} className="btn-sm-square bg-white rounded-circle ms-3" to='/'>
                  <small className="fa fa-user text-body"></small>
                </Link>
              }
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Header