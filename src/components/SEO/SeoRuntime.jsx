import { useEffect } from "react";

const SeoRuntime = () => {
  useEffect(() => {
    const applyImageAttributes = (root = document) => {
      root.querySelectorAll("img").forEach((image, index) => {
        if (!image.hasAttribute("decoding")) image.setAttribute("decoding", "async");
        if (!image.hasAttribute("loading") && index > 0) image.setAttribute("loading", "lazy");
      });
    };

    applyImageAttributes();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;

          if (node.tagName === "IMG") {
            applyImageAttributes(node.parentElement || document);
            return;
          }

          applyImageAttributes(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default SeoRuntime;
