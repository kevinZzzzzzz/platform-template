import React, { useState, useEffect, useLayoutEffect } from "react";

function UseFixTop() {
  // console.log(props);
  // const { element } = props;
  const [fixTopHeight, setFixTopHeight] = useState(0);
  const [tableScrollHeight, setTableScrollHeight] = useState(0);

  const handleStylePropertyValue = (key: string) => {
    if (!getComputedStyle(document.documentElement).getPropertyValue(key)) {
      return 0;
    } else {
      return +getComputedStyle(document.documentElement)
        .getPropertyValue(key)
        .replace("px", "");
    }
  };
  const computeTableScrollHeight = () => {
    let targetHeight = 0;
    const pcInnerHeight = window.innerHeight;
    const layoutHeaderHeight = handleStylePropertyValue(
      "--layout-header-height"
    );
    const layoutFooterHeight = handleStylePropertyValue(
      "--layout-footer-height"
    );
    const layoutTabHeight = handleStylePropertyValue("--layout-tab-height");
    const layoutContentOutPadding = handleStylePropertyValue(
      "--layout-content-out-padding"
    );
    const layoutContentInnerPadding = handleStylePropertyValue(
      "--layout-content-inner-padding"
    );
    // 剩余空间 =  屏幕高度 - header高度 - footer高度 - tabs高度 - content内边距 * 2 - content外边距 * 2
    targetHeight =
      pcInnerHeight -
      layoutHeaderHeight -
      layoutFooterHeight -
      layoutTabHeight -
      layoutContentOutPadding * 2 -
      layoutContentInnerPadding * 2;
    // 剩余空间 - 表格头部高度 - 表格底部高度
    setTableScrollHeight(targetHeight);
  };
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      const fixTopHeaderRef =
        document.getElementsByClassName("fixTopHeader")[0];
      const fixTopHeaderH = +window
        .getComputedStyle(fixTopHeaderRef)
        .height.replace("px", "");
      setFixTopHeight(fixTopHeaderH);
      computeTableScrollHeight();
    }, 0);
    window.addEventListener("resize", () => {
      computeTableScrollHeight();
    });
    return () => {
      clearTimeout(timer); // 清理定时器
      window.removeEventListener("resize", () => {
        computeTableScrollHeight();
      });
    };
  }, []);
  return {
    fixTopHeight,
    tableScrollHeight,
  };
}
export default UseFixTop;
