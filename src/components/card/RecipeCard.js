import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ item, image, recipe, name }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const recipeId = recipe?._id;

  const handleAddFavorite = async () => {
    try{
      await axios.post(
        `/user/c_m/${item._id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div style={{ margin: "5px 0" }} className="product-item">
      <div className="position-relative bg-light overflow-hidden">
        <Link to={`/recipe/${recipeId}`}>
          <img
            style={{
              minHeight: "200px",
              objectFit: "cover",
            }}
            className="img-fluid w-100"
            src={image}
            alt={item?.name}
          />
        </Link>
      </div>
      <div className="text-center p-2">
        <Link
          style={{ textDecoration: "none" }}
          className="d-block h5 mb-1"
          to="/recipe/id"
        >
          {item?.name || name}
        </Link>
        <span
          style={{ fontSize: "15px", fontStyle: "italic" }}
          className="text-secondary me-2 d-block"
        >
          by {item?.users?.[0].name}
        </span>

        <span className="text-secondary me-1">
          {item?.favorites_size}
          <i style={{ color: "red" }} className="fa-solid fa-heart"></i>
        </span>
        <div className="d-flex border-top">
          <small className="w-50 text-center border-end py-2">
            <Link
              style={{ textDecoration: "none" }}
              className="text-body"
              to={`/recipe/${item?._id}`}
            >
              <i className="fa fa-eye text-primary me-2"></i>View detail
            </Link>
          </small>
          <small className="w-50 text-center py-2">
            <div
              style={{ textDecoration: "none", cursor: "pointer" }}
              className="text-body"
              onClick={handleAddFavorite}
            >
              <i className="fa fa-heart text-primary me-2"></i>
              {item?.favorites?.find((item) => item === user._id)
                ? "Unfavorite"
                : "Favorite"}
            </div>
          </small>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
