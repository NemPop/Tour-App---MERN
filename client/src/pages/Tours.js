import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadMoreTour } from "../redux/features/tourSlice";
import { MDBBtn } from "mdb-react-ui-kit";
import Spinner from "../components/Spinner";
import CommonTour from "../components/CommonTour";
const Tours = () => {
  const [skip, setSkip] = useState(0);
  const dispatch = useDispatch();

  const limit = 5;
  const { loadedTours, totalTours, loading } = useSelector((state) => ({
    ...state.tour,
  }));

  useEffect(() => {
    dispatch(loadMoreTour(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    const skipTo = skip + limit;
    dispatch(loadMoreTour(skipTo));
    setSkip(skipTo);
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "850px",
        alignContent: "center",
      }}
    >
      <h3 className="text-center">All Tours </h3>
      <hr style={{ maxWidth: "570px" }} />
      {loadedTours &&
        loadedTours.map((item) => <CommonTour key={item._id} {...item} />)}
      {totalTours === loadedTours.length ? (
        <h5 className="mt-2">No More Tour to Display</h5>
      ) : (
        <MDBBtn onClick={handleLoadMore} className="mt-2">
          Load MOre
        </MDBBtn>
      )}
    </div>
  );
};

export default Tours;
