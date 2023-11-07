import { Entity, Fields } from "remult";

@Entity("hostnames", {
  allowApiCrud: true,
})
export class Hostname {
  @Fields.string()
  hostname = "";

  @Fields.string()
  rechnernummer = "";
}
