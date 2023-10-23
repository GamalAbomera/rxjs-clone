# rxjs-clone

Simple rxjs simulation

I tried to simulate rxjs Observeble Class and create 2 operators and apply them in my observable

## Example

```javascript
import RxObservable from "./patterns/RxObservable";
import { filter, map } from "./patterns/operators";

const ob = new RxObservable(({ next, error, complete }) => {
  setInterval(() => {
    const num = 10 + Math.ceil(Math.random() * 100);
    next(num);
  }, 500);
}).pipe(
  filter((val) => {
    return val > 50;
  }),
  map((val) => {
    return "mapped " + val;
  })
);

ob.subscribe((observer) => {
  console.log(observer.next);
});

setTimeout(() => {
  ob.unsubscribe();
  console.log("un");
}, 2000);
```
