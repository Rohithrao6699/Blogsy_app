export function Paginate({ npages, paginate }) {
  const pages = [];
  for (let i = 1; i <= npages; i++) {
    pages.push(i);
  }
  return (
    <>
      {pages.map((number) => (
        <p key={number}>
          <a href="#" onClick={() => paginate(number)}>
            {number}
          </a>
        </p>
      ))}
    </>
  );
}
