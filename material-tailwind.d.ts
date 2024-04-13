declare module "@material-tailwind/react/*";

declare module "@material-tailwind/react" {
  interface IconButtonProps extends React.ComponentProps<"button"> {
    children?;
  }
  interface DialogProps extends React.ComponentProps<"div"> {
    handler?;
    children?;
  }
  interface ButtonProps extends React.ComponentProps<"button">  {
    children?;
  }
}
