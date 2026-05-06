import { useEffect } from "react";
import type { FC } from "react";

type BlogSeoProps = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

const setMetaContent = (selector: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    if (selector.includes("property=")) {
      element.setAttribute("property", selector.match(/"([^"]+)"/)?.[1] ?? "");
    } else {
      element.setAttribute("name", selector.match(/"([^"]+)"/)?.[1] ?? "");
    }
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

export const BlogSeo: FC<BlogSeoProps> = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
}) => {
  useEffect(() => {
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', ogTitle ?? title);
    setMetaContent(
      'meta[property="og:description"]',
      ogDescription ?? description,
    );
    if (ogImage) setMetaContent('meta[property="og:image"]', ogImage);
  }, [description, ogDescription, ogImage, ogTitle, title]);

  return null;
};
