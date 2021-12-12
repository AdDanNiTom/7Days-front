import { Pagination } from "react-bootstrap";

function SevenDays(props) {
  // days for pagination, currently always shows Sunday first. Work in progress
  let sevenDays = ["Su", "M", "T", "W", "Th", "F", "S"];

  return (
    <div>
      <Pagination>
        {sevenDays.map((oneDay, index) => (
          <Pagination.Item
            onClick={() => props.parentCb(index)}
            key={index}
            active={index === props.selectedDay}
          >
            {oneDay}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default SevenDays;
