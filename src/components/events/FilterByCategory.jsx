import { Pagination, Dropdown } from "react-bootstrap";

export default function FilterByCategory(props) {
  // days for pagination, currently always shows Sunday first. Work in progress
  let category = [
    {icon: "🙋", name: "Open to plans"},
    {icon: "🍺", name: "Drinks"},
    {icon: "🥘", name: "Food" },
    {icon: "🛍️", name: "Shopping"},
    {icon: "🎉", name: "Clubbing"},
    {icon: "⚽", name: "Sports"},
    {icon: "🧘", name: "Yoga"},
    {icon: "🏖️", name: "Beach"},
    {icon: "🏛️", name: "Art & Culture"},
    {icon: "🎥", name: "Movies"},
    {icon: "🎸", name: "Music"},
    {icon: "🎲", name: "Board games"},
    {icon: "🎮", name: "Computer games"},
    {icon: "🤷", name: "Other"},
  ];

  return (
    <div>
      <div className="drop-down-category">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-category">
           Select a category
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => props.parentCb(null)}>
              Show all
            </Dropdown.Item>
            {category.map((oneCategory) => (
              <Dropdown.Item onClick={() => props.parentCb(oneCategory.icon)}>
                {oneCategory.icon}
                {oneCategory.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
