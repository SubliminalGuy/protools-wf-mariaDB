import { Entity, Fields } from "remult";

@Entity("aimetadata", {
  allowApiCrud: true,
})
export class AiMetadata {
  @Fields.string()
  jobName = "";

  @Fields.string()
  sprache = "";

  @Fields.string()
  sprechertext = "";

  @Fields.string()
  stimme = "";

  @Fields.string()
  projektpfad = "";

  @Fields.string()
  autorEmail = "";

  @Fields.string()
  prepadding = "";

  @Fields.string()
  postpadding = "";

  @Fields.string()
  speakertiming = "";

  @Fields.string()
  alternativeSegments = "";

  @Fields.json()
  autocutPfade: string[] = [];

  @Fields.json()
  assetIds: string[] = [];

  @Fields.date()
  createdDate = new Date();
}
