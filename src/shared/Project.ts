import { Entity, Fields } from "remult";

@Entity("projects", {
  allowApiCrud: true,
})
export class Project {
  @Fields.string()
  projektId = "";

  @Fields.string()
  projektName = "";

  @Fields.string()
  openMediaId = "";

  @Fields.string()
  openMediaThema = "";

  @Fields.string()
  openMediaRed = "";

  @Fields.date()
  openMediaPlanungsdatum = new Date();
}
