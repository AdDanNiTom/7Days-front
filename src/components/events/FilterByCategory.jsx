import { Pagination } from "react-bootstrap";

export default function FilterByCategory(props) {
  // days for pagination, currently always shows Sunday first. Work in progress
  let category = ["🍺","🥘","⚽","🏛️","🎥"];

  return (
    <div>
      <Pagination>
      <Pagination.Item
      onClick={() => props.parentCb(null)}
      >🔀
           </Pagination.Item>
        {category.map((oneCategory) => (
          <Pagination.Item
            onClick={() => props.parentCb(oneCategory)}
            key={oneCategory}
            active={oneCategory===props.selectedCategory}
          >
            {oneCategory}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

