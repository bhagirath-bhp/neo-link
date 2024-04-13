declare module "@material-tailwind/react/*" {
  interface IconButtonProps extends React.ComponentProps<"button"> {
    children?;
  }
  interface DialogProps extends React.ComponentProps<"div"> {
    handler?;
  }
  interface ButtonProps extends React.ComponentProps<"button">  {
    children?;
  }
}