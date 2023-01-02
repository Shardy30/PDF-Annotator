import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <h2 className="text-center p-4">
        <div className="d-inline-flex p-3 text- bg-primary-subtle bg-opacity-10 border border-primary  border-3 rounded-start rounded-end">
          Welcome to PDF - Annotator
        </div>
      </h2>
      <div className="grid gap-3">
        <div className="d-inline-flex p-4 g-col-6 h4 pb-2 mb-4 text-dark border-bottom border-primary border-2 border-start-0">
          Choose a Document to Annotate :
        </div>
        <div className="d-flex px-4 py-1">
        <Link to={`document`}>
          <div className="d-inline-flex p-1 text- bg-primary-subtle bg-opacity-10 border border-primary  border-3 rounded-start rounded-end">
          SampleDocument_1.pdf
          </div>
          </Link>
        </div>
        <div className="d-flex px-4 py-1">
        <Link to={`document`}>
          <div className="d-inline-flex p-1 text- bg-primary-subtle bg-opacity-10 border border-primary  border-3 rounded-start rounded-end">
          SampleDocument_2.pdf
          </div>
          </Link>
        </div><div className="d-flex px-4 py-1">
        <Link to={`document`}>
          <div className="d-inline-flex p-1 text- bg-primary-subtle bg-opacity-10 border border-primary  border-3 rounded-start rounded-end">
          SampleDocument_3.pdf
          </div>
          </Link>
        </div>
      </div>
      <footer className="position-absolute bottom-0 start-50 translate-middle-x">
        <div className="text-center p-3 ">
          ©2023 Copyright : &nbsp;
          <a className="" href="https://github.com/Shardy30/pdfAnnotator">
            Github - Shardy
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
