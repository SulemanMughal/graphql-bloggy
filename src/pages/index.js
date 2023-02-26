// import Head from "next/head";
// import Image from "next/image";
import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";

// BlogCard;

import { GraphQLClient, gql } from "graphql-request";
import { useState } from "react";
import BlogCard from "@/components/BlogCard";
// import { getPageStaticInfo } from "next/dist/build/analysis/get-page-static-info";

const gqlcms = new GraphQLClient(
  "https://ap-northeast-1.cdn.hygraph.com/content/clegfoydm0r2f01t51zk9djtt/master"
);

const QUERY = gql`
  {
    posts {
      slug
      id
      title
      updatedAt
      content {
        html
        text
      }
      coverPhoto {
        id
        url
      }
      author {
        name
        avatar {
          id
          url
        }
      }
    }
  }
`;

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  const { posts } = await gqlcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10, // In seconds
  };
}

export default function Home({ posts }) {
  const [post, setPost] = useState([]);
  // console.debug(posts);

  return (
    <>
      <main className="container">
        {posts.map((post) => (
          <BlogCard
            coverPhoto={post.coverPhoto}
            key={post.id}
            content={post.content}
            author={post.author}
            post={post}
            slug={post.slug}
          />
        ))}
      </main>
    </>
  );
}
