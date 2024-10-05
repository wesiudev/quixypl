export default function Opportunities({ children }: { children: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-4 font-coco">
      {children}
    </div>
  );
}
