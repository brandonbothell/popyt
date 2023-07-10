export function findArrayIndexFrom<T>
(predicate: (element: T) => boolean, array: T[], startFrom: number): number {
  for (let i = startFrom; i < array.length; i++) {
    if (predicate(array[i])) {
      return i
    }
  }

  return -1
}
