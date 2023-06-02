import React, { ReactNode } from "react";
import Bold from "ui/icons/Bold";
import Italic from "ui/icons/Italic";
import Underline from "ui/icons/Underline";
import TippyProps from "@tippyjs/react";
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
  ELEMENT_H3,
} from "@udecode/plate";
import { useMyPlateEditorRef } from "./plateTypes";

export const markTooltip = {
  arrow: true,
  delay: 0,
  duration: [200, 0],
  hideOnClick: false,
  offset: [0, 17],
  placement: "top",
};

export const FloatingEditorToolbar = (props: WithPartial<BalloonToolbarProps, "children">) => {
  const { children, ...balloonToolbarProps } = props;

  const editor = useMyPlateEditorRef();

  const arrow = false;
  const theme = "light";

  const actions = [
    {
      type: MARK_BOLD,
      icon: <Bold />,
      tooltip: { content: "Bold (⌘+B)", ...markTooltip },
      component: MarkToolbarButton,
    },
    // italic
    {
      type: MARK_ITALIC,
      icon: <Italic />,
      tooltip: { content: "Italic (⌘+I)", ...markTooltip },
      component: MarkToolbarButton,
    },
    // underline
    {
      type: MARK_UNDERLINE,
      icon: <Underline />,
      tooltip: { content: "Underline (⌘+U)", ...markTooltip },
      component: MarkToolbarButton,
    },
    // h1
    {
      type: ELEMENT_H1,
      icon: "H1",
      tooltip: { content: "H1", ...markTooltip },
      component: BlockToolbarButton,
    },
    {
      type: ELEMENT_H2,
      icon: "H2",
      tooltip: { content: "H2", ...markTooltip },
      component: BlockToolbarButton,
    },
    {
      type: ELEMENT_H3,
      icon: "H3",
      tooltip: { content: "H3", ...markTooltip },
      component: BlockToolbarButton,
    },
  ];

  return (
    <BalloonToolbar theme={theme} arrow={arrow} {...balloonToolbarProps}>
      {actions.map(action => (
        <action.component
          type={getPluginType(editor, action.type)}
          icon={action.icon}
          // @ts-ignore
          tooltip={action.tooltip}
          actionHandler="onMouseDown"
        />
      ))}
      {children}
    </BalloonToolbar>
  );
};
