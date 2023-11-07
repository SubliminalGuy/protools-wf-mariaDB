import * as Select from "@radix-ui/react-select";
import { useLoaderData, useOutletContext } from "react-router-dom";

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { remult } from "remult";
import { useState, useEffect } from "react";

import { ProTools } from "../shared/ProTools";

import "../exit-popup.css";

const proToolsRepo = remult.repo(ProTools);

export function loader() {
  return proToolsRepo.find();
}

import nativeToast from "native-toast";
import "../select-style.css";
import "../native-toast.css";

type ContextType = {
  showExitPopup: boolean;
  setShowExitPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProToolsCheckin() {
  /* Type Declaration für die Projektdaten aus der Datenbank
   */
  const helmutProjects = useLoaderData() as {
    projectname: string;
    projectId: string;
    jobId: string;
    mxfPath: string;
    autor: string;
    createdDate: Date;
  }[];

  /* React State Management für die Audiofile-Liste
   */
  const [audioFiles, setAudioFiles] = useState([]);

  /* React State Management für die Select-Elemente
   */
  const [projectData, setProjectData] = useState({
    projectName: "",
    audioSpur1: "",
    audioSpur2: "",
  });

  /* React State Management for the CheckIn Button
   */
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  /* React State Variables for the ExitPopup that
   * come form the useOutletContext of React Router 6
   */

  const [showExitPopup, setShowExitPopup] = useOutletContext() as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];

  /* Holt die List der Audiofiles vom Server
   */

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => {
        setAudioFiles(data);
      });
  }, []);

  /* Erstellt die Select-Elemente aus den Projektdaten
   */
  const selectProjectElements = helmutProjects.map((project) => {
    return (
      <Select.Item
        className="SelectItem"
        key={project.jobId}
        value={project.projectname}
      >
        {project.projectname}
      </Select.Item>
    );
  });

  /* Erstellt die Select-Elemente aus der Audiofiles-Liste
   */
  const selectAudioElements = audioFiles.map(
    (el: { filePath: string; fileName: string }) => {
      return (
        <Select.Item
          className="SelectItem"
          key={el.filePath}
          value={el.filePath}
        >
          {el.fileName}
        </Select.Item>
      );
    }
  );

  /* Ändert die Werte in projectData, wenn ein Select-Element verändert wird
   *  @param type: string - der Typ des Select-Elements, z.B. projectName
   *  @param value: string - der Wert des Select-Elements, z.B. Schiesserei in Neukölln
   */
  const handleValueChange = (type: string, value: string) => {
    setProjectData((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };
  /* Funktion, die beim Click auf den CheckIn Button ausgeführt wird
   * 1. Setzt den hasCheckedIn State auf true
   * 2. Gibt eine nativeToast Nachricht aus
   * 3. Reloadet die Seite nach 5 Sekunden
   */
  const buttonHandler = () => {
    fetch(`api/checkin`, {
      method: "POST",
      body: JSON.stringify({ projectData }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.success) {
        nativeToast({
          message: `Der Job wurde mit der id ${json.message} an Helmut übergeben ...`,
          position: "south-east",
          // Self destroy in 5 seconds
          timeout: 5000,
          type: "success",
        })
      }
        else {
          nativeToast({
            message: `Der Job ${json.message} konnte nicht in der Datenbank gefunden werden! Haben Sie ein Projekt ausgewählt?`,
            position: "south-east",
            // Self destroy in 5 seconds
            timeout: 5000,
            type: "error",
          });
        }
      })
  
    setTimeout(() => {
      location.reload();
    }, 1000 * 7);
  };

  /* helper Function
   * Shortens the displayed value to a name without path information
   */
  const shortenPathToName = (path: string) => {
    const fileNameArray = path.split("/");
    const fileName = fileNameArray[fileNameArray.length - 1];
    return fileName;
  };

  return (
    <div className="headline-container">
      <h1 className="headline-container-h1">CheckIn ProTools</h1>
      <Select.Root
        // onOpenChange={() => handleOpenSelect()}

        onValueChange={(name: string) => handleValueChange("projectName", name)}
      >
        <Select.Trigger className="SelectTrigger" aria-label="Food">
          <Select.Value placeholder="Projekt auswählen">
            {projectData.projectName}
          </Select.Value>
          <Select.Icon className="SelectIcon">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="SelectContent"
            position="popper"
            side={window.innerWidth > 800 ? "right" : "bottom"}
            align={window.innerWidth > 800 ? "start" : "center"}
            sideOffset={window.innerWidth > 800 ? 40 : 0}
          >
            <Select.ScrollUpButton className="SelectScrollButton">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="SelectViewport">
              <Select.Group>
                <Select.Label className="SelectLabel">Projects</Select.Label>
                {selectProjectElements}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className="SelectScrollButton">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <Select.Root
        onValueChange={(name: string) => handleValueChange("audioSpur1", name)}
      >
        <Select.Trigger className="SelectTrigger" aria-label="Food">
          <Select.Value placeholder="Audiospur 1+2">
            {shortenPathToName(projectData.audioSpur1)}
          </Select.Value>
          <Select.Icon className="SelectIcon">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="SelectContent"
            position="popper"
            side={window.innerWidth > 800 ? "right" : "bottom"}
            align="center"
            sideOffset={window.innerWidth > 800 ? 40 : 0}
          >
            <Select.ScrollUpButton className="SelectScrollButton">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="SelectViewport">
              <Select.Group>
                <Select.Label className="SelectLabel">
                  Audiospur 1+2
                </Select.Label>
                {selectAudioElements}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className="SelectScrollButton">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <Select.Root
        //onOpenChange={() => handleOpenSelect()}
        onValueChange={(name: string) => handleValueChange("audioSpur2", name)}
      >
        <Select.Trigger className="SelectTrigger" aria-label="Food">
          <Select.Value placeholder="Audiospur 3+4">
            {shortenPathToName(projectData.audioSpur1)}
          </Select.Value>
          <Select.Icon className="SelectIcon">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="SelectContent"
            position="popper"
            side={window.innerWidth > 800 ? "right" : "bottom"}
            align={window.innerWidth > 800 ? "end" : "center"}
            sideOffset={window.innerWidth > 800 ? 40 : 0}
          >
            <Select.ScrollUpButton className="SelectScrollButton">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="SelectViewport">
              <Select.Group>
                <Select.Label className="SelectLabel">
                  Audiospur 3+4
                </Select.Label>
                {selectAudioElements}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className="SelectScrollButton">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <button className="Button" onClick={buttonHandler}>
        Einchecken
      </button>
      <div
        className={`exit-intent-popup ${
          showExitPopup && !hasCheckedIn ? "visible" : ""
        }`}
      >
        <div className="newsletter">
          <p>
            Es wurde noch kein Job zu Helmut eingecheckt! Sind Sie sicher, dass
            Sie die Seite verlassen wollen?
          </p>

          <button
            className="close-button"
            onClick={() => {
              setShowExitPopup(false);
            }}
          >
            Schliessen
          </button>
        </div>
      </div>
    </div>
  );
}
