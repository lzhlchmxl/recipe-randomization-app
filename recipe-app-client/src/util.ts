import * as T from "./types";

// TODO: commented line below is my best attempt
// export function sortObjectsByProperty<T, K extends keyof T>(arr: { [key: K]: T }[], sortByKey: K) {

// ascending by default
export function sortObjectsByProperty(arr: { [key: string]: any }[], sortByKey: string, isDscending?: boolean) {

  arr.sort( (o1, o2) => {
    const v1 = o1[sortByKey];
    const v2 = o2[sortByKey];     

    if (v1 === v2) {
      return 0;
    }

    if (v1 < v2) {
      return isDscending ? 1 : -1;
    }

    return isDscending ? -1 : 1;
  })

  return arr;
}

export function setState<T, K extends keyof T>(setter: React.Dispatch<React.SetStateAction<T>>, key: K, value: T[K]) {
  setter( (prevState) => {
    const newState = {
      ...prevState,
      [key]: value,
    }
    return newState;
  })
}

export function durationToSeconds(duration: T.Duration): number {

  let sumSeconds = 0;

  if (duration.seconds !== null) {
    sumSeconds += duration.seconds;
  }

  if (duration.minuets !== null) {
    sumSeconds += duration.minuets * 60;
  }

  if (duration.hours !== null) {
    sumSeconds += duration.hours * 3600;
  }

  return sumSeconds;
}

export function secondsToDuration(seconds: number): T.Duration {

  const hours = Math.floor(seconds / 3600);

  let remainingSeconds = seconds - hours * 3600;

  const minuets = Math.floor(remainingSeconds / 60);

  remainingSeconds = remainingSeconds - minuets * 60;

  const duration = {
    hours,
    minuets,
    seconds: remainingSeconds,
  }

  return duration;
}