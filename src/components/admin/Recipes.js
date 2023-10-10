import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
const Recipes = () => {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get('/admin/recipe', {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data?.recipes);
                setRecipes(res.data?.recipes);
            })
            .catch(err => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: "Error network",
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }, []);
    return (
        <div>
            <section className="ftco-section">
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-wrap">
                            <table className="table table-responsive-xl">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên món</th>
                                        <th>Người tạo</th>
                                        <th>Status</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recipes?.map((item,index) => 
                                    <tr key={item?._id + "recipe"} className="alert" role="alert">
                                        <td className="border-bottom-0-custom">
                                            {index + 1}
                                        </td>
                                        <td className="d-flex align-items-center border-bottom-0-custom">
                                            <div className="img" style={{ backgroundImage: "url('https://res.cloudinary.com/sttruyen/image/upload/v1694421667/ksjctjx7rrwocptprfdx.jpg')", marginRight: "10px" }}></div>
                                            <div className="pl-3 email">
                                                <span>
                                                    <Link to='/'>
                                                        {item?.name}
                                                    </Link>
                                                </span>
                                                <span>Added:{moment(item?.createdAt).fromNow()}</span>
                                            </div>
                                        </td>
                                        <td className="border-bottom-0-custom">
                                            <div className="img" style={{ backgroundImage: "url('https://res.cloudinary.com/sttruyen/image/upload/v1694421667/ksjctjx7rrwocptprfdx.jpg')", marginLeft: "10px" }}></div>
                                            <div className="pl-3 email">
                                                <span>
                                                    <Link to='/minhquang/profile'>
                                                        Minh Quang
                                                    </Link>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="status border-bottom-0-custom"><span className="active">Active</span></td>
                                        <td className="border-bottom-0-custom">
                                            <button style={{ marginLeft: "5px", height: "30px", fontSize: "12px" }} type="button" className="btn btn-danger">
                                                Khóa
                                            </button>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{ marginTop: "30px" }} className='col-12 d-flex justify-content-center'>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li style={{ cursor: "pointer" }} className="page-item">
                            <div className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </div>
                        </li>
                        <li style={{ cursor: "pointer" }} className="page-item"><div className="page-link active" href="#">1</div></li>
                        <li style={{ cursor: "pointer" }} className="page-item"><div className="page-link" href="#">2</div></li>
                        <li style={{ cursor: "pointer" }} className="page-item"><div className="page-link" href="#">3</div></li>
                        <li style={{ cursor: "pointer" }} className="page-item">
                            <div className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Recipes