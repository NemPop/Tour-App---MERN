import React from "react";
import {
  MDBBadge,
  MDBCardTitle,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Categories = ({ categoryCount }) => {
  return (
    <>
      <MDBCardTitle className="title text-start mt-2">Categories</MDBCardTitle>
      <MDBListGroup style={{ width: "22rem" }}>
        {categoryCount.map((item) => (
          <Link to={`/tours/category/${item.category}`}>
            <MDBListGroupItem className="d-flex justify-content-between align-items-center">
              {item.category}
              <MDBBadge pill>{item.count}</MDBBadge>
            </MDBListGroupItem>
          </Link>
        ))}
      </MDBListGroup>
    </>
  );
};

export default Categories;
