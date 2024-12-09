"use client";

export interface ViewerProps {
  value: string;
}

export default function Viewer(props: ViewerProps) {
  return (
    <div
      className="min-w-full prose lg:prose-lg prose-headings:text-black prose-em:text-black prose-strong:text-black prose-ul:text-black prose-ol:text-black prose-blockquote:text-black prose-a:text-black prose-code:text-black  prose-table:text-black prose-li:text-black !text-black prose-invert"
      dangerouslySetInnerHTML={{ __html: props.value }}
    />
  );
}
