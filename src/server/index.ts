import express from "express";
import { api } from "./api";
import { getAudioFiles } from "./fileService";
import { remult } from "remult";
import { ProTools } from "../shared/ProTools";
import dummyjson from "../dummy-helmut-body.json";

const app = express();
app.use(api);

/* Route to get  files form the file system recursively
 */
app.get("/api/files", async (req, res) => {
  getAudioFiles().then((queryResult) => res.json(queryResult));
  res.end;
});

/* Route to prepare the helmut checkin
 */
app.post("/api/checkin", api.withRemult, async (req, res) => {
  const proTools = remult.repo(ProTools);
  try {
    const data = await proTools.find({
      where: { projectname: req.body.projectData.projectName },
    });

    const projektData = data[0];
    const payload = { ...dummyjson };
    const newMetadata = [];
    for (const object of payload.metadata) {
      switch (object.name) {
        case "PT Projectname":
          object.value = projektData.projectname;
          break;
        case "PT ProjectID":
          object.value = projektData.projectId;
          break;
        case "PT JobID":
          object.value = projektData.jobId;
          break;
        case "PT MXF":
          object.value = projektData.mxfPath;
          break;
        case "PT Autor":
          object.value = projektData.autor;
          break;
        case "PT AudioST":
          object.value = req.body.projectData.audioSpur1;
          break;
        case "PT AudioIT":
          // condition to handle possibility of empty audio track
          object.value =
            req.body.projectData.audioSpur2 === ""
              ? ""
              : req.body.projectData.audioSpur2;
          break;
      }
      newMetadata.push(object);
    }
    payload.metadata = newMetadata;
    console.log(payload.metadata);
    const projektId = projektData.projectId;
    res.json({ message: projektId, success: true });
  } catch {
    res.json({ message: req.body.projectData.projectName, success: false });
  }
});

app.listen(3002, () => console.log("Server started at port 3002"));
