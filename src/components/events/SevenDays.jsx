import { Pagination } from "react-bootstrap";

function SevenDays(props) {
  const { parentCb, filterState } = props;
  // days for pagination, currently always shows Sunday first. Work in progress
  let sevenDays = ["Su", "M", "T", "W", "Th", "F", "S"];

  return (
    <Pagination>
      <Pagination.Item
        onClick={() => parentCb(null)}
        active={filterState.weekday === null}
        className="pe-2"
      >
        ALL
      </Pagination.Item>

      {sevenDays.map((oneDay, index) => (
        <Pagination.Item
          onClick={() => parentCb(index, filterState.category)}
          key={index}
          active={index === filterState.weekday}
        >
          {oneDay}
        </Pagination.Item>
      ))}
    </Pagination>
  );
}

export default SevenDays;
