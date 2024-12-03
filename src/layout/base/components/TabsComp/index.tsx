import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  changeActiveTabKey,
  changeHeaderTabList,
} from "@/store/slice/LayoutSlice";
import { Dropdown, Menu, Tabs, TabsProps } from "antd";
import React, { useState, useEffect, memo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAliveController } from "react-activation";
import { MenuProps } from "antd/lib";
import {
  CloseOutlined,
  ColumnWidthOutlined,
  EllipsisOutlined,
  MinusOutlined,
  SwapLeftOutlined,
  SwapRightOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import { getTargetElement, getTargetIncludeElement } from "@/utils";
import { use } from "i18next";

const items: MenuProps["items"] = [
  {
    label: (
      <div className={styles.tabs_item}>
        <CloseOutlined />
        <p className={styles.tabs_item_text}>关闭</p>
      </div>
    ),
    key: "0",
  },
  {
    label: (
      <div className={styles.tabs_item}>
        <ColumnWidthOutlined />
        <p className={styles.tabs_item_text}>关闭其他</p>
      </div>
    ),
    key: "1",
  },
  {
    label: (
      <div className={styles.tabs_item}>
        <SwapLeftOutlined />
        <p className={styles.tabs_item_text}>关闭左侧</p>
      </div>
    ),
    key: "2",
  },
  {
    label: (
      <div className={styles.tabs_item}>
        <SwapRightOutlined />
        <p className={styles.tabs_item_text}>关闭右侧</p>
      </div>
    ),
    key: "3",
  },
  {
    label: (
      <div className={styles.tabs_item}>
        <MinusOutlined />
        <p className={styles.tabs_item_text}>关闭全部</p>
      </div>
    ),
    key: "4",
  },
];
function TabsComp(props: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { dropScope } = useAliveController();
  const { tab, headerTabList, activeTabKey } = useAppSelector((store: any) => {
    return store.Layout;
  });
  const tabsRef = useRef(null);
  const [showMenu, setShowMenu] = useState({
    show: false,
    top: 0,
    left: 0,
  });
  /*
    切换tabs栏
  */
  const onChange = (act: any) => {
    const obj = headerTabList.find((a: any) => a.key == act);
    if (obj) {
      dispatch(changeActiveTabKey({ activeTabkey: obj.key }));
      navigate(obj.path);
    }
  };
  /**
    关闭tab栏
  */
  const onEdit = (delId: any) => {
    if (headerTabList.length <= 1) return false;
    const newHeaderTabList = JSON.parse(JSON.stringify(headerTabList));
    const delIndex = newHeaderTabList.findIndex((e: any) => e.key == delId);
    if (delIndex <= -1) return false;

    let newActkey = ""; // 新选中tab的key
    let newActPath = ""; // 新选中tab的path
    let delObj: any = {}; // 关掉的tab对象信息
    if (delId == activeTabKey) {
      // 关闭的tab为当前激活的tab
      if (!delIndex) {
        // tab在第一位的情况,关闭后激活状态和路由完后一个tab过度
        newActkey = newHeaderTabList[delIndex + 1].key;
        newActPath = newHeaderTabList[delIndex + 1].path;
        delObj = newHeaderTabList.splice(0, 1);
      } else {
        // tab不在第一位的情况,关闭后激活状态和路由完前一个tab过度
        newActkey = newHeaderTabList[delIndex - 1].key;
        newActPath = newHeaderTabList[delIndex - 1].path;
        delObj = newHeaderTabList.splice(delIndex, 1);
      }
      // 更新激活的tabKey
      dispatch(changeActiveTabKey({ activeTabKey: newActkey }));
    } else {
      delObj = newHeaderTabList.splice(delIndex, 1);
      newActPath = "";
    }
    // 更新激活的headerTabs栏
    dispatch(changeHeaderTabList({ headerTabList: newHeaderTabList }));
    dropScope(delObj[0].path); // 关掉tabs需要清掉缓存

    newActPath && navigate(newActPath);
  };
  // 菜单组件
  const MenuContext = () => (
    <div
      className={styles.tabs}
      style={{ top: showMenu.top, left: showMenu.left }}
    >
      {items.map((d: any) => {
        return d.label;
      })}
    </div>
  );
  /**
   * 处理子菜单时间
   * @param e 元素
   */
  const handleSubMenu = (e) => {
    const bool = getTargetElement(e.target, styles.tabs);
    if (!bool) {
      setShowMenu((pre) => {
        return {
          ...pre,
          show: false,
        };
      });
    }
  };
  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => {
    return (
      <div
        onContextMenu={(e) => {
          console.log(props, 123123123);
          setShowMenu(() => {
            return {
              top: e.clientY,
              left: e.clientX,
              show: getTargetIncludeElement(e.target, "ant-tabs-tab"),
            };
          });
        }}
      >
        <DefaultTabBar {...props} />
      </div>
    );
  };
  useEffect(() => {
    tabsRef.current.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    document.addEventListener("click", (e) => {
      handleSubMenu(e);
    });
    return () => {
      document.removeEventListener("click", (e) => {
        handleSubMenu(e);
      });
    };
  }, []);
  return (
    <div ref={tabsRef}>
      <Tabs
        hideAdd
        type="editable-card"
        onChange={onChange}
        onEdit={onEdit}
        activeKey={activeTabKey}
        items={headerTabList.map((d, idx) => {
          return {
            ...d,
            label: (
              <div
                className={styles.customLabel}
                onContextMenu={(e) => {
                  // e.preventDefault();
                  // console.log(
                  // getTargetIncludeElement(e.target, "ant-tabs-tab"),
                  // );
                  setShowMenu(() => {
                    return {
                      top: e.clientY,
                      left: e.clientX,
                      show: true,
                    };
                  });
                }}
              >
                {d.label}
              </div>
            ),
          };
        })}
        tabBarStyle={{ ...tab }}
        // renderTabBar={renderTabBar}
        // onContextMenu={(e) => {
        //   e.preventDefault();
        //   setShowMenu(() => {
        //     return {
        //       top: e.pageY,
        //       left: e.pageX,
        //       show: getTargetIncludeElement(e.target, "ant-tabs-tab"),
        //     };
        //   });
        // }}
      />
      {showMenu.show ? <MenuContext /> : null}
    </div>
  );
}
export default memo(TabsComp);
