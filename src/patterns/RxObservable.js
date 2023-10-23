class RxObservable {
  constructor(fn) {
    this.subscribers = [];
    this.value = null;
    this.errorValue = null;
    this.isCompleted = false;
    this.isStopped = true;
    this.operators = [];
    if (fn) {
      fn({
        next: this.next.bind(this),
        error: this.error.bind(this),
        complete: this.complete.bind(this),
      });
    }
  }
  next(value) {
    if (!this.isStopped) {
      this.value = value;
      this.runOperators();
      this.notify();
    }
  }
  error(value) {
    if (!this.isStopped) {
      this.errorValue = value;
      this.notify();
    }
  }
  complete() {
    this.isStopped = true;
  }
  subscribe(fn) {
    this.isStopped = false;
    this.subscribers.push(fn);
    this.notify();
  }
  pipe() {
    let args = Array.from(arguments);
    this.operators = args;
    return {
      subscribe: this.subscribe.bind(this),
      unsubscribe: this.unsubscribe.bind(this),
    };
  }
  unsubscribe(fn = null) {
    this.isStopped = true;
    fn && fn();
  }
  notify() {
    if (this.value || this.errorValue) {
      this.subscribers.forEach((fn) => {
        fn({
          next: this.value,
          error: this.errorValue,
          complete: this.isCompleted,
        });
      });
    }
  }
  runOperators() {
    for (let i = 0; i < this.operators.length; i++) {
      const op = this.operators[i];
      if (op(this.value)) {
        this.value = op(this.value);
      } else {
        this.value = false;
        break;
      }
    }
  }
}

export default RxObservable;
