import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttractionDetails from "../../components/AttractionDetails";
import { fetchAttractionBySlug } from "../../api/attractions";

export default function AttractionDetailsPage() {
  const { slug } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    fetchAttractionBySlug(slug)
      .then((item) => mounted && setAttraction(item))
      .catch(() => mounted && setAttraction(null))
      .finally(() => mounted && setIsLoading(false));
    return () => {
      mounted = false;
    };
  }, [slug]);

  return <AttractionDetails attraction={attraction} isLoading={isLoading} />;
}
