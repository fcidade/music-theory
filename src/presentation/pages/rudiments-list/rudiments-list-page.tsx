import { Link } from "react-router-dom";
import { rudiments } from "../../content";
import { RudimentItem } from "./components/rudiment-item";


export const RudimentsListPage = () => {
  return (
    <div className="p-4 flex flex-col space-y-4">
      {rudiments.map(({ id, ...r }) => (
        <Link to={`/rudiment-tracker/${id}`} key={id}>
          <RudimentItem {...r} />
        </Link>
      ))}
    </div>
  );
};
