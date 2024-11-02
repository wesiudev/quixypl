import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

export interface ViewerProps {
  value: string;
}

export default function Viewer(props: ViewerProps) {
  const [htmlString, setHtmlString] = useState("");

  useEffect(() => {
    remark()
      .use(html)
      .process(props.value)
      .then((file) => {
        setHtmlString(file.toString());
      });
  }, [props.value]);

  return (
    <div
      className="prose prose-headings:text-black prose-em:text-black prose-strong:text-black prose-ul:text-black prose-ol:text-black prose-blockquote:text-black prose-a:text-black prose-code:text-black  prose-table:text-black prose-li:text-black !text-black prose-invert"
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
}
