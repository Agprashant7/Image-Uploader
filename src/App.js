import "./App.css";

import Header from "./components/header/header.js";
import UploadCard from "./components/uploadCard/uploadCard";

function App() {
  return (
    <div className="App">
     <Header/>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UploadCard />
      </div>
    </div>
  );
}

export default App;
