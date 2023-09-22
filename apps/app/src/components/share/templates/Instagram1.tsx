import { useMemo } from "react";
import { Token } from "tamagui";

import { TemplateProps } from ".";
import { Grid1 } from "./Grid1";

import { Pick } from "@/model/Pick";

export function Instagram1({
  picks,
  ...templateProps
}: TemplateProps & { picks: Pick[] }) {
  const iconGridProps = useMemo(() => {
    console.log("iconGridProps");
    const maxIcons = 15;

    const iconSizes = new Map<number, Token>([
      [8, "$5"],
      [15, "$3"],
    ]);

    return {
      picks,
      maxIcons,
      iconSizes,
    };
  }, [picks]);

  return <Grid1 {...templateProps} ratio={1} iconGridProps={iconGridProps} />;
}
