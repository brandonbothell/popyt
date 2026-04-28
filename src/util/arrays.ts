export function findArrayFrom<T>
(predicate: (element: T) => boolean, array: T[], startFrom: number): [number, T] {
  for (let i = startFrom; i < array.length; i++) {
    if (predicate(array[i])) {
      return [i, array[i]]
    }
  }

  return undefined
}
