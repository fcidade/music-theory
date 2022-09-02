import { Link } from "react-router-dom";
import { RudimentItem } from "./components/rudiment-item";


export const RudimentsListPage = () => {

  const singleStroke = () => ({
    id: "single_stroke" + Math.random(),
    name: "Single stroke",
    handOrder: "R L R L R R R R L R L R L L L L",
    bpmRecord: 180,
  });

  const rudiments = [
    singleStroke(),
    singleStroke(),
    singleStroke(),
    singleStroke(),
    singleStroke(),
    singleStroke(),
    singleStroke(),
    singleStroke(),
    singleStroke(),
    singleStroke(),
    singleStroke(),
    singleStroke(),
    singleStroke(),
    singleStroke(),
  ];

  return (
    <div className="p-4 flex flex-col space-y-4">
      {rudiments.map(({ id, ...r }) => (
        <Link to={`/rudiment-tracker/${1}`} key={id}>
          <RudimentItem {...r} />
        </Link>
      ))}
    </div>
  );
};
