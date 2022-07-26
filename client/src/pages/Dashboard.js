import React, { useEffect, userEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getToursByUser } from "../redux/features/tourSlice";

const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading } = useSelector((state) => ({ ...state.tour }));
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  const excerpt = (str) => {
    if (str?.length > 40) {
      str = str.substring(0, 40) + "...";
    }
    return str;
  };
  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
  }, [userId]);
  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      <h4 className="text-center">Dashboard:{user?.result?.name}</h4>
      <hr style={{ maxWidth: "570px" }} />
      {userTours &&
        userTours.map((item) => (
          <MDBCardGroup>
            <MDBCard
              style={{ maxWidth: "600px" }}
              key={item._id}
              className="mt-2"
            >
              <MDBRow className="g-0">
                <MDBCol className="md-4">
                  <MDBCardImage
                    className="rounded"
                    src={item.imageFile}
                    alt={item.tile}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {item.tile}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">
                        {excerpt(item.description)}
                      </small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd5b49" }}
                          size="lg"
                        />
                      </MDBBtn>
                      <Link to={`/editTour/${item.id}`}>
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#55acee", marginLeft: "10px" }}
                          size="lg"
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default Dashboard;
