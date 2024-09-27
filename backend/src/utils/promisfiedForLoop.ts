export async function promisifyForEach<T>(
  array: T[],
  asyncCallback: (item: T, index: number, array: T[]) => Promise<void>,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let completed = 0;
    const total = array.length;

    array.forEach(async (item, index) => {
      try {
        await asyncCallback(item, index, array);
        completed++;

        if (completed === total) {
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  });
}
