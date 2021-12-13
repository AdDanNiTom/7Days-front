import { Pagination } from "react-bootstrap";

function SevenDays(props) {
  const { parentCb, activeDay } = props;
  // days for pagination, currently always shows Sunday first. Work in progress
  let sevenDays = ["Su", "M", "T", "W", "Th", "F", "S"];

  return (
    <div>
      <Pagination>
        <Pagination.Item
          onClick={() => parentCb(null)}
          active={activeDay === null}
          className="pe-2"
        >
          ALL
        </Pagination.Item>

        {sevenDays.map((oneDay, index) => (
          <Pagination.Item
            onClick={() => parentCb(index)}
            key={index}
            active={index === activeDay}
          >
            {oneDay}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default SevenDays;
