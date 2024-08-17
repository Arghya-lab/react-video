import { SRT_EXTENSIONS, VTT_EXTENSIONS } from "./RegEx";
import srtParser2 from "srt-parser-2";
import { WebVTTParser } from "webvtt-parser";

export type SubtitleItemType = {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
};

export default async function fetchAndParseVTT(
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

// export function parseVtt(data: string): SubtitleItemType[] {
//   // Remove Windows carriage returns and split into lines
//   data = data.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
//   // Split the VTT content into blocks of text
//   const blocks = data.split(/\n\s*\n/);
//   const items: SubtitleItemType[] = [];

//   blocks.forEach((block) => {
//     // Match timestamp lines
//     const timestampMatch = block.match(
//       /(\d{2}:\d{2}:\d{2}[,.]\d{3}) --> (\d{2}:\d{2}:\d{2}[,.]\d{3})/
//     );
//     if (timestampMatch) {
//       const [, startTimeStr, endTimeStr] = timestampMatch;
//       const startTime = timeMsToSeconds(startTimeStr.trim());
//       const endTime = timeMsToSeconds(endTimeStr.trim());

//       // Get subtitle text, remove timestamps
//       const text = block.replace(timestampMatch[0], "").trim();

//       if (text.length > 0) {
//         items.push({
//           id: (items.length + 1).toString(), // Automatic ID generation
//           startTime,
//           endTime,
//           text,
//         });
//       }
//     }
//   });

//   return items;
// }

// function timeMsToSeconds(time: string): number {
//   const regex = /(\d{2}):(\d{2}):(\d{2})[,.](\d{3})/;
//   const parts = regex.exec(time);

//   if (!parts) {
//     return 0;
//   }

//   const hours = parseInt(parts[1], 10);
//   const minutes = parseInt(parts[2], 10);
//   const seconds = parseInt(parts[3], 10);
//   const milliseconds = parseInt(parts[4], 10);

//   return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
// }
