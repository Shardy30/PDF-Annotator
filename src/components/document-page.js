import React, { useRef, useEffect, useState } from "react";
import WebViewer from "@pdftron/webviewer";
import { useLocation } from "react-router-dom";

const Document_page = () => {
  const location = useLocation();
  const propsData = location.state;
  const pdf_url = propsData.pdf;
  const doc_id = propsData.doc_id;
  // console.log("The url of pdf to be loaded is:", pdf_url, doc_id);
  const data = localStorage.getItem(`box-${doc_id}`);
  const [boxes, setBoxes] = useState(data ? JSON.parse(data) : []);
  // const box = {
  //   PageNumber: 1,
  //   X: 110,
  //   Y: 123,
  //   Width: 100,
  //   Height: 50,
  //   Author: "Author",
  // };
  // if (data) {
  //   setBoxes(JSON.parse(data));
  // }
  // console.log(data);
  const saveData = () => {
    addToLocalStorage(`box-${doc_id}`, boxes);
  };

  const addToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const addBox = ({ PageNumber, X, Y, Width, Height, Author, StrokeColor }) => {
    setBoxes((prev) => [
      ...prev,
      {
        PageNumber,
        X,
        Y,
        Width: Math.trunc(Width * 100) / 100,
        Height: Math.trunc(Height * 100) / 100,
        Author,
        StrokeColor,
      },
    ]);
  };
  let currentAnnotation = "none";
  // console.log(currentAnnotation);
  let curr;
  const activateTitle = () => {
    // if (currentAnnotation !== "Title") {
      currentAnnotation = "Title";
    // } else {
    //   currentAnnotation = "none";
    // }
    curr=currentAnnotation;
    console.log(currentAnnotation);
    // return true;
  };
  const activateAuthor = () => {
    // if (currentAnnotation !== "Author") {
      currentAnnotation = "Author";
    // } else {
    //   currentAnnotation = "none";
    // }
    curr=currentAnnotation;
    console.log(currentAnnotation);
    // return false;
  };

  const viewer = useRef(null);
  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer",
        initialDoc: pdf_url,
      },
      viewer.current
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;
      instance.UI.disableElements(["header", "toolsHeader", "toolsOverlay"]);
      documentViewer.addEventListener("documentLoaded", () => {
        boxes.forEach((box) => {
          const rectangleAnnot = new Annotations.RectangleAnnotation(box);
          annotationManager.addAnnotation(rectangleAnnot);
          // need to draw the annotation otherwise it won't show up until the page is refreshed
          annotationManager.redrawAnnotation(rectangleAnnot);
        });
      });
      window.addEventListener("click", () => {
        console.log(curr);
        if (curr === "Title") {
          documentViewer.setToolMode(
            documentViewer.getTool(instance.Core.Tools.ToolNames.RECTANGLE)
          );
        } else if (curr === "Author") {
          documentViewer.setToolMode(
            documentViewer.getTool(instance.Core.Tools.ToolNames.RECTANGLE4)
          );
        } else {
          documentViewer.setToolMode(
            documentViewer.getTool(instance.Core.Tools.ToolNames.EDIT)
          );
        }
      });
      annotationManager.addEventListener(
        "annotationChanged",
        (annotations, action) => {
          annotations.forEach((annot) => {
            if (
              currentAnnotation !== "none" &&
              annot.Width !== 113.47875840000002
            ) {
              console.log("annotation page number", annot.PageNumber);
              console.log("annotation author", annot.Color.R);
              console.log("annotation width", annot.Width);
              console.log("annotation height", annot.Height);
              console.log("annotation x", annot.X);
              console.log("annotation y", annot.Y);
              addBox({
                PageNumber: annot.PageNumber,
                X: annot.X,
                Y: annot.Y,
                Width: annot.Width,
                Height: annot.Height,
                Author: annot.Color.R > 200 ? "Title" : "Author",
                StrokeColor: annot.Color,
              });
            }
          });
        }
      );
    });
  }, [currentAnnotation]);// eslint-disable-line react-hooks/exhaustive-deps 

  return (
    <>
      <div className="container p-2 row">
        <div className="col-5">
          <div className="d-inline-flex p-4 g-col-6 h4 pb-2 mb-4 text-dark border-bottom border-primary border-2 border-start-0">
            Labels :
          </div>
          <div className="d-flex flex-row mb-3">
            <div className="px-3">
              <button
                type="button"
                className="btn btn-danger"
                onClick={activateTitle}
                id="tibt"
              >
                Title
              </button>
            </div>
            <div className="px-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={activateAuthor}
                id="aubt"
              >
                Author
              </button>
            </div>
            <div className="px-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveData}
              >
                Save
              </button>
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
                    X: {box.X} &nbsp; Y: {box.Y} &nbsp; &nbsp; Height:{" "}
                    {box.Height} &nbsp; Width: {box.Width}{" "}
                  </p>
                  <div>
                    Page: {box.PageNumber} &nbsp; &nbsp; &nbsp; Type:{" "}
                    <p
                      style={{ display: "inline" }}
                      className={
                        box.Author === "Title" ? "text-danger" : "text-success"
                      }
                    >
                      {box.Author}
                    </p>{" "}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="col-7 p-4 webviewer"
          ref={viewer}
          style={{ height: "100vh" }}
        ></div>
      </div>
    </>
  );
};

export default Document_page;
