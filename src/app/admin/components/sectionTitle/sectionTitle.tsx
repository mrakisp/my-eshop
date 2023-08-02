"use client";
import { Paper, Typography } from "@mui/material";

interface SectionTitleProps {
  title: string;
  rightArea?: JSX.Element;
}
export default function SectionTitle({ title, rightArea }: SectionTitleProps) {
  return (
    <Paper
      // variant="outlined"
      sx={{
        padding: "5px 25px",
        margin: "20px 0 25px 0",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#bcdeff",
      }}
    >
      <Typography variant="h6">{title}</Typography>
      {rightArea && rightArea}
    </Paper>
  );
}
