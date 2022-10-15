import React, { useState, useRef, useEffect } from "react";

import { InputBase } from "@mui/material";

const ENTER_KEY_CODE = 13;

const EditableLabel = ({
  onFocus = () => {},
  onBlur = () => {},
  multiline = false,
  placeholder,
  color = "default",
  fontSize = 16,
  canEdit = true,
  initialVal='',
  ...props
}: {
  multiline?: boolean;
  color?: "gray" | "default";
  onFocus: any;
  onBlur: any;
  placeholder?: any;
  fontSize?: number;
  canEdit?: boolean;
  initialVal?:string;
}) => {
  const [value,setValue]=useState(initialVal)
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
  useEffect(() => {
    setEditing(false);
    setValue(initialVal)
    //inputRef.current = null;
  }, [initialVal]);
  const labelText = value
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


  return (
    <InputBase
    key={value}
      color="secondary"
      onFocus={() => {
        if (canEdit) {
          setEditing(true);
        }
      }}
      onBlur={() => {

      }}
      multiline={multiline}
      sx={{
        fontSize,
        color,
        flexShrink: 1,
        height: multiline ? undefined : 25,
      }}
      value={labelText}
      placeholder={placeholder}
      type="text"
    />
  );
};

export default EditableLabel;
