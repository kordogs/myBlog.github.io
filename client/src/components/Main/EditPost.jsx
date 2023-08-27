import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [cover, setCover] = useState("");
  const [genre, setGenre] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:4000/ViewPost/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setDescription(postInfo.description);
        setFiles(postInfo.cover);
        setContent(postInfo.content);
      });
    });
  }, []);

  async function editPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    data.set("content", content);
    data.set("genre", genre);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    ev.preventDefault();
    const respone = await fetch("http://localhost:4000/UpdatePost", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (respone.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  const cannotSubmit = title.trim() === "" || content.trim() === "";

  return (
    <>
      <div className="container mt-5">
        <div className="bd-example-snippet bd-code-snippet">
          <div className="bd-example m-0 border-0">
            <form onSubmit={editPost}>
              <div className="col-md-3">
                <label htmlFor="validationServer04" className="form-label">
                  State
                </label>
                <select
                  className="form-select"
                  id="validationServer04"
                  required
                  value={genre}
                  onChange={(ev) => setGenre(ev.target.value)}
                >
                  <option>World</option>
                  <option>Technology</option>
                  <option>Design</option>
                  <option>Culture</option>
                  <option>Business</option>
                  <option>Politics</option>
                  <option>Opinions</option>
                  <option>Science</option>
                  <option>Health</option>
                  <option>Style</option>
                  <option>Travel</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  className="form-control"
                  value={title}
                  onChange={(ev) => setTitle(ev.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  className="form-control"
                  value={description}
                  onChange={(ev) => setDescription(ev.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="customFile">
                  Upload || leaving empty will keep original cover
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="customFile"
                  onChange={(ev) => setFiles(ev.target.files)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Content</label>
                <ReactQuill
                  theme="snow"
                  value={content}
                  modules={modules}
                  formats={formats}
                  onChange={setContent}
                  placeholder="Content must not be empty"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={cannotSubmit}
              >
                Submit Edited Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
