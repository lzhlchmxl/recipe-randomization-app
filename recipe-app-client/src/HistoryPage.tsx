import { useNavigate } from "react-router-dom";
import { getHistoryList } from "./Api";
import { useAsync } from "./CustomHooks";
import ErrorIndicator from "./ErrorIndicator";
import LinkButton from "./LinkButton";
import LoadingIndicator from "./LoadingIndicator";
import { sortObjectsByProperty } from "./util";

function HistoryPage() {

  const navigate = useNavigate();

  const historyHeadersAsync = useAsync(getHistoryList, []);

  if (historyHeadersAsync.status === "pending") {
    return <LoadingIndicator />
  }

  if (historyHeadersAsync.status === "rejected") {
    return <ErrorIndicator />
  }

  const historyHeaders = historyHeadersAsync.value;
  const sortedHistoryHeaders = sortObjectsByProperty(historyHeaders, "dateCreated", true);

  return (
    <div>
      <div className="flex justify-between items-baseline">
        <div className="text-5xl my-5 capitalize">
          history
        </div>
        <div className="flex">
          <LinkButton
            linkType="back"
            // TODO: is this gonna bite me later?
            to=""
            onClick={() => {navigate(-1)}}
          />
        </div>
      </div>
      { sortedHistoryHeaders.map( (historyHeader, index) => {
        return (
          <div
            key={ index }
          >
            <div className="font-semibold">{
              new Date(historyHeader.dateCreated)
              .toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            }</div>
            <ul
              className="list-disc"
            >
              {
                historyHeader.recipeNames.map( (recipeName: string, index: number) => {
                  return (
                    <li 
                      className={`
                        capitalize ml-[20px]
                      `}
                      key={index}
                    >{recipeName}</li>
                  )
                })
              }
            </ul>
            {
              index < historyHeaders.length - 1 && 
              <div className={`
                relative h-0.5 my-10 
                before:content-[""] before:absolute before:h-0.5
                bg-gradient-to-r from-transparent via-gray-400 to-transparent
              `}></div>
            }
          </div>
        )
      })}
    </div>
  )  
}

export default HistoryPage;