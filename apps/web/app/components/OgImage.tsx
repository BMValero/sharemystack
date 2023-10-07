import { CSSProperties } from "react";

import { config } from "~/lib/config";
import { Logo } from "./Logo";

export function OgImage({
  ogTitle,
  pathname,
  icons,
}: {
  ogTitle: string;
  pathname: string;
  icons:
    | {
        icon_svg: any;
      }[]
    | null;
}) {
  const title = ogTitle.replace(/- Share My Stack/g, "");

  const half =
    icons?.length && icons.length > 8 ? Math.ceil(icons.length / 2) : null;
  const row1 = icons && half ? icons.slice(0, half) : icons;
  const row2 = icons && half ? icons.slice(half) : null;

  const rowStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 50,
    paddingRight: 50,
    // gap: 30,
    justifyContent: "space-between",
  };

  const size = 100;
  const iconStyle = {
    display: "flex",
    height: size,
    width: size,
    color: "red",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div
      style={{
        color: config.color,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: 50,
          paddingTop: 25,
          paddingBottom: 25,
          color: "black",
          borderBottomColor: "black",
          borderBottomWidth: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 48,
          }}
        >
          {title}
        </div>
      </div>
      {row1 ? (
        <div style={rowStyle}>
          {row1.map((icon) => {
            return icon.icon_svg ? (
              <div key={icon.icon_svg} style={iconStyle}>
                <img
                  src={`data:image/svg+xml,${icon.icon_svg}`}
                  style={{ width: size * 0.8 }}
                />
              </div>
            ) : null;
          })}
        </div>
      ) : null}
      {row2 ? (
        <div style={rowStyle}>
          {row2.map((icon) => {
            return icon.icon_svg ? (
              <div key={icon.icon_svg} style={iconStyle}>
                <img
                  src={`data:image/svg+xml,${icon.icon_svg}`}
                  style={{ width: size * 0.8 }}
                />
              </div>
            ) : null;
          })}
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          fontSize: 72,
          paddingRight: 50,
          paddingTop: 25,
          paddingBottom: 25,
          borderTopColor: config.color,
          borderTopWidth: 2,
        }}
      >
        <Logo
          style={{
            display: "flex",
            width: 75,
            height: 75,
          }}
        />
        <div style={{ display: "flex", fontSize: 48, marginLeft: 15 }}>
          Share My Stack
        </div>
      </div>
    </div>
  );
}
