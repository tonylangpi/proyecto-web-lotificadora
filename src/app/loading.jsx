import React from "react";

const loading = () => {
  return (
    <div className="text-center">
      <div className="spinner-grow text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default loading;
