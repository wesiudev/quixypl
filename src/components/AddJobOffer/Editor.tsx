"use client";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import dynamic from "next/dynamic";

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface EditorProps {
  value?: any;
  onChange?: (changes: EditorContentChanged) => void;
  setSource?: any;
  source?: any;
  setChangesWereMade: any;
}
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["clean"],
];

export default function Editor(props: EditorProps) {
  const [value, setValue] = useState<string>(props.value);

  const onChange = (value: string) => {
    props.setChangesWereMade(true);
    setValue(value);
    if (props.source) {
      props.setSource({ ...props.source, description: value });
    }
  };

  return (
    <ReactQuill
      theme="snow"
      placeholder="Wpisz tekst"
      className="text-black"
      modules={{
        toolbar: {
          container: TOOLBAR_OPTIONS,
        },
      }}
      value={value}
      onChange={onChange}
    />
  );
}
