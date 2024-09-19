import { SRT_EXTENSIONS, VTT_EXTENSIONS } from "./RegEx";
import srtParser2 from "srt-parser-2";
import { WebVTTParser } from "webvtt-parser";

export type SubtitleItemType = {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
};

export default async function fetchAndParseCaption(
  url: string
): Promise<SubtitleItemType[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch VTT file: ${response.statusText}`);
    }

    const data = await response.text();

    if (SRT_EXTENSIONS.test(url)) {
      const parser = new srtParser2();
      return parser
        .fromSrt(data)
        .map(({ id, startSeconds, endSeconds, text }) => ({
          id,
          startTime: startSeconds,
          endTime: endSeconds,
          text,
        }));
    } else if (VTT_EXTENSIONS.test(url)) {
      const parser = new WebVTTParser();
      return parser
        .parse(data)
        .cues.map(({ id, startTime, endTime, text }) => ({
          id,
          startTime,
          endTime,
          text,
        }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching or parsing VTT:", error);
    return [];
  }
}
