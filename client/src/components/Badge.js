import React from "react";
import { MDBBadge } from "mdb-react-ui-kit";

const Badge = ({ children }) => {
  const colorKey = {
    Sea: "primary",
    Beach: "success",
    Temple: "danger",
    Hill: "warning",
    Historic: "info",
  };
  return (
    <h5 style={{ margin: "5px" }}>
      <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
    </h5>
  );
};

export default Badge;
