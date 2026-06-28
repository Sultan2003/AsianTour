import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { normalizePathname } from "../../seo/canonical";

const CanonicalRedirect = () => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const canonicalPathname = normalizePathname(pathname);

    if (canonicalPathname !== pathname) {
      navigate(`${canonicalPathname}${search}${hash}`, { replace: true });
    }
  }, [hash, navigate, pathname, search]);

  return null;
};

export default CanonicalRedirect;
