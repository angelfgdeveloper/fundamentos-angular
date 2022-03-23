// const { Observable } = require('rxjs');
// const { filter } = require('rxjs/operators');

// const doSomething = () => {
//   return new Promise((resolve, reject) => {
//     // resolve('Value One');
//     // resolve('Value Two'); // No funciona porque ya resolvio

//     setTimeout(() => {
//       resolve('Value Three');
//     }, 3000);

//   });
// }

// const doSomething$ = () => {
//   return new Observable(observer => {
//     observer.next('Value One $');
//     observer.next('Value Two $');
//     observer.next('Value Three $');
//     observer.next(null);

//     setTimeout(() => {
//       observer.next('Value Four $');
//     }, 5000);

//     setTimeout(() => {
//       observer.next(null);
//     }, 8000);

//     setTimeout(() => {
//       observer.next('Value Five $');
//     }, 10000);

//   });
// }

// (async() => {
//   const resp = await doSomething();
//   console.log(resp);
// })();

// (() => {
//   const obs$ = doSomething$();
//   obs$
//   .pipe(filter(value => value !== null))
//   .subscribe(resp => {
//     console.log(resp);
//   });
// })();
