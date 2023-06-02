import React, { ReactNode } from "react";
import Bold from "ui/icons/Bold";
import Italic from "ui/icons/Italic";
import Underline from "ui/icons/Underline";
import {
  BalloonToolbar,
  BalloonToolbarProps,
  getPluginType,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MarkToolbarButton,
  WithPartial,
  ELEMENT_H1,
  ELEMENT_H2,
  BlockToolbarButton,
  ToolbarButton,
} from "@udecode/plate";
import { useMyPlateEditorRef } from "../../create/[draftId]/components/plateTypes";

export const markTooltip = {
  arrow: true,
  delay: 0,
  duration: [200, 0],
  hideOnClick: false,
  offset: [0, 17],
  placement: "top",
};

export const FixedEditorToolbar = (props: WithPartial<BalloonToolbarProps, "children">) => {
  const { children, ...balloonToolbarProps } = props;

  const editor = useMyPlateEditorRef();

  const arrow = false;
  const theme = "light";

  const buttons = [
    {
      type: MARK_BOLD,
      icon: <Bold />,
      tooltip: { content: "Bold (⌘+B)", ...markTooltip },
      actionHandler: "onMouseDown",
    },
    // italic
    {
      type: MARK_ITALIC,
      icon: <Italic />,
      tooltip: { content: "Italic (⌘+I)", ...markTooltip },
      actionHandler: "onMouseDown",
    },
    // underline
    {
      type: MARK_UNDERLINE,
      icon: <Underline />,
      tooltip: { content: "Underline (⌘+U)", ...markTooltip },
      actionHandler: "onMouseDown",
    },
    // h1
    {
      type: ELEMENT_H1,
      icon: "H1",
      tooltip: { content: "H1", ...markTooltip },
      actionHandler: "onKeyDown",
    },
    {
      type: ELEMENT_H2,
      icon: "H2",
      tooltip: { content: "H2", ...markTooltip },
      actionHandler: "onKeyDown",
    },
  ];

  return (
    <>
      {buttons.map(button => (
        <ToolbarButton
          // @ts-ignore
          type={getPluginType(editor, button.type)}
          icon={button.icon}
          // tooltip={button.tooltip}
        />
      ))}
      {children}
    </>
  );
};
