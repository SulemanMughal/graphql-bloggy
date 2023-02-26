import Link from "next/link";

export default function BlogCard({ coverPhoto, content, author, post }) {
  // console.debug(post.slug);
  return (
    <div classNameName="card">
      <div className="card">
        <div className="card__header">
          <img
            src={coverPhoto.url}
            alt="card__image"
            className="card__image"
            width="600"
          />
        </div>
        <div className="card__body">
          <Link href={"/posts/" + post.slug}>
            <h4>{post.title}</h4>
          </Link>
          <p className="truncate">{content.text}</p>
        </div>
        <div className="card__footer">
          <div className="user">
            <img
              src={author.avatar.url}
              alt="user__image"
              className="user__image"
            />
            <div className="user__info">
              <h5>{author.name}</h5>
              <small>{post.updatedAt}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
