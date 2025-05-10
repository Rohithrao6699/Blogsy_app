import { usePaginationStore } from "../storeZustand/PaginationStore";

export function Paginate() {
  const totalPages = usePaginationStore((state) => state.totalPages);
  const setcurrentPage = usePaginationStore((state) => state.setcurrentPage);

  function paginate(number) {
    setcurrentPage(number);
  }

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <>
      {pages.map((number) => (
        <p key={number}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              paginate(number);
            }}
          >
            {number}
          </a>
        </p>
      ))}
    </>
  );
}

//totoalpages from be -- [] --> [1, 2]
//cyrrentpage from be
