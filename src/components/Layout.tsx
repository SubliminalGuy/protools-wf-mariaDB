import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const [showModal, setShowModal] = useState(false);

  /* React State Management for Popup
   */
  const [showExitPopup, setShowExitPopup] = useState(false);

  /* React State Management for PopupCounter
   */
  const [popUpCounter, setPopUpCounter] = useState(0);

  /* React State Management for MouseOverActive
   */
  const [mouseLeaveActive, setMouseLeaveActive] = useState(false);

  /* Activates the  mouseLeave event after x seconds
   */
  setTimeout(() => {
    setMouseLeaveActive(true);
  }, 10_000);

  /* Handles the mouseLeave event
  checks if the user was moving the mouse to the top of the screen
  */
  function mouseLeaves(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.clientY < 10 && popUpCounter <= 0) {
      setShowExitPopup(true);
      setPopUpCounter((prev) => prev + 1);
    }
  }

  function menuIconClick() {
    const modal = true;
    setShowModal(modal);
  }

  let location = useLocation();

  useEffect(() => {
    const modal = false;
    setShowModal(modal);
  }, [location]);

  return (
    <>
      {!showModal && (
        <div
          className="layout-container"
          onMouseLeave={mouseLeaveActive ? (e) => mouseLeaves(e) : undefined}
        >
          <Header modalHandler={menuIconClick} />

          <Outlet context={[showExitPopup, setShowExitPopup]} />
          <Footer />
        </div>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-link-container">
            <NavLink className="modal-link" to={"/"}>
              Home
            </NavLink>
          </div>
          <div className="modal-link-container">
            <NavLink className="modal-link" to={"/audiomix"}>
              ProTools Audiomix
            </NavLink>
          </div>
          <div className="modal-link-container">
            <NavLink className="modal-link" to={"/openmedia"}>
              OpenMedia Projects
            </NavLink>
          </div>
          <div className="modal-link-container">
            <NavLink className="modal-link" to={"/hostname"}>
              Hostname Tool
            </NavLink>
          </div>
          <div className="modal-link-container">
            <NavLink className="modal-link" to={"/aicut"}>
              AICut Metadata
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
