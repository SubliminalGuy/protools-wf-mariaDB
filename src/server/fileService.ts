import { promises as fs } from "fs";
import path from "path";

require("dotenv").config();

const proToolsPath = process.env.PROTOOLS_MOUNT as string;


export const getAudioFiles = async () => {
  let audioFiles: { filePath: string; fileName: string }[] = [];

  const findFiles = async (folderName: string) => {
    const items = await fs.readdir(folderName, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        const joinedPath = path.join(folderName, item.name);
        await findFiles(joinedPath);
        //await findFiles(path.join(folderName, item.name));
      } else {
        if (path.extname(item.name) === ".wav") {
          // get Full Path
          let filePath = path.join(folderName, item.name);
          audioFiles.unshift({ filePath: filePath, fileName: item.name });
        }
      }
    }
  };
  await findFiles(proToolsPath);
  return audioFiles;
};

// export const getPathOfAudioFile = (file) => {
//   const pathToFile = path.win32.join("bla", file);
//   return pathToFile;
// };
