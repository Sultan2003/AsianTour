import { useEffect, useState } from "react";

export default function TranslateWidget({
  buttonClassName,
  buttonContent = "Translate",
  buttonStyle,
  onOpen,
}) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const hideBar = () => {
      const selectors = [
        ".goog-te-banner-frame",
        ".goog-te-balloon-frame",
        "#goog-gt-tt",
        ".goog-text-highlight",
      ];
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          el.style.display = "none";
          el.style.visibility = "hidden";
        });
      });
      document.body.style.top = "0px";
    };
    const interval = setInterval(hideBar, 1000);
    hideBar();
    return () => clearInterval(interval);
  }, []);

  const handleTranslateClick = () => {
    const translateDiv = document.getElementById("google_translate_element");
    if (!translateDiv) return;

    if (translateDiv.style.display === "block") {
      translateDiv.style.display = "none";
      return;
    }

    translateDiv.style.display = "block";
    onOpen?.();

    if (window.google?.translate?.TranslateElement) {
      if (!translateDiv.querySelector(".goog-te-combo")) {
        window.googleTranslateElementInit?.();
      }
      return;
    }

    if (!scriptLoaded && !document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
      setScriptLoaded(true);
    }
  };

  useEffect(() => {
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element",
      );

      const observer = new MutationObserver(() => {
        const langSelect = document.querySelector(".goog-te-combo");
        if (langSelect && !langSelect.dataset.listenerAdded) {
          langSelect.dataset.listenerAdded = "true";
          langSelect.addEventListener("change", () => {
            const selectedLang = langSelect.value;
            localStorage.setItem("selectedLang", selectedLang);
            setTimeout(() => {
              const translateDiv = document.getElementById(
                "google_translate_element",
              );
              if (translateDiv) translateDiv.style.display = "none";
            }, 800);
          });
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    };
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLang");
    if (savedLang && savedLang !== "en") {
      const interval = setInterval(() => {
        const langSelect = document.querySelector(".goog-te-combo");
        if (langSelect) {
          langSelect.value = savedLang;
          langSelect.dispatchEvent(new Event("change"));
          clearInterval(interval);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <>
      <button
        id="translateButton"
        type="button"
        className={buttonClassName}
        onClick={handleTranslateClick}
        style={
          buttonStyle ??
          (buttonClassName
            ? undefined
            : {
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "white",
                textDecoration: "none",
                flexShrink: 0,
                fontSize: isMobile ? "19px" : "18px",
                fontWeight: "600",
                padding: 0,
              })
        }
      >
        {buttonContent}
      </button>

      <div
        id="google_translate_element"
        style={{
          display: "none",
          position: "fixed",
          top: "3px",
          left: "5px",
          background: "#ffffff",
          padding: "8px 10px",
          borderRadius: "10px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          zIndex: 10000,
          animation: "fadeIn 0.3s ease",
        }}
      ></div>
    </>
  );
}
