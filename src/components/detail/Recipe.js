import React, { useEffect, useState } from 'react'
import './style.scss'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const Recipe = () => {
    const { slug } = useParams();
    const [recipe, setRecipe] = useState({});
    const [user, setUser] = useState({});
    const natigate = useNavigate();
    useEffect(() => {
        const loadUser = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(loadUser));
        }
        axios.get(`/recipe/${slug}`)
            .then(res => {
                let tags = {};
                res.data?.recipe?.tags.forEach(item => {
                    tags = {
                        ...tags,
                        [item.k]: item.v
                    }
                })
                let ownerTag = {};
                res.data?.recipe?.owner?.tags?.forEach(item => {
                    ownerTag = {
                        ...ownerTag,
                        [item.k]: item.v
                    }
                })
                setRecipe({
                    ...res.data?.recipe,
                    tags: tags,
                    owner: {
                        ...res.data?.recipe?.owner,
                        tags: ownerTag
                    }
                });
            })
            .catch(err => {
                console.log(err)
            })
    }, [slug]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    const [comment, setComment] = useState('');
    const [defaultStar, setDefaultStar] = useState(5);
    const [rating, setRating] = useState(0);
    const [showIcons, setShowICons] = useState(false);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handlePostComment = () => {
        // You can implement the logic to post the comment here
        console.log('Comment posted:', comment);
    };





    const handleRatingChange = (value) => {
        setRating(value);
    };

    const renderStars = () => {
        const starIcons = [];
        for (let i = 1; i <= 5; i++) {
            const filled = i <= defaultStar;
            starIcons.push(
                <i
                    style={{ margin: "0 3px", color: filled && "#CF3700" }}
                    key={i}
                    className={`fa-solid fa-star`}
                ></i>
            );
        }
        return starIcons;
    };

    return (
        <div className='recipe_bg'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='recipe-img'>
                            <img src={recipe?.tags?.image || "https://res.cloudinary.com/sttruyen/image/upload/v1694421665/pjcicfq1kncbstai4wbc.jpg"} />
                            <div className='recipe-introduction'>
                                <p>{recipe?.introduction}</p>
                            </div>
                            <div className='recipe-name'>
                                <p style={{ marginBottom: "8px", textAlign: "center" }}>{recipe?.name}</p>
                                <div className="rating d-flex justify-content-center w-100 flex-row-reverse">
                                    {renderStars()}
                                </div>
                            </div>
                            <div className='recipe-owner'>
                                <div className='recipe-owner-image'>
                                    <img src={recipe?.owner?.tags?.image ? recipe?.owner?.tags?.image : "https://res.cloudinary.com/sttruyen/image/upload/v1694421664/twfa0a0rxzx2lwtkeryt.jpg"} />
                                    <div className='recipe-owner-qr-img'>
                                        <img src={recipe?.owner?.tags?.qr || "https://res.cloudinary.com/sttruyen/image/upload/v1695020641/another/sotraosven0w6fdm4mr9.png"} />
                                    </div>
                                    <div className='recipe-owner-attackment'>
                                        <i className="fa-solid fa-paperclip"></i>
                                    </div>
                                </div>
                                <div className='recipe-owner-name'>
                                    <p>{recipe?.owner?.name}</p>
                                </div>
                                {user?._id == recipe?.owner?._id ?
                                    <div className='recipe-owner-btn'>
                                        <button onClick={() => {
                                            natigate(`/${user?._id}/profile`);
                                        }} className='btn btn-primary'>Profile</button>
                                    </div>
                                    :
                                    <div className='recipe-owner-btn'>
                                        <button onClick={() => {
                                            natigate(`/${user?._id}/profile`);
                                        }} className='btn btn-primary'>Theo dõi</button>
                                    </div>
                                    }

                            </div>
                        </div>
                    </div>
                </div>
                <div className='recipe_content'>
                    <div className='col-10'>
                        {recipe?.recipes}
                    </div>
                </div>
                <div className='recipe-comments-rate'>
                    <section>
                        <div style={{ marginTop: "50px" }} className="container text-dark">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-10 col-lg-10 col-xl-10">
                                    <div className="card">
                                        <div className="card-body p-4">
                                            <div className="d-flex flex-start w-100">
                                                <img
                                                    className="rounded-circle shadow-1-strong me-3"
                                                    src={user?.tags?.image || "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"}
                                                    alt="avatar"
                                                    width="65"
                                                    height="65"
                                                />
                                                <div className="w-100">
                                                    <h5>{user?.name}</h5>
                                                    <div className="rating">
                                                        <input
                                                            type="radio"
                                                            id="star1"
                                                            name="rating"
                                                            value="1"
                                                            checked={rating === 1}
                                                            onChange={() => handleRatingChange(1)}
                                                        />
                                                        <label htmlFor="star1">
                                                            <i className="fa-solid fa-star"></i>
                                                        </label>

                                                        <input
                                                            type="radio"
                                                            id="star2"
                                                            name="rating"
                                                            value="2"
                                                            checked={rating === 2}
                                                            onChange={() => handleRatingChange(2)}
                                                        />
                                                        <label htmlFor="star2">
                                                            <i className="fa-solid fa-star"></i>
                                                        </label>

                                                        <input
                                                            type="radio"
                                                            id="star3"
                                                            name="rating"
                                                            value="3"
                                                            checked={rating === 3}
                                                            onChange={() => handleRatingChange(3)}
                                                        />
                                                        <label htmlFor="star3">
                                                            <i className="fa-solid fa-star"></i>
                                                        </label>

                                                        <input
                                                            type="radio"
                                                            id="star4"
                                                            name="rating"
                                                            value="4"
                                                            checked={rating === 4}
                                                            onChange={() => handleRatingChange(4)}
                                                        />
                                                        <label htmlFor="star4">
                                                            <i className="fa-solid fa-star"></i>
                                                        </label>

                                                        <input
                                                            type="radio"
                                                            id="star5"
                                                            name="rating"
                                                            value="5"
                                                            checked={rating === 5}
                                                            onChange={() => handleRatingChange(5)}
                                                        />
                                                        <label htmlFor="star5">
                                                            <i className="fa-solid fa-star"></i>
                                                        </label>
                                                    </div>
                                                    <div className="form-outline">
                                                        <textarea placeholder='What is your view?' className="form-control" id="textAreaExample" rows="4"></textarea>

                                                    </div>
                                                    <div className="d-flex justify-content-between mt-3">
                                                        <div className='icons_container'>
                                                            {/* <div onClick={() => {
                                                                setShowICons(!showIcons);
                                                            }}>
                                                            🙂
                                                            </div>
                                                            {showIcons && <div className='icons_picker'>
                                                            <Picker
                                                            data={data}
                                                            onEmojiSelect={(e) => {
                                                                // const content = contentRef.current;
                                                                // if (!content) {
                                                                //     return;
                                                                // }
                                                                // content.innerHTML = comment + e?.native;
                                                                // setComment(content.innerHTML);
                                                            }}
                                                        />
                                                            </div>} */}
                                                        </div>
                                                        <button type="button" className="btn btn-primary">
                                                            Gửi <i className="fas fa-long-arrow-alt-right ms-1"></i>
                                                        </button>
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
                <div className='recipe-comments'>
                    <section>
                        <div className="container my-5">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-12 col-lg-10 col-xl-10">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-start align-items-center">
                                                <img
                                                    className="rounded-circle shadow-1-strong me-3"
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                                                    alt="avatar"
                                                    width="60"
                                                    height="60"
                                                />
                                                <div>
                                                    <h6 className="fw-bold text-primary mb-1">Lily Coleman</h6>
                                                    <p className="text-muted small mb-0">Shared publicly - Jan 2020</p>
                                                </div>
                                            </div>

                                            <p className="mt-3 mb-4 pb-2">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.
                                            </p>

                                            <div className="small d-flex justify-content-start">
                                                <div style={{ cursor: "pointer" }} className="d-flex align-items-center me-3">
                                                    <i className="far fa-thumbs-up me-2"></i>
                                                    <p className="mb-0">Like</p>
                                                </div>
                                                <div style={{ cursor: "pointer" }} className="d-flex align-items-center me-3">
                                                    <i className="far fa-comment-dots me-2"></i>
                                                    <p className="mb-0">Comment</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer py-3 border-0" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div style={{ marginLeft: "40px" }} className="card-body">
                                                <div className="d-flex flex-start align-items-center">
                                                    <img
                                                        className="rounded-circle shadow-1-strong me-3"
                                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                                                        alt="avatar"
                                                        width="60"
                                                        height="60"
                                                    />
                                                    <div>
                                                        <h6 className="fw-bold text-primary mb-1">Lily Coleman</h6>
                                                        <p className="text-muted small mb-0">Shared publicly - Jan 2020</p>
                                                    </div>
                                                </div>

                                                <p className="mt-3 mb-4 pb-2">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.
                                                </p>

                                                <div className="small d-flex justify-content-start">
                                                    <div style={{ cursor: "pointer" }} className="d-flex align-items-center me-3">
                                                        <i className="far fa-thumbs-up me-2"></i>
                                                        <p className="mb-0">Like</p>
                                                    </div>
                                                    <div style={{ cursor: "pointer" }} className="d-flex align-items-center me-3">
                                                        <i className="far fa-comment-dots me-2"></i>
                                                        <p className="mb-0">Comment</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-start align-items-center">
                                                <img
                                                    className="rounded-circle shadow-1-strong me-3"
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                                                    alt="avatar"
                                                    width="60"
                                                    height="60"
                                                />
                                                <div>
                                                    <h6 className="fw-bold text-primary mb-1">Lily Coleman</h6>
                                                    <p className="text-muted small mb-0">Shared publicly - Jan 2020</p>
                                                </div>
                                            </div>

                                            <p className="mt-3 mb-4 pb-2">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.
                                            </p>

                                            <div className="small d-flex justify-content-start">
                                                <div style={{ cursor: "pointer" }} className="d-flex align-items-center me-3">
                                                    <i className="far fa-thumbs-up me-2"></i>
                                                    <p className="mb-0">Like</p>
                                                </div>
                                                <div style={{ cursor: "pointer" }} className="d-flex align-items-center me-3">
                                                    <i className="far fa-comment-dots me-2"></i>
                                                    <p className="mb-0">Comment</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-footer py-3 border-0" style={{ backgroundColor: "#f8f9fa" }}>
                                            <div class="d-flex flex-start w-100">
                                                <img class="rounded-circle shadow-1-strong me-3"
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="40"
                                                    height="40" />
                                                <div class="form-outline w-100">
                                                    <textarea placeholder='Bình luận' class="form-control" id="textAreaExample" rows="4"
                                                        style={{ backgroundColor: "#fff" }}></textarea>
                                                </div>
                                            </div>
                                            <div class="float-end mt-2 pt-1">
                                                <button type="button" class="btn btn-primary btn-sm">Post comment</button>
                                                <button style={{ marginLeft: "10px" }} type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
                                            </div>
                                        </div>
                                        <div className="card-footer py-3 border-0" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div style={{ marginLeft: "40px" }} className="card-body">
                                                <div className="d-flex flex-start align-items-center">
                                                    <img
                                                        className="rounded-circle shadow-1-strong me-3"
                                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                                                        alt="avatar"
                                                        width="60"
                                                        height="60"
                                                    />
                                                    <div>
                                                        <h6 className="fw-bold text-primary mb-1">Lily Coleman</h6>
                                                        <p className="text-muted small mb-0">Shared publicly - Jan 2020</p>
                                                    </div>
                                                </div>

                                                <p className="mt-3 mb-4 pb-2">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.
                                                </p>

                                                <div className="small d-flex justify-content-start">
                                                    <div style={{ cursor: "pointer" }} className="d-flex align-items-center me-3">
                                                        <i className="far fa-thumbs-up me-2"></i>
                                                        <p className="mb-0">Like</p>
                                                    </div>
                                                    <div style={{ cursor: "pointer" }} className="d-flex align-items-center me-3">
                                                        <i className="far fa-comment-dots me-2"></i>
                                                        <p className="mb-0">Comment</p>
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
            </div>
        </div>
    )
}

export default Recipe