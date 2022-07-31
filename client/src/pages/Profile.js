import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import {
  getUserProfile,
  updateUserProfile,
} from "../redux/features/profileSlice";
import { setProfile } from "../redux/features/authSlice";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [info, setInfo] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const { userDetail, loading } = useSelector((state) => ({
    ...state.profile,
  }));

  useEffect(() => {
    if (id) {
      dispatch(getUserProfile(id));
    }
  }, [id]);

  const handleCancel = () => {
    setEditMode(false);
    setInfo({});
  };
  const handleEdit = () => {
    setEditMode(true);
    setInfo({ ...userDetail });
  };

  const handleSave = () => {
    if (!info.name || !info.occupation || !info.mobile || !info.address) {
      return toast.error("Please don't left field any empty!!!");
    }

    dispatch(updateUserProfile({ id, info }));
    dispatch(setProfile(info));
    setEditMode(false);
    dispatch(getUserProfile(id));
    toast.success("Profile Updated Successfully");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
        marginTop: "20px",
      }}
    >
      <MDBRow
        className="mt-5 row-cols-1 row-cols-md-3 g-4"
        style={{ marginTop: "50px" }}
      >
        <MDBCol>
          <MDBCard style={{ width: "18rem" }} className="d-sm-flex">
            <img
              src={
                userDetail?.imageFile
                  ? userDetail.imageFile
                  : "https://image.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
              }
              alt={userDetail?.name}
              style={{
                borderRadius: "50%",
                height: "250px",
                width: "250px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            />
            <h5 className="mt-4">{userDetail?.name}</h5>
            <p className="mb-1 info">{userDetail?.occupation}</p>
            <p className="info">{userDetail?.address}</p>
          </MDBCard>
        </MDBCol>
        <MDBCol>
          <MDBCard style={{ width: "38rem" }} className="mb-3">
            {editMode && (
              <div className="align-item-center">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setInfo({ ...info, imageFile: base64 })
                  }
                ></FileBase>
              </div>
            )}
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="3">
                  <h6 className="mb-0 text-start mt-1">Full Name</h6>
                </MDBCol>
                <MDBCol sm="9">
                  {editMode ? (
                    <MDBInput
                      value={info?.name || ""}
                      name="name"
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-start lead inf">{userDetail?.name}</p>
                  )}
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <h6 className="mb-0 text-start mt-1">Email</h6>
                </MDBCol>
                <MDBCol sm="9">
                  <p className="text-start lead inf">{userDetail?.email}</p>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <h6 className="mb-0 text-start mt-1">Occupation</h6>
                </MDBCol>
                <MDBCol sm="9">
                  {editMode ? (
                    <MDBInput
                      value={info?.occupation || ""}
                      name="occupation"
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-start lead inf">
                      {userDetail?.occupation
                        ? userDetail.occupation
                        : "Please Update Occupation"}
                    </p>
                  )}
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <h6 className="mb-0 text-start mt-1">Mobile</h6>
                </MDBCol>
                <MDBCol sm="9">
                  {editMode ? (
                    <MDBInput
                      value={info?.mobile || ""}
                      name="mobile"
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-start lead inf">
                      {userDetail?.mobile
                        ? userDetail?.mobile
                        : "Please Update mobile"}
                    </p>
                  )}
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <h6 className="mb-0 text-start mt-1">Address</h6>
                </MDBCol>
                <MDBCol sm="9">
                  {editMode ? (
                    <MDBInput
                      value={info?.address || ""}
                      name="address"
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-start lead inf">
                      {userDetail?.address
                        ? userDetail.address
                        : "Please Update address"}
                    </p>
                  )}
                </MDBCol>
              </MDBRow>
              <hr />
              {!editMode ? (
                <MDBBtn onClick={handleEdit}>Edit</MDBBtn>
              ) : (
                <>
                  <MDBBtn color="success" className="mx-2" onClick={handleSave}>
                    Save
                  </MDBBtn>
                  <MDBBtn color="light" onClick={handleCancel}>
                    Cancel
                  </MDBBtn>
                </>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Profile;
