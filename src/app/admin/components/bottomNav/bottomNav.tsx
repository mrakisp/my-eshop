"use client";

import { Paper } from "@mui/material";

interface BottomNavProps {
  children: React.ReactNode;
}
export default function BottomNav(props: BottomNavProps) {
  const { children } = props;
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9 }}
      elevation={3}
    >
      {children}
    </Paper>
  );
}
