import {ImageResponse} from "next/og";

export const size = {width: 180, height: 180};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "10px solid #9cd93b",
        borderRadius: 32,
        background: "#07100d",
        color: "#e8f6d0",
        fontFamily: "Arial, sans-serif",
        fontSize: 58,
        fontWeight: 900,
        letterSpacing: "-4px",
      }}
    >
      S51
    </div>,
    size,
  );
}
