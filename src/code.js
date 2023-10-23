import RxObservable from "./patterns/RxObservable";
import { filter, map } from "./patterns/operators";
const ob = new RxObservable(({ next, error, complete }) => {
  setInterval(() => {
    const num = 10 + Math.ceil(Math.random() * 100);
    next(num);
    // complete();
  }, 500);
}).pipe(
  filter((val) => {
    return val > 50;
  }),
  map((val) => {
    return "filtered " + val;
  })
);
ob.subscribe((observer) => {
  console.log(observer.next);
});
setTimeout(() => {
  ob.unsubscribe();
  console.log("un");
}, 2000);
