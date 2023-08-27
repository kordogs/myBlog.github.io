import RecentPost from "../Posts/RecentPosts";

export default function ContainerForRecent() {
  return (
    <>
      <div className="col-md-4">
        <div className="position-sticky" style={{ top: "2rem" }}>
          <div>
            <h4 className="fst-italic">Recent posts</h4>
            <ul className="list-unstyled">
              <RecentPost />
              <RecentPost />
              <RecentPost />
              <RecentPost />
              <RecentPost />
            </ul>
          </div>
          <div className="p-4">
            <h4 className="fst-italic">Archives</h4>
            <ol className="list-unstyled mb-0">
              <li>
                <a href="#">March 2021</a>
              </li>
              <li>
                <a href="#">February 2021</a>
              </li>
              <li>
                <a href="#">January 2021</a>
              </li>
              <li>
                <a href="#">December 2020</a>
              </li>
              <li>
                <a href="#">November 2020</a>
              </li>
              <li>
                <a href="#">October 2020</a>
              </li>
              <li>
                <a href="#">September 2020</a>
              </li>
              <li>
                <a href="#">August 2020</a>
              </li>
              <li>
                <a href="#">July 2020</a>
              </li>
              <li>
                <a href="#">June 2020</a>
              </li>
              <li>
                <a href="#">May 2020</a>
              </li>
              <li>
                <a href="#">April 2020</a>
              </li>
            </ol>
          </div>
          <div className="p-4">
            <h4 className="fst-italic">Elsewhere</h4>
            <ol className="list-unstyled">
              <li>
                <a href="#">GitHub</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
