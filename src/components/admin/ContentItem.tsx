"use client";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";
import { updateContent, updateDocument } from "@/firebase";
import { render } from "@react-three/fiber";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import { generateDescription } from "../../../utils/generateDescription";
import { EditorProps } from "react-draft-wysiwyg";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function ContentItem({ data }: { data: any }) {
  const [lead, setLead] = useState<any>(data);
  const [description, setDescription] = useState<any>();
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
  return (
    <li className="bg-slate-700 p-3 rounded-md !text-white font-gotham font-light">
      <h2 className="text-2xl font-semibold mb-2">{lead?.title}</h2>
      <p>
        <b>Mianownik:</b> {lead?.nominative}
      </p>
      <p>
        <b>Celownik:</b> {lead?.dative}
      </p>
      <p>
        <b>Narzędnik:</b> {lead?.instrumental}
      </p>
      <p>
        <b>Synonimy:</b> {lead?.synonyms.join(", ")}
      </p>
      <p>
        <b>Tytuł nieformalny (l. pojedyncza):</b>{" "}
        {lead?.informal_title_singular}
      </p>
      <p>
        <b>Tytuł nieformalny (l. mnoga):</b> {lead?.informal_title_plural}
      </p>
      <p>
        <b>Dopełniacz:</b> {lead?.genitive}
      </p>
      <div className="flex flex-col w-full">
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
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              const id = toast.loading("Zapisywanie...");
              const content = draftToHtml(
                convertToRaw(description.getCurrentContent())
              );
              updateContent(polishToEnglish(lead.title), {
                ...lead,
                description: content,
              }).then(() => {
                toast.update(id, {
                  render: "Sukces",
                  type: "success",
                  isLoading: false,
                  autoClose: 2000,
                });
              });
            }}
            className="bg-green-600 hover:bg-green-700 mt-3 rounded-md py-3 w-full"
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
            className="bg-purple-600 hover:bg-purple-700 mt-3 rounded-md py-3 w-full"
          >
            Generuj opis
          </button>
        </div>
      </div>
    </li>
  );
}
