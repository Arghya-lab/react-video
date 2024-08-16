import { SourceItemType, SourceType } from "../@types/video";
import { MATCH_DROPBOX_URL } from "./RegEx";
import { shouldUseDASH, shouldUseFLV, shouldUseHLS } from "./shouldUseStream";

export default class VideoSrc {
  /*
    MediaStream not supported
  */
  private source: SourceType;
  private defaultQuality?: string | number;

  constructor(source: SourceType, defaultQuality?: string | number) {
    this.source = source;
    this.defaultQuality = defaultQuality;
  }

  private findPreferredSource(): SourceItemType | undefined {
    if (this.source instanceof Array) {
      const userPref = this.source.find(
        (sourceItem) =>
          sourceItem.quality && sourceItem.quality == this.defaultQuality
      );
      const auto =
        this.source.find(
          (si) =>
            si.quality == "480p" ||
            si.quality == "560p" ||
            (typeof si.quality === "number" &&
              si.quality >= 300 &&
              si.quality <= 600)
        ) || this.source[0];

      return userPref || auto;
    }
    return;
  }

  public get src(): string | undefined {
    if (!this.source) return;

    //  If source is array
    if (this.source instanceof Array) {
      const preferredSource = this.findPreferredSource();
      if (preferredSource) {
        return new VideoSrc(preferredSource.src).src;
      }
      return;
    }

    if (
      shouldUseHLS(this.source) ||
      shouldUseDASH(this.source) ||
      shouldUseFLV(this.source)
    ) {
      return;
    }

    if (MATCH_DROPBOX_URL.test(this.source)) {
      return new VideoSrc(
        this.source.replace("www.dropbox.com", "dl.dropboxusercontent.com")
      ).src;
    }

    return this.source;
  }

  public get hlsSrc(): string | undefined {
    if (!this.source) return;

    //  If source is array
    if (this.source instanceof Array) {
      const preferredSource = this.findPreferredSource();
      if (preferredSource) {
        return new VideoSrc(preferredSource.src).hlsSrc;
      }
      return;
    }

    if (shouldUseHLS(this.source)) {
      return this.source;
    }

    return;
  }

  public get dashSrc(): string | undefined {
    if (!this.source) return;

    //  If source is array
    if (this.source instanceof Array) {
      const preferredSource = this.findPreferredSource();
      if (preferredSource) {
        return new VideoSrc(preferredSource.src).dashSrc;
      }
      return;
    }

    if (shouldUseDASH(this.source)) {
      return this.source;
    }

    return;
  }

  public get flvSrc(): string | undefined {
    if (!this.source) return;

    //  If source is array
    if (this.source instanceof Array) {
      const preferredSource = this.findPreferredSource();
      if (preferredSource) {
        return new VideoSrc(preferredSource.src).flvSrc;
      }
      return;
    }

    if (shouldUseFLV(this.source)) {
      return this.source;
    }

    return;
  }

  public get preferredSource(): SourceItemType | null {
    if (this.source instanceof Array) {
      const preferredSource = this.findPreferredSource();
      if (preferredSource) {
        return preferredSource;
      }
      return null;
    }

    return null;
  }
}
