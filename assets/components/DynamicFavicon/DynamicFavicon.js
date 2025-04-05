"use client";

import { useEffect, useState } from "react";

export default function DynamicFavicon() {
  const [favIconIndex, setFavIconIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFavIconIndex((prevIndex) => (prevIndex % 4) + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const link = document.querySelector("link[rel='icon']");
    if (link) {
      link.href = `/favicons/favicon-${favIconIndex}.ico`;
    }
  }, [favIconIndex]);

  return null;
}
