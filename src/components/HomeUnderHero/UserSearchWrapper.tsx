"use client";
export default function UserSearchWrapper({ children }: { children: any }) {
  return (
    <div className="mx-4 sm:mx-8 lg:mx-12 2xl:mx-[15vw] py-12 h-max">
      {children}
    </div>
  );
}
