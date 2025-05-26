export type RecapColumn<T> = {
  header: string;
  accessorKey: keyof T;
  cell?: (value: T[keyof T]) => React.ReactNode;
};
