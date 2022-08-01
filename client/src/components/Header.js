import React, { useState, useEffect } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBBadge,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchTours } from "../redux/features/tourSlice";
import { useNavigate } from "react-router";
import decode from "jwt-decode";
import { getUserProfile } from "../redux/features/profileSlice";

const Header = ({ socket }) => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  const token = user?.token;
  const userId = user?.result?._id || user?.result?.googleId;

  const { userDetail } = useSelector((state) => ({
    ...state.profile,
  }));

  useEffect(() => {
    if (socket) {
      socket.on("getNotification", (data) => {
        console.log(data);
        setNotifications((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  useEffect(() => {
    userId && dispatch(getUserProfile(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const handleBell = () => {
    if (notifications.length) {
      setOpen(!open);
    }
  };

  const displayNotification = ({ senderName }) => {
    return (
      <span className="notification">{`${senderName} liked your tour`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
      <MDBContainer>
        <div
          style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
          onClick={() => navigate(`/`)}
        >
          Touropedia
        </div>

        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#606080", display: "flex" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            <MDBNavbarItem>
              <p className="header-text" onClick={() => navigate("/")}>
                Home
              </p>
            </MDBNavbarItem>
            {user?.result?._id && (
              <>
                {" "}
                <MDBNavbarItem>
                  <p
                    className="header-text"
                    onClick={() => navigate("/addTour")}
                  >
                    Add tour
                  </p>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <p
                    className="header-text"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </p>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id ? (
              <>
                <MDBNavbarItem>
                  <p className="header-text" onClick={handleLogout}>
                    Logout
                  </p>
                </MDBNavbarItem>
                {/* <MDBNavbarItem>
                  <MDBNavbarLink href={`/profile/${user?.result?._id}`}>
                    <p className="header-text">Profile</p>
                  </MDBNavbarLink>
                </MDBNavbarItem> */}
              </>
            ) : (
              <MDBNavbarItem>
                <p className="header-text" onClick={() => navigate("/login")}>
                  Login
                </p>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Tour"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <div
              style={{
                marginTop: "5px",
                marginLeft: "5px",
              }}
            >
              <MDBIcon fas icon="search" />
            </div>
          </form>
          {userId && (
            <>
              <div
                style={{
                  cursor: "pointer",
                  marginLeft: "10px",
                  display: `${show && "inline-block"}`,
                }}
              >
                <img
                  src={
                    userDetail?.imageFile
                      ? userDetail.imageFile
                      : "https://image.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
                  }
                  alt={userDetail?.name}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginTop: "18px",
                  }}
                  onClick={() => navigate(`/profile/${userId}`)}
                />
                <p
                  className="header-text"
                  style={{
                    float: "right",
                    marginTop: "15px",
                    marginLeft: "5px",
                  }}
                  onClick={() => navigate(`/profile/${userId}`)}
                >
                  {userDetail?.name}
                </p>
              </div>
            </>
          )}
          {user?.result?._id && (
            <div className="mx-3" onClick={handleBell}>
              <MDBIcon fas icon="bell" style={{ cursor: "pointer" }} />
              <MDBBadge color="danger" notification pill>
                {notifications.length > 0 && (
                  <div className="counter">{notifications.length}</div>
                )}
              </MDBBadge>
            </div>
          )}
          {open && (
            <div className="notifications">
              {notifications.map((n) => displayNotification(n))}
              <div className="align-item-center">
                <MDBBtn
                  size="sm"
                  style={{ width: "150px", backgroundColor: "#ec4a89" }}
                  onClick={handleRead}
                >
                  Mark as Read
                </MDBBtn>
              </div>
            </div>
          )}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
