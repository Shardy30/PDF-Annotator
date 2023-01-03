import React from "react";
import { useLocation } from "react-router-dom";

const Document_page = () => {
  const location = useLocation();
  const propsData = location.state;
  const pdf_url = propsData.pdf;
  const doc_id = propsData.doc_id;
  console.log("The url of pdf to be loaded is:", pdf_url, doc_id);
  const box = {
    x: "110",
    y: "123",
    width: "100",
    height: "50",
    pageNumber: "8",
    annotation: "Author",
  };
  let boxes = [box];
  return (
    <>
      <div className="container p-2 row">
        <div className="col-5">
          <div className="d-inline-flex p-4 g-col-6 h4 pb-2 mb-4 text-dark border-bottom border-primary border-2 border-start-0">
            Labels :
          </div>
          <div className="d-flex flex-row mb-3">
            <div className="px-3">
              <div className="d-inline-flex py-2 px-3 text- bg-danger-subtle bg-opacity-10 border border-danger  border-3 rounded-start rounded-end">
                Title
              </div>
            </div>
            <div className="px-3">
              <div className="d-inline-flex py-2 px-3 text- bg-success-subtle bg-opacity-10 border border-success  border-3 rounded-start rounded-end">
                Author
              </div>
            </div>
          </div>
          <div className="d-inline-flex p-4 g-col-6 h4 pb-2 mb-4 text-dark border-bottom border-primary border-2 border-start-0">
            Boxes :
          </div>
          <div className="p-2">
            {boxes.map((box, i) => (
              <div key={i} className="py-2">
                <div className="d-inline-flex align-items-start flex-column mb-3 p-2 px-4 border border-dark-subtle border-2 rounded">
                  <p>
                    x: {box.x} &nbsp; y: {box.y} &nbsp; &nbsp; height:{" "}
                    {box.height} &nbsp; width: {box.width}{" "}
                  </p>
                  <p>
                    Page: {box.pageNumber} &nbsp; &nbsp; &nbsp; Type:{" "}
                    <text
                      className={
                        box.annotation === "Title"
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {box.annotation}
                    </text>{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-7 p-4">ok</div>
      </div>
    </>
  );
};

export default Document_page;
