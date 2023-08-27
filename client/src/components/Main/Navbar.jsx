import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { UserContext } from "../../UserContext";

export default function Navbar() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [showModalLogOut, setShowModalLogOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!userInfo?.username);
  const [redirect] = useState(false);
  const Navigate = useNavigate();

  async function Logout() {
    fetch("http://localhost:4000/Logout", {
      credentials: "include",
      method: "POST",
    });

    await setUserInfo(null);
  }

  useEffect(() => {
    // Update the isLoggedIn state based on userInfo
    setIsLoggedIn(!!userInfo?.username);
  }, [userInfo]);

  const handleCloseModal = () => {
    setShowModalLogOut(false);
  };

  const handleShowModalLogOut = () => {
    setShowModalLogOut(true);
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container mt-4">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1">
            <NavLink className="navbar-brand" to={"/"}>
              <img src="/src/assets/react.svg"></img>
              TITLE
            </NavLink>
          </div>
          <div className="col-4 text-center">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-dark" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <nav>
              {isLoggedIn && (
                <>
                  <div className="dropdown text-end">
                    <a className="h6 mx-2 p-0">{userInfo?.username}</a>
                    <button
                      className="btn  btn-sm btn-outline-secondary rounded-pill"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="45"
                        fill="currentColor"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                    </button>
                    <ul className="dropdown-menu text-small">
                      <li>
                        <NavLink className="dropdown-item" to={"/CreatePost"}>
                          New project...
                        </NavLink>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Settings
                        </a>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={"/Account/Profile"}
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          onClick={handleShowModalLogOut}
                        >
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <Modal
                    show={showModalLogOut}
                    onHide={handleCloseModal}
                    centered
                  >
                    <Modal.Header>
                      <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Are you sure you want to Logout?</p>
                    </Modal.Body>
                    <Button variant="secondary m-1" onClick={handleCloseModal}>
                      Close
                    </Button>
                    <Button
                      variant="success m-1"
                      onClick={() => {
                        handleCloseModal();
                        Logout();
                        Navigate("/");
                      }}
                    >
                      Confirm
                    </Button>
                  </Modal>
                </>
              )}

              {!isLoggedIn && (
                <>
                  <NavLink
                    className="btn btn-sm btn-outline-success m-2"
                    href="#"
                    to={"/Login"}
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    className="btn btn-sm btn-outline-secondary"
                    href="#"
                    to={"/Register"}
                  >
                    Sign up
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
