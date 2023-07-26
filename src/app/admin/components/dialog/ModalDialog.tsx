"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  // DialogActions,
  // Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

export interface DialogTitleProps {
  children?: React.ReactNode;
  title: string;
  open: boolean;
  handleCloseDialog: () => void;
}

export default function ModalDialog(props: DialogTitleProps) {
  const { children, title, open, handleCloseDialog } = props;

  return (
    <Dialog onClose={handleCloseDialog} open={open} keepMounted={false}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {title}
        <IconButton sx={{ marginLeft: "auto" }} onClick={handleCloseDialog}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ minWidth: "600px" }}>
        {children}
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleCloseDialog}>Save</Button>
      </DialogActions> */}
    </Dialog>
  );
}
