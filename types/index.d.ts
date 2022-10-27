// declare module 'js-fragment'

// 把某些属性变为必选
type CustomRequired<T, K extends keyof T> = {
  [P in K]-?: T[P]
} & Omit<T, K>

// interface Student {
//   name?: string;
//   age?: number;
//   class: number
// }
// // age变required, 其余不变
// type Student2 = CustomRequired<Student, 'age'>
// // age, name 变required, 其余不变
// type Student3 = CustomRequired<Student, 'age' | 'name'>
