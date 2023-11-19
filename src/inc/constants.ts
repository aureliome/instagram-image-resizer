import { ResizeOptions } from "sharp";

export const IG_POST_WIDTH = 1080;
export const IG_POST_HEIGHT_HOR = 1080;
export const IG_POST_HEIGHT_VER = 1350;
export const JPEG_QUALITY_PERCENTAGE = 100;

export const SHARP_RESIZE_OPTIONS: ResizeOptions = {
  fit: "contain",
  background: "#000000",
};

export const SHARP_JPEG_OPTIONS = {
  quality: 100,
};
