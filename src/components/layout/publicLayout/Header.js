import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'
import Swal from 'sweetalert2';
const Header = () => {
  const [wasLogin, setWasLogin] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isOpen, setIsOpen] = useState(false);
  // localStorage.removeItem('token');
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    console.log(12345);
    localStorage.removeItem('user');

    setWasLogin(true)
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setWasLogin(false);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Đăng xuất thành công.',
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/');
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const statusCode = urlParams.get('statusCode');
    const rawData = urlParams.get('data');
    let data;
    if (rawData) {
      data = JSON.parse(decodeURIComponent(rawData));
      // localStorage.setItem("token", data.token)
      console.log(typeof data);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log(JSON.parse(localStorage.getItem('user')));
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    setWasLogin(window.localStorage.getItem('token') != null);
    setWasLogin(window.localStorage.getItem('user') == null);
    console.log(wasLogin);
    setUser(window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null);
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
              <Link style={{ textDecoration: "none", color: "black" }} className="btn-sm-square bg-white rounded-circle ms-3" to='/recipe/search'>
                <small className="fa fa-search text-body"></small>
              </Link>
              <Link style={{ textDecoration: "none", color: "black" }} className="btn-sm-square bg-white rounded-circle ms-3" to='/minhquang/profile'>
                <i className="fa-regular fa-heart"></i>
              </Link>
              {wasLogin ?
                <Link style={{ textDecoration: "none", color: "black", padding: "0 10px", borderRadius: "20px", paddingTop: "2.5px" }} className=" bg-white ms-3" to='/login'>
                  <small className="text-body">Đăng nhập</small>
                </Link> :
                <div
                  style={{ textDecoration: 'none', color: 'black', cursor: "pointer" }}
                  className="btn-sm-square bg-white rounded-circle ms-3 position-relative"
                  onClick={toggleMenu}
                >
                  <small className="fa fa-user text-body"></small>
                  {
                    isOpen && user && (
                      <div className="btn-group position-absolute top-100 mt-1 " style={{ width: '400px' }}>
                        <div style={{ backgroundColor: 'white', padding: '5px', borderRadius: '10px', width: '265px' }}>
                          <span className="ms-3" style={{ marginLeft: 0, color: "blue" }}>{user.name}</span> <hr />
                          <table class="table table-hover">
                            <tbody>
                              <tr>
                                <td onClick={handleLogout} > <i class="fa-solid fa-arrow-right-from-bracket"></i> <span style={{ marginLeft: '15px' }}>Logout</span>  </td>
                              </tr>
                              <tr>
                                <td><i class="fa fa-id-card" aria-hidden="true"></i> <span style={{ marginLeft: '15px' }}>Dashboard</span></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                      </div>
                    )
                  }
                </div>
              }

            </div >
          </div >

        </nav >
      </div >
    </>
  )
}


export default Header