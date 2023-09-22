import { AbsoluteFill, useVideoConfig } from "remotion";
import { Phone } from "../devices/Phone";

export function TwitterBanner() {
  const { width } = useVideoConfig();
  const phoneWidth = 400; // 1530

  return (
    <AbsoluteFill className="bg-rose-500">
      <Phone
        width={phoneWidth}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-19 at 09.22.49.png"
        className="absolute z-10 top-[120px]"
        style={{ left: width / 5 - phoneWidth / 2 }}
      />
      <Phone
        width={phoneWidth}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-19 at 09.22.44.png"
        className="absolute z-20 top-[80px]"
        style={{ left: width / 3 - phoneWidth / 2 }}
      />
      {/* Center */}
      <Phone
        width={phoneWidth}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-19 at 09.23.51.png"
        className="absolute z-30 top-[50px]"
        style={{ left: width / 2 - phoneWidth / 2 }}
      />
      <Phone
        width={phoneWidth}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-19 at 09.22.18.png"
        className="absolute z-20 top-[80px]"
        style={{ right: width / 3 - phoneWidth / 2 }}
      />
      <Phone
        width={phoneWidth}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-19 at 09.23.36.png"
        className="absolute z-10 top-[120px]"
        style={{ right: width / 5 - phoneWidth / 2 }}
      />
    </AbsoluteFill>
  );
}