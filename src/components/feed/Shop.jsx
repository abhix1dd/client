import React, { useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../../App";

import { Link } from "react-router-dom";
import "./feed.css";

import Feed from "./Feed";

import pic from "./user.png";

const Shop = ({ datas }) => {
  const [com, setCom] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const likePost = async (id) => {
    try {
      const url = "http://localhost:5000/likepost";
      const head = "12 " + localStorage.getItem("token");
      const res = await axios.put(
        url,
        { postId: id },
        {
          headers: {
            tokn: head,
          },
        }
      );
      window.location.reload();
      console.log(res);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error);
      }
    }
  };

  const unLikePost = async (id) => {
    try {
      const url = "http://localhost:5000/unlikepost";
      const head = "12 " + localStorage.getItem("token");
      const res = await axios.put(
        url,
        { postId: id },
        {
          headers: {
            tokn: head,
          },
        }
      );
      console.log(res.data._id);

      window.location.reload();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setCom(e.target.value);
    
  };
 // console.log(com)
   
  return (
    <div className="feed">
      <div className="feedWrapper">
        <div class="card" style={{ width: "100%" }}>
          <div class="card-banner">
            <h6 class="category-tag technology">
              <img
                className="shareProfileImg"
                style={{ margin: "5px", border: "none" }}
                src={pic}
                alt=""
              />
              <span>
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "20px",
                    margin: "15px",
                  }}
                >
                  {datas.postedBy.firstname}
                </Link>
              </span>
            </h6>
            <img
              class="banner-img img1"
              style={{ border: "none" }}
              src={datas.image}
              alt=""
              height="400px"
              width="90%"
            />
          </div>

          <div
            style={{ marginLeft: "40px", marginTop: "1px", fontSize: "20px" }}
          >
            {datas.likes.includes(user._id) ? (
              <i
                class="fa fa-thumbs-down fa-lg"
                style={{ marginLeft: "px" }}
                onClick={() => {
                  unLikePost(datas._id);
                }}
              ></i>
            ) : (
              <i
                class="fa fa-thumbs-up fa-lg"
                onClick={() => {
                  likePost(datas._id);
                }}
              ></i>
            )}

            <h6 style={{ marginLeft: "", marginTop: "8px" }}>
              {datas.likes.length} likes
            </h6>
          </div>

          <div class="card-body">
            <h4
              class="blog-hashtag"
              style={{ marginLeft: "15px", fontSize: "20px" }}
            >
              {datas.title}
            </h4>

            <p
              class="blog-description"
              style={{ marginLeft: "15px", fontSize: "18px" }}
            >
              {datas.description}
            </p>
               

            <input
              type="text"
              id="comment-box"
              placeholder="Enter comment"
              onChange={handleChange}
              style={{ border: "", borderRadius: "5px" }}
            />
            <button
              id="post"
              onClick={(e) => {
                e.preventDefault();
                console.log();
              }}
              style={{
                border: "none",
                borderRadius: "5px",
                marginTop: "15px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
