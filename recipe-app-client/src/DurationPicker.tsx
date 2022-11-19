import { useEffect, useState } from "react";
import * as util from "./util";

function DurationPicker(
  { 
    initialTotalSeconds,
    setPrepTimeInSeconds
  }
  : 
  { 
    initialTotalSeconds: number,
    setPrepTimeInSeconds: (seconds: number) => void,
  }) {

  const { hours, minuets, seconds } = util.secondsToDuration(initialTotalSeconds);

  const [h, setH] = useState(hours);
  const [m, setM] = useState(minuets);
  const [s, setS] = useState(seconds);

  useEffect( () => {
    setPrepTimeInSeconds(util.durationToSeconds({hours: h, minuets: m, seconds: s}));
  }, [h, m, s]) // eslint-disable-line

  return (
    <label>
      H:
      <input
        defaultValue={h}
        className="w-10"
        type={"number"}
        min={0}
        max={24}
        onChange={ (e) => setH(e.target.valueAsNumber)}
      />
      M:
      <input 
        defaultValue={m}
        className="w-10"
        type={"number"}
        min={0}
        max={60}
        onChange={ (e) => setM(e.target.valueAsNumber)}
      />
      S:
      <input
        defaultValue={s}
        className="w-10" 
        type={"number"}
        min={0}
        max={60}
        onChange={ (e) => setS(e.target.valueAsNumber)}
      />
    </label>
  )
}

export default DurationPicker;