import React, { useState } from "react";
import "./uploadCard.css";
import Image from "../image.svg";
import axios from "axios";
import ProgressBar from "../progressBar/progressBar";
import SuccessHeader from "../successHeader/successheader";
import { ClipboardCopy } from "../clipboardCopy/clipboardCopy";
import UploadIcon from "../../Icons/UploadIcon.tsx";

const UploadCard = () => {
  const [selectedImage, setSelected] = useState();
  const [progress, SetProgress] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [progressValue, SetProgressValue] = useState();
  const drop = React.useRef(null);
  React.useEffect(() => {
    drop.current.addEventListener("dragover", handleDragOver);
    drop.current.addEventListener("drop", handleDrop);

    return () => {
      drop.current.removeEventListener("dragover", handleDragOver);
      drop.current.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    // if (
    //   files[0].type !== "image/png" &&
    //   files[0].type !== "image/jpg" &&
    //   files[0].type !== "image/jpeg"
    // ) {
    //   alert("Jpeg and Png format only supported");
    //   return;
    // }
    if (files && files.length) {
      onSelectFile("", files);
    }
  };
  async function onSelectFile(event, fileName) {
    let file =
      fileName && fileName[0] !== undefined
        ? fileName[0]
        : event.target.files[0];
    SetProgress(true);
    console.log( file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg")
    if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" && file.size>2049
      ) {
        alert("Only supports for Jpeg/Png format below 2mb ");
        SetProgress(false)
        return;
      }

    let formData = new FormData();
    formData.append("file", file);

    await axios
      .post(
        `https://imageserver-kzgz.onrender.com/upload-single-file`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            SetProgressValue(percentCompleted - 10);
            console.log(`upload process: ${percentCompleted}%`);
          },
        }
      )
      .then((res) => {
        setSelected(res.data);
        SetProgress(false);
        setSuccess(true);
      })
      .catch((err) => {
        alert("Something went wrong.... please try again");
        SetProgress(false);
      });
  }
  const Header = () => {
    return (
      <>
        <div className="uploadHeader">
          <p>Drag & drop a file or </p>
          <input
            style={{ display: "block", width: "90px" }}
            type="file"
            label="Browse File"
            onInput={(e) => {
              onSelectFile(e);
            }}
          />
          <br></br>
        </div>
      </>
    );
  };

  return (
    <>
      {!progress ? (
        <div className="main">
          <div
            className={"imageCard"}
            ref={drop}
            draggable="true"
            onDrag={() => {
              console.log("logging");
            }}
          >
            {selectedImage && (
              <img
                src={selectedImage}
                alt="nature"
                className={ "expandImage"}
              />
            )}
            {!selectedImage && (
              <>
                <UploadIcon />
                <Header />
                <p className="supportedInfo">JPG, PNG or GIF - Max file size 2MB</p>
              </>
            )}
          </div>

          <div>{success && <ClipboardCopy copyText={selectedImage} />}</div>
        </div>
      ) : (
        <div className="progressContainer">
          <ProgressBar progressValue={progressValue} />
        </div>
      )}
    </>
  );
};

export default UploadCard;
