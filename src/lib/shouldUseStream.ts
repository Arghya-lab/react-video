import {
  DASH_EXTENSIONS,
  FLV_EXTENSIONS,
  HLS_EXTENSIONS,
  MATCH_CLOUDFLARE_STREAM,
} from "./RegEx";

export function shouldUseHLS(url: string) {
  return HLS_EXTENSIONS.test(url) || MATCH_CLOUDFLARE_STREAM.test(url);
}

export function shouldUseDASH(url: string) {
  return DASH_EXTENSIONS.test(url);
}

export function shouldUseFLV(url: string) {
  return FLV_EXTENSIONS.test(url);
}
