import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ContainerForRecent from "../HomeComponents/ContainerForRecent";
import { UserContext } from "../../UserContext";

export default function InsidePost() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/ViewPost/${id}`).then((response) => {
      response.json().then((postInfo) => {
        if (postInfo) {
          setPostInfo(postInfo);
        } else {
          return;
        }
      });
    });
  }, []);

  async function DeletePost() {
    const response = await fetch("http://localhost:4000/DeletePost", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: postInfo._id }),
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  if (!postInfo) {
    return (
      <>
        <div
          className="modal modal-sheet position-static d-block mt-5 p-4 py-md-5"
          tabIndex="-1"
          role="dialog"
          id="modalSheet"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content rounded-4 shadow">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5">Notice!</h1>
              </div>
              <div className="modal-body py-0 text-center m-5">
                <h6>This page does not exist or might have been deleted</h6>
              </div>
              <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                <Link type="button" className="btn btn-lg btn-primary" to={"/"}>
                  Go back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row g-5">
          <div className="col-md-8">
            <div className="container">
              <div className="bd-example-snippet bd-code-snippet">
                <div className="bd-example m-0 border-0 App">
                  <img
                    src={`http://localhost:4000/uploads/${postInfo.cover}`}
                    alt="Responsive image"
                    style={{ height: "250px", width: "100%" }}
                  />
                </div>
              </div>
              <div>
                <div className="bd-example">
                  <nav
                    id="navbar-example2"
                    className="navbar bg-body-tertiary px-3"
                  >
                    <a className="navbar-brand" href="#">
                      <h1>{postInfo.title}</h1>
                      <h4>by: {postInfo.author.username}</h4>
                      <h6>{postInfo.time}</h6>
                    </a>
                    {userInfo?.id === postInfo.author._id && (
                      <div className="justify-content-between">
                        <Link
                          className="btn btn-primary m-1"
                          to={`/edit/${postInfo._id}`}
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-danger m-1"
                          onClick={DeletePost}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </nav>
                  <div
                    data-bs-spy="scroll"
                    data-bs-target="#navbar-example2"
                    data-bs-offset="0"
                    className="scrollspy-example position-relative mt-2 overflow-auto"
                    tabIndex="0"
                  >
                    <h4 id="scrollspyHeading1"></h4>
                    <p>{postInfo.description}</p>
                    <h4 id="scrollspyHeading2"></h4>
                    <div
                      dangerouslySetInnerHTML={{ __html: postInfo.content }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ContainerForRecent />
        </div>
      </div>
    </>
  );
}
