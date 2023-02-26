import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";
import { useState } from "react";
import BlogCard from "@/components/BlogCard";
const gqlcms = new GraphQLClient(
  "https://ap-northeast-1.cdn.hygraph.com/content/clegfoydm0r2f01t51zk9djtt/master"
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
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

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await gqlcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await gqlcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10, // In seconds
  };
}

export default function BlogPost({ post }) {
  //   console.debug(post);
  //   return <p>{post.title}</p>;
  return (
    <>
      <main className="container">
        <div classNameName="card ">
          <div className="card w-80 m-auto">
            <div className="card__header">
              <img
                src={post.coverPhoto.url}
                alt="card__image"
                className="card__image"
              />
            </div>
            <div className="card__body">
              <Link href={"/posts/" + post.slug}>
                <h4>{post.title}</h4>
              </Link>
              <p>{post.content.text}</p>
            </div>
            <div className="card__footer">
              <div className="user">
                <img
                  src={post.author.avatar.url}
                  alt="user__image"
                  className="user__image_2"
                />
                <div className="user__info">
                  <h5>{post.author.name}</h5>
                  <small>{post.updatedAt}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
