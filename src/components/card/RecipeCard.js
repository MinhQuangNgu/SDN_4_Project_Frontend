import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ name, image, owner, recipe }) => {
  const recipeId = recipe?._id;

  return (
    <div style={{ margin: "5px 0" }} className="product-item">
      <div className="position-relative bg-light overflow-hidden">
        <Link to={`/recipe/${recipeId}`}>
          <img
            style={{ minHeight: "350px", objectFit: "cover", maxHeight: "350px" }}
            className="img-fluid w-100"
            src={image}
            alt={name}
          />
        </Link>
      </div>
      <div className="text-center p-2">
        <Link
          style={{ textDecoration: "none" }}
          className="d-block h5 mb-1"
          to="/recipe/id"
        >
          {name}
        </Link>
        <span
          style={{ fontSize: "15px", fontStyle: "italic" }}
          className="text-secondary me-2 d-block"
        >
          by {owner}
        </span>
        <div className="d-flex border-top">
          <small className="w-50 text-center border-end py-2">
            <Link
              style={{ textDecoration: "none" }}
              className="text-body"
              to={`/recipe/${recipeId}`}
            >
              <i className="fa fa-eye text-primary me-2"></i>View detail
            </Link>
          </small>
          <small className="w-50 text-center py-2">
            <div
              style={{ textDecoration: "none", cursor: "pointer" }}
              className="text-body"
            >
              <i className="fa fa-shopping-bag text-primary me-2"></i>Add to cart
            </div>
          </small>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
