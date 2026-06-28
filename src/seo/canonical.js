export const SITE_URL = "https://www.gotocentralasia.com";

const aliases = {
  "/asian-tour-transfer": "/transfer",
  "/caucas-tours": "/caucasus-tours",
};

export const normalizePathname = (pathname = "/") => {
  const withoutTrailingSlash = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const lowercasePathname = withoutTrailingSlash.toLowerCase() || "/";

  return aliases[lowercasePathname] || lowercasePathname;
};

export const getCanonicalUrl = (pathname = "/") => {
  const normalizedPathname = normalizePathname(pathname);

  return `${SITE_URL}${normalizedPathname === "/" ? "" : normalizedPathname}`;
};
