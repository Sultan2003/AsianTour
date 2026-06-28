export const SITE_URL = "https://www.gotocentralasia.com";
export const RUSSIAN_PREFIX = "/rus";

const aliases = {
  "/asian-tour-transfer": "/transfer",
  "/caucas-tours": "/caucasus-tours",
};

export const splitLocalePathname = (pathname = "/") => {
  const cleanPathname = pathname || "/";
  const isRussian = cleanPathname === RUSSIAN_PREFIX || cleanPathname.startsWith(`${RUSSIAN_PREFIX}/`);
  const unprefixedPathname = isRussian
    ? cleanPathname.replace(/^\/rus(?=\/|$)/, "") || "/"
    : cleanPathname;

  return {
    isRussian,
    localePrefix: isRussian ? RUSSIAN_PREFIX : "",
    pathname: unprefixedPathname || "/",
  };
};

export const withRussianPrefix = (pathname = "/") => {
  const { pathname: unprefixedPathname } = splitLocalePathname(pathname);
  return unprefixedPathname === "/" ? RUSSIAN_PREFIX : `${RUSSIAN_PREFIX}${unprefixedPathname}`;
};

export const normalizePathname = (pathname = "/") => {
  const { isRussian, pathname: localeFreePathname } = splitLocalePathname(pathname);
  const withoutTrailingSlash =
    localeFreePathname.length > 1 ? localeFreePathname.replace(/\/+$/, "") : localeFreePathname;
  const lowercasePathname = withoutTrailingSlash.toLowerCase() || "/";
  const normalizedLocaleFreePathname = aliases[lowercasePathname] || lowercasePathname;

  if (!isRussian) return normalizedLocaleFreePathname;

  return normalizedLocaleFreePathname === "/" ? `${RUSSIAN_PREFIX}/` : withRussianPrefix(normalizedLocaleFreePathname);
};

export const getAlternateUrls = (pathname = "/") => {
  const { pathname: localeFreePathname } = splitLocalePathname(normalizePathname(pathname));
  const englishPathname = localeFreePathname === "/" ? "" : localeFreePathname;
  const russianPathname = withRussianPrefix(localeFreePathname);
  const russianUrlPathname = russianPathname === RUSSIAN_PREFIX ? `${RUSSIAN_PREFIX}/` : russianPathname;

  return {
    en: `${SITE_URL}${englishPathname}`,
    ru: `${SITE_URL}${russianUrlPathname}`,
    xDefault: `${SITE_URL}${englishPathname}`,
  };
};

export const getCanonicalUrl = (pathname = "/") => {
  const normalizedPathname = normalizePathname(pathname);

  return `${SITE_URL}${normalizedPathname === "/" ? "" : normalizedPathname}`;
};
