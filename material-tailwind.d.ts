import React from "react";

declare module "@material-tailwind/react/*" {
  interface IconButtonProps extends React.ComponentProps<"button"> {
    children?;
  }

  interface DialogProps extends React.ComponentProps<"div"> {
    handler?: any;
  }

  interface ButtonProps extends React.ComponentProps<"button"> {
    children?;
  }
}
