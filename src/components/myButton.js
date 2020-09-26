import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";

function MyButton({ children, onClick, btnClassName, tipClassName, tip }) {
  return (
    <Tooltip title={tip} className={tipClassName}>
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  );
}

export default MyButton;
