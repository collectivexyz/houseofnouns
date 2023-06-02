import { CategoryTypeEnum } from "../interfaces/category-type.enum";
import { IExtractor } from "../interfaces/extractor";
import { PlatformTypeEnum } from "../interfaces/platform-type.enum";

export class GithubExtractor implements IExtractor {
  public async extract(url: string) {
    return {
      url,
      platform: PlatformTypeEnum.GitHub,
      category: this.getCategory(url),
    };
  }

  private getCategory(url: string): CategoryTypeEnum {
    const parts = url.split("github.com/");
    if (parts.length > 1) {
      const path = parts[1];
      if (path.startsWith("users/") || path.startsWith("orgs/") || !path.includes("/")) {
        return CategoryTypeEnum.Profile;
      }
    }

    return CategoryTypeEnum.Other; // Repository
  }
}
