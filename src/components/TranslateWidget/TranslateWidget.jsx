import { useCallback, useEffect, useState } from "react";

const TRANSLATE_ELEMENT_ID = "google_translate_element";
const SCRIPT_ID = "google-translate-script";

const setGoogleTranslateCookie = (language) => {
  const value = language && language !== "en" ? `/en/${language}` : "/en/en";
  const expires = "expires=Fri, 31 Dec 9999 23:59:59 GMT";

  document.cookie = `googtrans=${value}; path=/; ${expires}`;
  document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}; ${expires}`;
};

export default function TranslateWidget({
  buttonClassName,
  buttonContent = "Translate",
  buttonStyle,
  onOpen,
  targetLanguage,
  hideButton = false,
  renderElement = true,
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

  const ensureTranslateScript = useCallback(() => {
    const translateDiv = document.getElementById(TRANSLATE_ELEMENT_ID);
    if (!translateDiv) return false;

    if (window.google?.translate?.TranslateElement) {
      if (!translateDiv.querySelector(".goog-te-combo")) {
        window.googleTranslateElementInit?.();
      }
      return true;
    }

    if (!scriptLoaded && !document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
      setScriptLoaded(true);
    }

    return true;
  }, [scriptLoaded]);

  const applyLanguage = useCallback((language) => {
    if (!language) return;

    localStorage.setItem("selectedLang", language);
    setGoogleTranslateCookie(language);
    ensureTranslateScript();

    const interval = setInterval(() => {
      const langSelect = document.querySelector(".goog-te-combo");
      if (langSelect) {
        langSelect.value = language;
        langSelect.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
    }, 400);

    setTimeout(() => clearInterval(interval), 8000);
  }, [ensureTranslateScript]);

  const handleTranslateClick = () => {
    const translateDiv = document.getElementById(TRANSLATE_ELEMENT_ID);
    if (!translateDiv) return;

    if (translateDiv.style.display === "block") {
      translateDiv.style.display = "none";
      return;
    }

    translateDiv.style.display = "block";
    onOpen?.();
    ensureTranslateScript();
  };

  useEffect(() => {
    window.googleTranslateElementInit = function () {
      const translateDiv = document.getElementById(TRANSLATE_ELEMENT_ID);
      if (!translateDiv || translateDiv.querySelector(".goog-te-combo")) return;

      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        TRANSLATE_ELEMENT_ID,
      );

      const observer = new MutationObserver(() => {
        const langSelect = document.querySelector(".goog-te-combo");
        if (langSelect && !langSelect.dataset.listenerAdded) {
          langSelect.dataset.listenerAdded = "true";
          langSelect.addEventListener("change", () => {
            const selectedLang = langSelect.value || "en";
            localStorage.setItem("selectedLang", selectedLang);
            setGoogleTranslateCookie(selectedLang);
            setTimeout(() => {
              const translateElement = document.getElementById(
                TRANSLATE_ELEMENT_ID,
              );
              if (translateElement) translateElement.style.display = "none";
            }, 800);
          });
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    };
  }, []);

  useEffect(() => {
    const savedLang = targetLanguage || localStorage.getItem("selectedLang");
    if (savedLang) {
      applyLanguage(savedLang);
    }
  }, [applyLanguage, targetLanguage]);

  return (
    <>
      {!hideButton && (
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
      )}

      {renderElement && (
        <div
          id={TRANSLATE_ELEMENT_ID}
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
      )}
    </>
  );
}
