/**
 * @Author: kevinZzzzzz
 * @Date: 2023-04-25 16:47:40
 * @version:
 * @LastEditors: kevinZzzzzz
 * @LastEditTime: 2023-04-26 15:21:28
 * @Description: 发布订阅类
 */
class BusClass {
  emit: ((name: string) => void) | undefined;
  on: ((name: string, callback: () => void) => void) | undefined;
}
type ParamsKey = string | number | symbol;

type List = {
  [key in ParamsKey]: Array<() => void>;
};

class Bus implements BusClass {
  list: List;
  constructor() {
    this.list = {};
  }
  // 触发
  emit(name: string, ...args: Array<any>) {
    const eventName: Array<() => void> = this.list[name];
    console.log(this.list, "eventName00000000");
    eventName?.forEach((fn: () => void) => {
      fn.apply(this, args);
    });
  }
  // 监听
  on(name: string, callback: () => void) {
    const fn: Array<() => void> = this.list[name] || [];
    fn.push(callback);
    this.list[name] = fn;
  }
  // 取消监听
  off(name: string, callback: () => void) {
    const fn: Array<() => void> = this.list[name] || [];
    fn.forEach((item: () => void, index: number) => {
      if (item === callback) {
        fn.splice(index, 1);
      }
    });
  }
}
export { Bus };
