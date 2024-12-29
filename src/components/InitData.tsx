"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function InitData({
  posts,
  services,
}: {
  posts: any;
  services: any;
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "posts/setPosts", payload: posts });
    dispatch({ type: "services/setServices", payload: services });
  }, []);
  return <div></div>;
}
