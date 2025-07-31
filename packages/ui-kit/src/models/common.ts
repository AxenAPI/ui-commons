export type TAnyObject = Record<PropertyKey, any>;
export type TProcedure<T extends [] = []> = (...args: T) => void;
