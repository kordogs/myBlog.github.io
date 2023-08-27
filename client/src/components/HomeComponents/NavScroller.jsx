export default function NavScroller() {
  return (
    <>
      <div className="container">
        <header className="border-bottom lh-1 py-3"></header>
        <div className="nav-scroller py-1 mb-3 border-bottom">
          <nav className="nav nav-underline justify-content-between">
            <div className="row">
              <div className="col">
                <a className="nav-item nav-link link-body-emphasis" href="#">
                  Style
                </a>
              </div>
              <div className="col">
                <a className="nav-item nav-link link-body-emphasis" href="#">
                  Travel
                </a>
              </div>
              <div className="col"></div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
