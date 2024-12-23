/**
 *
 * @method {*} getTargetElement 深入子级获取目标元素
 * @param {*} node 查询元素
 * @param {*} targetClass 目标元素类名
 */
export const getTargetElement = (node, targetClass) => {
  let ele = null;
  if (node) {
    ele =
      node.className !== targetClass
        ? getTargetElement(node?.parentNode, targetClass)
        : node;
  }
  return ele;
};
/**
 *
 * @method {*} getTargetIncludeElement 深入父级判断是否包含目标元素
 * @param {*} node 查询元素
 * @param {*} targetClass 目标元素类名
 */
export const getTargetIncludeElement = (node, targetClass) => {
  let ele = null;
  if (node) {
    ele = !node.className.includes(targetClass)
      ? getTargetElement(node?.parentNode, targetClass)
      : node;
  }
  return !!ele;
};
/**
 *获取加载图片地址
 * @param imgPath: string
 */
export const requireImg = (imgPath: string) => {
  return new URL(imgPath, import.meta.url).href;
};

/**
 * @method {*} AsynchronousList 异步串行
 * @param {*} effects 执行事件队列
 * 旨在异步、同步事件按照执行顺序返回结果
 */
export const AsynchronousList = (effects = []) => {
  if (!effects.length) return false;
  return effects.reduce((promise, currentFunction) => {
    return promise.then(() => {
      return currentFunction();
    });
  }, Promise.resolve());
};

/*
 * @method 延时执行
 * @param {*} time 时间
 * @return promise回调
 */
export const sleep = async (time: any) => {
  let timer = null;
  await new Promise(
    (cb) =>
      (timer = setTimeout(() => {
        cb(1);
        clearTimeout(timer);
      }, time))
  );
};
/**
 * @method {*} findParentByClass 通过子元素查找目标父级元素
 * @param {*} childElement 子元素
 * @param {*} parentClass 父元素类名
 * @returns
 */
export function findParentByClass(childElement, parentClass) {
  let currentElement = childElement;

  // 循环查找父元素直到找到匹配的父元素
  while (currentElement !== null) {
    if (
      currentElement.classList &&
      currentElement.classList.contains(parentClass)
    ) {
      return currentElement; // 找到父元素
    }
    currentElement = currentElement.parentElement;
  }

  return null; // 如果没有找到，则返回 null
}
