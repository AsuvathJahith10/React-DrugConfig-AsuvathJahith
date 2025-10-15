//import React from "react";
////import "bootstrap/dist/css/bootstrap.min.css";
//import "./App.css";
//import PAEngineConfiguration from "./Components/PAEngineConfiguration.jsx";
//import LandingPage from "./Components/LandingPage.jsx";
//import LandingPage from "./Components/LandingPage.jsx";
//function App() {
//  return <LandingPage />;
//}

//export default App;

import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PAEConfigMaster from "./Components/PAEConfigMaster.jsx";

function App() {
    return (
        <Router>
            <PAEConfigMaster />
        </Router>
    );
}

export default App;
