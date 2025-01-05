import React from "react";
import { FaLink, FaDownload } from "react-icons/fa";
import "./clipboardCopy.css";
export function ClipboardCopy({ copyText }) {
  const [isCopied, setIsCopied] = React.useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="clipboardContainer">
      {/* <input className='copyContainer' type="text" value={copyText} readOnly /> */}
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <div>
          <button className="copyButton" onClick={handleCopyClick}>
            <FaLink size={10} /> {!isCopied ? "Share" : "Copied"}
          </button>
        </div>
        <div>
          <button className="copyButton" onClick={handleCopyClick}>
            <a href={copyText} target="_blank" download={copyText}>
              <FaDownload size={10} /> {"Download"}
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
