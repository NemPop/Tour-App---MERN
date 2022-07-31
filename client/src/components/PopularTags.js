import React from "react";
import { MDBCardTitle } from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";

const PopularTags = ({ totalTags }) => {
  return (
    <>
      <MDBCardTitle className="title text-start">Popular Tags</MDBCardTitle>
      <div className="tag-label text-start">
        <ul>
          {totalTags.map((tag) => (
            <li outline="true" color="info" className="m-1 tag" key={tag}>
              <NavLink to={`tours/tag/${tag}`} style={{ color: "black" }}>
                {tag}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PopularTags;
