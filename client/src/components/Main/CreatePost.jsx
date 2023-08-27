import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

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

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [genre, setGenre] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function handleCreatePost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    data.set("content", content);
    data.set("genre", genre);
    data.set("file", files[0]);
    ev.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/CreatePost", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        console.log("yey");
        setRedirect(true);
      } else {
        console.log("dwow");
      }
    } catch (error) {
      console.error("something went wrong");
      alert("Something went WRONG");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  const cannotSubmit = title.trim() === "" || content.trim() === "";

  return (
    <>
      <div className="container mt-5">
        <div className="bd-example-snippet bd-code-snippet">
          <div className="bd-example m-0 border-0">
            <form onSubmit={handleCreatePost}>
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
                  Upload
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
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
