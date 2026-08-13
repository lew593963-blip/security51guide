import {ImageResponse} from "next/og";

export const size = {width: 512, height: 512};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "26px solid #9cd93b",
        background: "#07100d",
        color: "#e8f6d0",
        fontFamily: "Arial, sans-serif",
        fontSize: 168,
        fontWeight: 900,
        letterSpacing: "-12px",
      }}
    >
      S51
    </div>,
    size,
  );
}
