import React from "react";

const DisplayHtml = ({ innerHtml }) => {
  return <div dangerouslySetInnerHTML={{ __html: innerHtml }} />;
};

export default DisplayHtml;
