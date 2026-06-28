import { Link, useParams } from "react-router-dom";
import { getSeoBlogPost, seoBlogPosts } from "../../seo/staticSeoPages";

const BlogArticle = () => {
  const { slug } = useParams();
  const post = getSeoBlogPost(slug);

  if (!post) {
    return (
      <article style={{ maxWidth: "960px", margin: "0 auto", padding: "64px 20px" }}>
        <h1>Central Asia Travel Guides</h1>
        <p>Choose one of our destination guides below.</p>
        <ul>
          {seoBlogPosts.map((article) => (
            <li key={article.slug}>
              <Link to={`/blog/${article.slug}`}>{article.h1}</Link>
            </li>
          ))}
        </ul>
      </article>
    );
  }

  return (
    <article style={{ maxWidth: "960px", margin: "0 auto", padding: "64px 20px", lineHeight: 1.75 }}>
      <p style={{ textTransform: "uppercase", letterSpacing: "0.12em", color: "#b7791f", fontWeight: 700 }}>
        Destination guide
      </p>
      <h1>{post.h1}</h1>
      <p>{post.description}</p>
      {post.sections.map(([heading, text]) => (
        <section key={heading}>
          <h2>{heading}</h2>
          <p>{text}</p>
        </section>
      ))}
    </article>
  );
};

export default BlogArticle;
