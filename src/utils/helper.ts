export function generateArray(size:number) {
    if (size < 0) {
      return [];
    }
    return Array(size).fill(null);
  }

  export function isObjectInArrayByProperty<T, K extends keyof T>(arr: T[], key: K, value:string):boolean{
    return arr.some(item => (item[key] as string).includes(value));
  }
  
    