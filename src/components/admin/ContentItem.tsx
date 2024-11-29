"use client";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";
import { updateContent } from "@/firebase";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import { generateDescription } from "../../../utils/generateDescription";
import { EditorProps } from "react-draft-wysiwyg";
import { generateSalary } from "../../../utils/generateSalary";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function ContentItem({ data }: { data: any }) {
  const [lead, setLead] = useState<any>(data);
  const [description, setDescription] = useState<any>();
  const [salary, setSalary] = useState<any>();
  useEffect(() => {
    let contentBlock;
    if (typeof lead?.description === "string") {
      contentBlock = htmlToDraft(lead?.description);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      setDescription(EditorState.createWithContent(contentState));
    } else {
      setDescription("");
    }
  }, [lead]);
  useEffect(() => {
    let contentBlock;
    if (typeof lead?.salary === "string") {
      contentBlock = htmlToDraft(lead?.salary);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      setSalary(EditorState.createWithContent(contentState));
    } else {
      setSalary("");
    }
  }, [lead]);
  return (
    <li className="bg-[#126b91] p-3  !text-white font-gotham font-light">
      <h2 className="text-2xl font-semibold mb-2">{lead?.title}</h2>
      <div className="flex flex-col w-full">
        <div className="hidden">
          <b>Opis stanowiska</b>
          <Editor
            editorStyle={{
              backgroundColor: "rgb(148 163 184)",
              color: "black",
              height: "300px",
              padding: "3px 15px",
            }}
            editorState={description}
            onEditorStateChange={setDescription}
          />
        </div>
        <b>Zarobki</b>
        <Editor
          editorStyle={{
            backgroundColor: "rgb(148 163 184)",
            color: "black",
            height: "300px",
            padding: "3px 15px",
          }}
          editorState={salary}
          onEditorStateChange={setSalary}
        />
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              const id = toast.loading("Zapisywanie...");
              const content = draftToHtml(
                convertToRaw(description.getCurrentContent())
              );
              const salaryContent = draftToHtml(
                convertToRaw(salary.getCurrentContent())
              );
              updateContent(polishToEnglish(lead.title), {
                ...lead,
                description: content,
                salary: salaryContent,
              }).then(() => {
                toast.update(id, {
                  render: "Sukces",
                  type: "success",
                  isLoading: false,
                  autoClose: 2000,
                });
              });
            }}
            className="bg-green-600 hover:bg-green-700 mt-3  py-3 w-full"
          >
            Zapisz
          </button>
          <button
            onClick={() => {
              const id = toast.loading("Generowanie...");
              generateDescription(lead).then((res) => {
                let contentBlock;

                contentBlock = htmlToDraft(res.choices[0].text);
                const contentState = ContentState.createFromBlockArray(
                  contentBlock.contentBlocks
                );
                setDescription(EditorState.createWithContent(contentState));

                toast.update(id, {
                  render: "Sukces",
                  type: "success",
                  isLoading: false,
                  autoClose: 2000,
                });
              });
            }}
            className="hidden bg-purple-600 hover:bg-purple-700 mt-3  py-3 w-full"
          >
            Generuj opis
          </button>
          <button
            onClick={() => {
              const id = toast.loading("Generowanie...");
              generateSalary(lead).then((res) => {
                let contentBlock;
                contentBlock = htmlToDraft(res.choices[0].text);
                const contentState = ContentState.createFromBlockArray(
                  contentBlock.contentBlocks
                );
                setSalary(EditorState.createWithContent(contentState));
                toast.update(id, {
                  render: "Sukces",
                  type: "success",
                  isLoading: false,
                  autoClose: 2000,
                });
              });
            }}
            className="bg-purple-600 hover:bg-purple-700 mt-3 py-3 w-full"
          >
            Generuj zarobki
          </button>
        </div>
      </div>
    </li>
  );
}
