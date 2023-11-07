import { Entity, Fields } from "remult";

@Entity("protools", {
  allowApiCrud: true,
})
export class ProTools {
  @Fields.string()
  projectname = "";

  @Fields.string()
  projectId = "";

  @Fields.string()
  jobId = "";

  @Fields.string()
  mxfPath = "";

  @Fields.string()
  autor = "";

  @Fields.date()
  createdDate = new Date();
}
