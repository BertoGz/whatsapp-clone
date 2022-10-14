import React, { useState, useRef } from "react";

import { InputBase, Typography } from "@mui/material";

const ENTER_KEY_CODE = 13;
const DEFAULT_LABEL_PLACEHOLDER = "Click To Edit";
let inputRef2 = null as any;
const EditableLabel = ({
  onFocus = () => {},
  onBlur = () => {},
  multiline = false,
  setValue,
  value,
  placeholder,
  color = "default",
  fontSize = 16,
  canEdit = true,
  ...props
}: {
  multiline?: boolean;
  color?: "gray" | "default";
  onFocus: any;
  onBlur: any;
  setValue: any;
  placeholder?: any;
  value: any;
  fontSize?: number;
  canEdit?: boolean;
}) => {
  const [isEditing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);

  const isTextValueValid = () =>
    typeof value !== "undefined" && value.trim().length > 0;

  const handleFocus = () => {
    const fn = isEditing ? onBlur : onFocus;
    fn(value);
    handleEditState();
  };

  const handleChange = (e: any) => {
    setValue(inputRef.current.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      handleEnterKey();
    }
  };

  const handleEditState = () => {
    if (!isTextValueValid()) return;
    setEditing((prev) => !prev);
  };

  const handleEnterKey = () => {
    handleFocus();
  };
  const labelText = isTextValueValid()
    ? value
    : placeholder || DEFAULT_LABEL_PLACEHOLDER;
  if (isEditing) {
    return (
      <InputBase
        inputProps={{
          ref: inputRef,
          value,
          placeholder,
        }}
        onChange={handleChange}
        onBlur={handleFocus}
        onKeyDown={handleKeyDown}
        autoFocus
        sx={{
          fontSize,
          flexShrink: 1,
          height: multiline ? undefined : 25,
          outline: "1",
          outlineStyle: "solid",
        }}
        multiline={multiline}
      />
    );
  }
  const useColor = color === "gray" ? "GrayText" : undefined;

  console.log("inputref2", inputRef2);
  return (
    <InputBase
      color="secondary"
      onFocus={() => {
        if (canEdit) {
          setEditing(true);
        }
      }}
      onBlur={() => {
        //inputRef2.placeholder = "caca2";
      }}
      multiline={multiline}
      sx={{
        fontSize,
        color,
        flexShrink: 1,
        height: multiline ? undefined : 25,
      }}
      value={labelText}
      type="text"
    />
  );
};

export default EditableLabel;
