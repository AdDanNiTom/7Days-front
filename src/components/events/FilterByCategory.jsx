import { Form } from "react-bootstrap";

export default function FilterByCategory(props) {
  const { parentCb, filterState } = props;
  // days for pagination, currently always shows Sunday first. Work in progress
  let category = [
    { icon: "🙋", name: "Open to plans" },
    { icon: "🍺", name: "Drinks" },
    { icon: "🥘", name: "Food" },
    { icon: "🛍️", name: "Shopping" },
    { icon: "🎉", name: "Clubbing" },
    { icon: "⚽", name: "Sports" },
    { icon: "🧘", name: "Yoga" },
    { icon: "🏖️", name: "Beach" },
    { icon: "🏛️", name: "Art & Culture" },
    { icon: "🎥", name: "Movies" },
    { icon: "🎸", name: "Music" },
    { icon: "🎲", name: "Board games" },
    { icon: "🎮", name: "Computer games" },
    { icon: "🤷", name: "Other" },
  ];

  return (
    <Form.Select
      aria-label="Default select example"
      onChange={(e) => parentCb(filterState.weekday, e.target.value)}
    >
      <option value="all">Show all</option>
      {category.map((oneCategory) => (
        <option value={oneCategory.icon}>
          {oneCategory.icon}
          {oneCategory.name}
        </option>
      ))}
    </Form.Select>
  );
}
