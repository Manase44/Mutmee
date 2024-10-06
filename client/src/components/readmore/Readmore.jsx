import { useState } from "react";

const Readmore = ({ text = "", maximum = 10, isButton }) => {
  const [readMore, setReadMore] = useState(false);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <>
      {text && (
        <div>
          <p>
            {readMore || text.length <= maximum
              ? text
              : `${text.substring(0, maximum)}...`}
          </p>
          {isButton === true && text.length > maximum && (
            <button onClick={toggleReadMore}>
              {readMore ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Readmore;
