import React from "react";
import ReactDOM from "react-dom/client";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import OpenMedia, { loader as openMediaLoader } from "./pages/OpenMedia";
import Hostname, { loader as hostnameLoader } from "./pages/Servername";
import ProToolsCheckin, {
  loader as proToolsLoader,
} from "./pages/ProToolsCheckin";
import AICut, { loader as aiCutLoader } from "./pages/AICut";

import "./index.css";

/* React State Management for Popup
 */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route
        path="openmedia"
        loader={openMediaLoader}
        element={<OpenMedia />}
      />
      <Route
        path="audiomix"
        loader={proToolsLoader}
        element={<ProToolsCheckin />}
      />
      <Route path="hostname" loader={hostnameLoader} element={<Hostname />} />
      <Route path="aicut" loader={aiCutLoader} element={<AICut />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
