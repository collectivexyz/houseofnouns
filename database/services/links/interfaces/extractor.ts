import { MediaType } from "../link.service";
import { ICategorizedLink } from "./categorized-link";

export interface IExtractor {
  extract(url: string, mediaType: MediaType): Promise<ICategorizedLink>;
}
