"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import {
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import "react-quill/dist/quill.snow.css";
import styles from "./wysiwgEditor.module.scss";

interface WysiwygTextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

const WysiwygEditor: React.FC<WysiwygTextFieldProps> = ({
  label,
  value,
  onChange,
  error = false,
}) => {
  const [editorState, setEditorState] = useState(value);

  const handleEditorChange = (content: string) => {
    setEditorState(content);
    onChange(content); // Pass the updated content to the parent component
  };

  useEffect(() => {
    if (!value) {
      setEditorState("");
    } else {
      setEditorState(value);
    }
  }, [value]);

  return (
    <>
      <InputLabel sx={{ margin: "10px 0" }}>{label}</InputLabel>
      <FormControl fullWidth error={error}>
        <ReactQuill
          className={styles.editor}
          value={editorState}
          onChange={handleEditorChange}
          theme="snow"

          // modules={{
          //     toolbar: [
          //       ['bold', 'italic', 'underline', 'strike'], // inline styles
          //       ['blockquote', 'code-block'], // blocks
          //       [{ header: 1 }, { header: 2 }], // custom header values
          //       [{ list: 'ordered' }, { list: 'bullet' }], // lists
          //       [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          //       [{ indent: '-1' }, { indent: '+1' }], // indentation
          //       [{ direction: 'rtl' }], // text direction
          //       [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          //       [{ header: [1, 2, 3, 4, 5, 6, false] }], // header dropdown
          //       [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          //       [{ font: [] }], // font family
          //       [{ align: [] }], // text alignment
          //       ['clean'], // remove formatting
          //     ],
          //   }}
        />
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default WysiwygEditor;
