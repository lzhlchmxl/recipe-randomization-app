import { getHistoryList } from "./Api";
import { useAsync } from "./CustomHooks";
import ErrorIndicator from "./ErrorIndicator";
import LoadingIndicator from "./LoadingIndicator";
import { sortObjectsByProperty } from "./util";

function HistoryPage() {

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
      { sortedHistoryHeaders.map( historyHeader => {
        return (
          <div key={ historyHeader.id }>
            <div>{ historyHeader.dateCreated }</div>
            {
              historyHeader.recipeNames.map( (recipeName: string, index: number) => <div key={index}>{recipeName}</div>)
            }
          </div>
        )
      })}
    </div>
  )  
}

export default HistoryPage;