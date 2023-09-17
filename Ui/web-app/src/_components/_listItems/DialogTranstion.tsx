import * as React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Slide } from "@mui/material";

export const DialogTransitionUp = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
