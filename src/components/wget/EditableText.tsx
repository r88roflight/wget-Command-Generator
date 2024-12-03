import React, { useState, useEffect, useRef } from "react";

interface EditableTextProps {
  text: string;
  className?: string;
  onSave: (newText: string) => void;
}

export const EditableText = ({ text, className = "", onSave }: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editedText.trim() !== "") {
      onSave(editedText);
    } else {
      setEditedText(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`bg-black border border-white/20 rounded px-2 py-1 text-white ${className}`}
      />
    );
  }

  return (
    <span onDoubleClick={handleDoubleClick} className={`cursor-pointer ${className}`}>
      {text}
    </span>
  );
};