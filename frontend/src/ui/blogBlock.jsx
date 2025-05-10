export function BlogBlock({ id, title, content, author, handleGetAuthor }) {
  return (
    <div>
      <img />
      <p>{author}</p>
      <h2>{title}</h2>
      <body>{content}</body>
    </div>
  );
}
{
  /* <ul key={blog._id}>
          <li>{blog.title}</li>
          <li>{blog.content}</li>
          <p>
            <b onClick={() => handleGetAuthor(blog.userId._id)}>author: </b>
            {blog.userId.name}
          </p>
        </ul> */
}
