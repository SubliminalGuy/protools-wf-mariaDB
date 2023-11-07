import { useLoaderData } from "react-router-dom";
import { remult } from "remult";
import { Project } from "../shared/Project";

const projectRepo = remult.repo(Project);

export function loader() {
  return projectRepo.find();
}

export default function OpenMedia() {
  const projects = useLoaderData() as {
    projektId: string;
    projektName: string;
    openMediaId: string;
    openMediaThema: string;
    openMediaRed: string;
    openMediaPlanungsdatum: Date;
  }[];

  return (
    <div>
      <main>
        <div className="project-names">
          <p className="project-info-big">Cosmo ProjektId</p>
          <p className="project-info-big">Cosmo Projektname</p>
          <p className="project-info-big">OM ID</p>
          <p className="project-info-big">OM Name</p>
          <p className="project-info-big">OM Redaktion</p>
          <p className="project-info-big">OM Planungsdatum</p>
        </div>
        {projects.map((task) => {
          let datum = "kein Datum";
          if (task.openMediaPlanungsdatum) {
            const dateObj = task.openMediaPlanungsdatum;
            let month = dateObj.getUTCMonth() + 1;
            let day = dateObj.getUTCDate();
            let year = dateObj.getUTCFullYear();

            datum = day + "." + month + "." + year;
          }

          return (
            <div className="project-element" key={task.projektId}>
              <div className="project-info">
                <p className="additional-info">Cosmo Projekt Id</p>
                <p className="project-paragraph">{task.projektId}</p>
              </div>
              <div className="project-info">
                <p className="additional-info">Cosmo Projekt Name</p>
                <p className="project-paragraph">{task.projektName}</p>
              </div>
              <div className="project-info">
                <p className="additional-info">OM ID</p>
                <p className="project-paragraph">{task.openMediaId}</p>
              </div>
              <div className="project-info">
                <p className="additional-info">OM Name</p>
                <p className="project-paragraph">{task.openMediaThema}</p>
              </div>
              <div className="project-info">
                <p className="additional-info">OM Redaktion</p>
                <p className="project-paragraph">{task.openMediaRed}</p>
              </div>
              <div className="project-info">
                <p className="additional-info">OM Planungsdatum</p>
                <p className="project-paragraph">{datum}</p>
              </div>
            </div>
          );
        })}
        <div className="list-container">
          <label className="pLabel">Projektauswahl:</label>

          <select className="list-item" name="projekte" id="projekte">
            {projects.map((task) => {
              return (
                <option value={task.projektName}>{task.projektName}</option>
              );
            })}
          </select>
        </div>
      </main>
    </div>
  );
}
