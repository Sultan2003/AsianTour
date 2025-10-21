import { useEffect, useState } from "react";

export default function TranslateWidget() {
  const [visible, setVisible] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Scroll visibility logic
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setVisible(scrollTop >= 0 && scrollTop <= 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Hide Google banner and other elements constantly
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
    if (translateDiv.style.display === "block") {
      translateDiv.style.display = "none";
      return;
    }
    translateDiv.style.display = "block";

    if (!scriptLoaded) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
      setScriptLoaded(true);
    }
  };

  // Initialize Google Translate widget
  window.googleTranslateElementInit = function () {
    new window.google.translate.TranslateElement(
      { pageLanguage: "en" },
      "google_translate_element"
    );

    const observer = new MutationObserver(() => {
      const langSelect = document.querySelector(".goog-te-combo");
      if (langSelect && !langSelect.dataset.listenerAdded) {
        langSelect.dataset.listenerAdded = "true";
        langSelect.addEventListener("change", () => {
          const selectedLang = langSelect.value;
          localStorage.setItem("selectedLang", selectedLang);
          setTimeout(() => {
            document.getElementById("google_translate_element").style.display =
              "none";
          }, 800);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  // Restore previously saved language
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
        onClick={handleTranslateClick}
        style={{
          position: "fixed",
          top: "3px",
          right: "5px",
          background: "#9bc8a4",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          padding: "3px 12px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          transition: "opacity 0.3s ease",
          zIndex: 1000,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        🌐 Translate
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
          zIndex: 1000,
          animation: "fadeIn 0.3s ease",
        }}
      ></div>
    </>
  );
}
