// src/utils/debounce.ts

/**
 * Creates a debounced function that delays the execution of `func`
 * until after `wait` milliseconds have elapsed since the last time
 * the debounced function was invoked.
 * 
 * @param func - The function to debounce.
 * @param wait - The number of milliseconds to delay.
 * @returns A new debounced function.
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
  
    return function(...args: Parameters<T>) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }
  