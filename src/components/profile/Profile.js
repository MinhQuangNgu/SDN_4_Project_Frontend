import React, { useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import OwnRecipeCard from '../card/OwnRecipeCard';
import RecipeCard from '../card/RecipeCard';
const Profile = () => {
    const [type, setType] = useState("");
    const [edit, setEdit] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='profile'>
            <section style={{ backgroundColor: '#E1E4EB' }}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
                                    <h5 className="my-3">John Smith</h5>
                                    <p className="text-muted mb-1">Full Stack Developer</p>
                                    <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                    {!edit ? <div className="d-flex justify-content-center mb-2">
                                        <button onClick={() => {
                                            setEdit(true);
                                        }} style={{ backgroundColor: "#93E2BB", border: "none" }} type="button" className="btn btn-primary">Sửa thông tin</button>
                                        <button onClick={() => {
                                            navigate('/recipe/create');
                                        }} style={{ border: "none", marginLeft: "10px" }} type="button" className="btn btn-secondary">Thêm công thức</button>
                                    </div> :
                                        <div className="d-flex justify-content-center mb-2">
                                            <button onClick={() => {
                                                setEdit(false);
                                            }} style={{ backgroundColor: "#93E2BB", border: "none", marginRight: "10px" }} type="button" className="btn btn-primary">Xác nhận</button>
                                            <button onClick={() => {
                                                setEdit(false);
                                            }} type="button" className="btn btn-secondary">Hủy</button>
                                        </div>}
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush rounded-3">
                                        <li className="list-group-item p-3">
                                            <h5 className="mb-2">About Me</h5>
                                            <p className="mb-0">I am passionate about life and always seeking new adventures. Whether it's exploring new places, meeting new people, or learning new skills, I believe in making the most out of every moment.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Full Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            {!edit ?
                                                <p className="text-muted mb-0">Johnatan Smith</p>
                                                :
                                                <input className='text-muted mb-0 custom_input_profile' value="Johnatan Smith" type='text' />
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">example@example.com</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Phone</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">(097) 234-5678</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Mobile</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">(098) 765-4321</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Address</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: "10px" }} className='card mb-4'>
                                <div className='btn_custom_profile'>
                                    <div>
                                        <div onClick={() => {
                                            setType("");
                                        }} className={type === '' && 'active'}>
                                            <i>Công thức của mình</i>
                                        </div>
                                        <div className={type === 'love' && 'active'} onClick={() => {
                                            setType("love");
                                        }}>
                                            <i>Công thức yêu thích</i>
                                        </div>
                                        <div className={type === 'follow' && 'active'} onClick={() => {
                                            setType("follow");
                                        }}>
                                            <i>Đang theo dõi</i>
                                        </div>
                                    </div>
                                </div>
                                {type === '' ? <div className='row'>
                                    <div style={{ marginBottom: "20px" }} class="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                        <OwnRecipeCard />
                                    </div>
                                    <div style={{ marginBottom: "20px" }} class="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                        <OwnRecipeCard />
                                    </div>
                                    <div style={{ marginBottom: "20px" }} class="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                        <OwnRecipeCard />
                                    </div>
                                    <div style={{ marginBottom: "20px" }} class="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                        <OwnRecipeCard />
                                    </div>
                                </div> :
                                    type === "love" ? <div className='row'>
                                        <div style={{ marginBottom: "20px" }} class="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <RecipeCard imageHeight={200} />
                                        </div>
                                        <div style={{ marginBottom: "20px" }} class="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <RecipeCard imageHeight={200} />
                                        </div>
                                        <div style={{ marginBottom: "20px" }} class="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <RecipeCard imageHeight={200} />
                                        </div>
                                    </div> : <div className='row'>
                                        <div style={{ marginBottom: "20px" }} class="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <section style={{ backgroundColor: "#9de2ff", height: "250px", borderRadius: "30px" }}>
                                                <div class="container custom_py-5 h-100">
                                                    <div class="row d-flex align-items-center">
                                                        <div class="col col-md-9 col-lg-7 col-xl-5">
                                                            <div class="card" style={{ borderRadius: "15px" }}>
                                                                <div style={{ height: "150px" }} class="card-body p-4">
                                                                    <div class="d-flex text-black">
                                                                        <div class="flex-shrink-0">
                                                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                                                                alt="Generic placeholder image" class="img-fluid"
                                                                                style={{ width: "100px", height: "80px", objectFit: "cover" }} />
                                                                        </div>
                                                                        <div class="flex-grow-1 ms-3">
                                                                            <h5 class="mb-1">Danny McLoan</h5>
                                                                            <p class="mb-2 pb-1" style={{ color: "#2b2a2a" }}>Senior Journalist</p>
                                                                            <div class="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                                                style={{ backgroundColor: "#efefef" }}>
                                                                                <div>
                                                                                    <p class="small text-muted mb-1">Articles</p>
                                                                                    <p class="mb-0">41</p>
                                                                                </div>
                                                                                <div class="px-3">
                                                                                    <p class="small text-muted mb-1">Followers</p>
                                                                                    <p class="mb-0">976</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="d-flex pt-1">
                                                                                <button type="button" class="btn btn-primary flex-grow-1">Theo dõi</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div style={{ marginBottom: "20px" }} class="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <section style={{ backgroundColor: "#9de2ff", height: "250px", borderRadius: "30px" }}>
                                                <div class="container custom_py-5 h-100">
                                                    <div class="row d-flex align-items-center">
                                                        <div class="col col-md-9 col-lg-7 col-xl-5">
                                                            <div class="card" style={{ borderRadius: "15px" }}>
                                                                <div style={{ height: "150px" }} class="card-body p-4">
                                                                    <div class="d-flex text-black">
                                                                        <div class="flex-shrink-0">
                                                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                                                                alt="Generic placeholder image" class="img-fluid"
                                                                                style={{ width: "100px", height: "80px", objectFit: "cover" }} />
                                                                        </div>
                                                                        <div class="flex-grow-1 ms-3">
                                                                            <h5 class="mb-1">Danny McLoan</h5>
                                                                            <p class="mb-2 pb-1" style={{ color: "#2b2a2a" }}>Senior Journalist</p>
                                                                            <div class="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                                                style={{ backgroundColor: "#efefef" }}>
                                                                                <div>
                                                                                    <p class="small text-muted mb-1">Articles</p>
                                                                                    <p class="mb-0">41</p>
                                                                                </div>
                                                                                <div class="px-3">
                                                                                    <p class="small text-muted mb-1">Followers</p>
                                                                                    <p class="mb-0">976</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="d-flex pt-1">
                                                                                <button type="button" class="btn btn-primary flex-grow-1">Theo dõi</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div style={{ marginBottom: "20px" }} class="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <section style={{ backgroundColor: "#9de2ff", height: "250px", borderRadius: "30px" }}>
                                                <div class="container custom_py-5 h-100">
                                                    <div class="row d-flex align-items-center">
                                                        <div class="col col-md-9 col-lg-7 col-xl-5">
                                                            <div class="card" style={{ borderRadius: "15px" }}>
                                                                <div style={{ height: "150px" }} class="card-body p-4">
                                                                    <div class="d-flex text-black">
                                                                        <div class="flex-shrink-0">
                                                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                                                                alt="Generic placeholder image" class="img-fluid"
                                                                                style={{ width: "100px", height: "80px", objectFit: "cover" }} />
                                                                        </div>
                                                                        <div class="flex-grow-1 ms-3">
                                                                            <h5 class="mb-1">Danny McLoan</h5>
                                                                            <p class="mb-2 pb-1" style={{ color: "#2b2a2a" }}>Senior Journalist</p>
                                                                            <div class="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                                                style={{ backgroundColor: "#efefef" }}>
                                                                                <div>
                                                                                    <p class="small text-muted mb-1">Articles</p>
                                                                                    <p class="mb-0">41</p>
                                                                                </div>
                                                                                <div class="px-3">
                                                                                    <p class="small text-muted mb-1">Followers</p>
                                                                                    <p class="mb-0">976</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="d-flex pt-1">
                                                                                <button type="button" class="btn btn-primary flex-grow-1">Theo dõi</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div style={{ marginBottom: "20px" }} class="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <section style={{ backgroundColor: "#9de2ff", height: "250px", borderRadius: "30px" }}>
                                                <div class="container custom_py-5 h-100">
                                                    <div class="row d-flex align-items-center">
                                                        <div class="col col-md-9 col-lg-7 col-xl-5">
                                                            <div class="card" style={{ borderRadius: "15px" }}>
                                                                <div style={{ height: "150px" }} class="card-body p-4">
                                                                    <div class="d-flex text-black">
                                                                        <div class="flex-shrink-0">
                                                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                                                                alt="Generic placeholder image" class="img-fluid"
                                                                                style={{ width: "100px", height: "80px", objectFit: "cover" }} />
                                                                        </div>
                                                                        <div class="flex-grow-1 ms-3">
                                                                            <h5 class="mb-1">Danny McLoan</h5>
                                                                            <p class="mb-2 pb-1" style={{ color: "#2b2a2a" }}>Senior Journalist</p>
                                                                            <div class="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                                                style={{ backgroundColor: "#efefef" }}>
                                                                                <div>
                                                                                    <p class="small text-muted mb-1">Articles</p>
                                                                                    <p class="mb-0">41</p>
                                                                                </div>
                                                                                <div class="px-3">
                                                                                    <p class="small text-muted mb-1">Followers</p>
                                                                                    <p class="mb-0">976</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="d-flex pt-1">
                                                                                <button type="button" class="btn btn-primary flex-grow-1">Theo dõi</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile