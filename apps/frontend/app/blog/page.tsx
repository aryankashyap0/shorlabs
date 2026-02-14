import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>Blog</h1>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <article key={post.slug} style={{ marginBottom: 32 }}>
          <Link
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
              {post.title}
            </h2>
            <p style={{ color: "#888", fontSize: 14, marginBottom: 4 }}>
              {post.date} · {post.author}
            </p>
            <p style={{ fontSize: 16 }}>{post.summary}</p>
          </Link>
        </article>
      ))}
    </div>
  );
}
