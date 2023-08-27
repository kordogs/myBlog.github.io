import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FeaturedPost({
  title,
  description,
  cover,
  time,
  genre,
  author,
  _id,
}) {
  const dateObject = new Date(time);
  const formattedTime = dateObject.toLocaleString();
  const [truncated, setTruncated] = useState(true);
  const maxWords = 20;

  useEffect(() => {
    const words = description.split(" ");
    if (words.length <= maxWords) {
      setTruncated(false);
    }
  }, [description]);

  const toggleTruncate = () => {
    setTruncated(!truncated);
  };

  const getLimitedDescription = () => {
    const words = description.split(" ");
    if (truncated) {
      return words.slice(0, maxWords).join(" ") + " ...";
    } else {
      return description;
    }
  };

  return (
    <>
      <div className="col-md-6">
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-2 shadow-sm h-md-250 position-relative">
          <div className="col p-4 d-flex flex-column position-static">
            <strong className="d-inline-block mb-2 text-primary-emphasis">
              {author?.username}
            </strong>
            <h4 className="mb-0">{title}</h4>
            <div className="mb-1 text-body-secondary">{formattedTime}</div>
            <p className="card-text mb-auto" onClick={toggleTruncate}>
              {getLimitedDescription()}
            </p>
            <Link
              to={`/post/${_id}`}
              className="icon-link gap-1 icon-link-hover stretched-link"
            >
              Continue reading
              <svg className="bi">
                <use xlinkHref="#chevron-right" />
              </svg>
            </Link>
          </div>
          <div className="col-auto d-none d-lg-block">
            <img
              src={"http://localhost:4000/uploads/" + cover} // Assuming `cover` contains the URL or path of the image
              alt="Thumbnail"
              width={200}
              height={250}
              className="bd-placeholder-img"
              role="img"
              aria-label="Placeholder: Thumbnail"
              preserveAspectRatio="xMidYMid slice"
            />
          </div>
        </div>
      </div>
    </>
  );
}
