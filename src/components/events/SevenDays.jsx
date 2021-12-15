import { Pagination } from "react-bootstrap";

function SevenDays(props) {
  const { parentCb, filterState } = props;
  // days for pagination, currently always shows Sunday first. Work in progress
  // let sevenDays = ["Su", "M", "T", "W", "Th", "F", "S"];
  const currentDay = new Date().getDay();
  const sevenDays = [
    { abbreviation: "Su", index: 0 },
    { abbreviation: "M", index: 1 },
    { abbreviation: "T", index: 2 },
    { abbreviation: "W", index: 3 },
    { abbreviation: "Th", index: 4 },
    { abbreviation: "F", index: 5 },
    { abbreviation: "S", index: 6 },
  ];
  const startsToday = sevenDays.slice(currentDay);
  const endsYesterday = sevenDays.slice(0, currentDay);

  const orderedDays = startsToday.concat(endsYesterday);

  return (
    <Pagination>
      <Pagination.Item
        onClick={() => parentCb(null, filterState.category)}
        active={filterState.weekday === null}
        className="pe-2"
      >
        ALL
      </Pagination.Item>

      {orderedDays.map((oneDay) => (
        <Pagination.Item
          onClick={() => parentCb(oneDay.index, filterState.category)}
          key={oneDay.index}
          active={oneDay.index === filterState.weekday}
        >
          {oneDay.abbreviation}
        </Pagination.Item>
      ))}
    </Pagination>
  );
}

export default SevenDays;
