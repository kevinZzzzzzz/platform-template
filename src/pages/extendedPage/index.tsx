import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeCollapsed } from "@/store/slice/LayoutSlice";
import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./index.module.scss";
import Draggable from "react-draggable";
import { CloseOutlined, ExpandOutlined } from "@ant-design/icons";
import { findParentByClass } from "@/utils";
import { useNavigate } from "react-router-dom";
import WujieReact from "wujie-react";

function ExtendedPage(props: any) {
  const dispatch = useAppDispatch();
  const { setupApp, preloadApp, bus } = WujieReact;
  const { pluginList, projectList } = useAppSelector((store: any) => {
    return store.Layout;
  });
  const { extendedPageBackground } = useAppSelector((store) => {
    return store.Theme;
  });
  const style = {
    "--extended-page-background": extendedPageBackground,
  } as React.CSSProperties;
  const [modelList, setModelList] = useState([]);
  const [activeIdx, setActiveIdx] = useState(null);
  const modelRefList = useRef(null);
  const fullScreen = useRef([]);
  const [activeModelKey, setActiveModelKey] = useState(null);
  useEffect(() => {
    dispatch(changeCollapsed({ collapsed: true }));
    console.log("projectList", projectList);
    // setupApp({
    //   name: "ColdChainWeb",
    //   url: "http://192.168.120.178:8881/ColdChainWeb/index.html#/login",
    //   exec: true,
    //   beforeLoad: (appWindow) =>
    //     console.log(appWindow, `${appWindow.__WUJIE.id} beforeLoad 生命周期`),
    //   beforeMount: (appWindow) =>
    //     console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`),
    //   afterMount: (appWindow) =>
    //     console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
    // });
    // preloadApp({
    //   url: "http://192.168.120.178:8881/ColdChainWeb/index.html#/login",
    //   name: "ColdChainWeb",
    // });
  }, [projectList, pluginList]);

  const handleDblClick = (d, idx) => {
    setActiveModelKey(d.key);
    setActiveIdx(idx);
    const modelListTemp = [...modelList];
    if (!modelListTemp?.find((d1) => d1 && d1?.key === d.key)) {
      modelListTemp.push(d);
      setModelList(modelListTemp);
    }
  };
  const handleSingleClick = (d, idx) => {
    setActiveIdx(idx);
  };
  const handleBlank = (target) => {
    setActiveIdx(null);
  };

  const handleCloseModel = (d, idx) => {
    const modelListTemp = [...modelList];
    modelListTemp.splice(idx, 1, null);
    setModelList(modelListTemp);

    // 清空
    if (modelListTemp.every((d1) => !d1)) {
      setModelList([]);
    }
  };
  const handleZoomModel = (idx, target) => {
    const index = fullScreen.current.findIndex((d1) => d1 === idx);
    const targetRef = findParentByClass(target, styles.modelItem);
    if (index !== -1) {
      // 最小化
      fullScreen.current.splice(index, 1);
      targetRef.style.top = `${idx * 2 + 25}%`;
      targetRef.style.left = `${idx * 2 + 20}%`;
      targetRef.style.transform = "translate(0px, 0px)";
      targetRef.style.width = "60vmax";
      targetRef.style.height = "30vmax";
    } else {
      // 最大化
      fullScreen.current.push(idx);
      targetRef.style.top = "0px";
      targetRef.style.left = "0px";
      targetRef.style.transform = "translate(0px, 0px)";
      targetRef.style.width = "100%";
      targetRef.style.height = "100%";
    }
  };
  return (
    <div
      className={styles.ExtendedPage}
      style={{ ...style }}
      onClick={(e) => {
        handleBlank(e);
      }}
    >
      {/* <h1>扩展应用</h1> */}
      <div className={styles.ExtendedPage_desktop}>
        <div className={styles.ExtendedPage_desktop_appList}>
          {projectList?.map((d, idx) => {
            return (
              <div
                key={idx}
                style={{
                  border: activeIdx === idx ? "1px solid #ccc" : "none",
                  backgroundColor:
                    activeIdx === idx
                      ? "rgb(204, 204, 204, 15%)"
                      : "transparent",
                }}
                className={styles.ExtendedPage_desktop_appList_item}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSingleClick(d, idx);
                }}
                onDoubleClick={() => {
                  handleDblClick(d, idx);
                }}
              >
                <img src={d.image} alt="" />
                <p>{d.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      {modelList?.map((d, idx) => {
        return d ? (
          <Draggable bounds="parent" key={idx}>
            <div
              className={styles.modelItem}
              ref={modelRefList}
              style={{
                zIndex: activeModelKey === d.key ? 999 : 2,
                boxShadow:
                  activeModelKey === d.key ? "0px 0px 10px 2px #ccc" : "none",
                top: `${25 + idx * 2}%`,
                left: `${20 + idx * 2}%`,
              }}
              onClick={() => {
                setActiveModelKey(d.key);
              }}
            >
              <div className="modelHeader">
                <div className={styles.modelHeader}>
                  <p>{d.name}</p>
                  <div className={styles.modelHeader_control}>
                    <div
                      className={styles.modelHeader_control_item}
                      onClick={(e) => {
                        handleZoomModel(idx, e.target);
                      }}
                    >
                      <ExpandOutlined />
                    </div>
                    <div
                      className={styles.modelHeader_control_item}
                      onClick={() => {
                        handleCloseModel(d, idx);
                      }}
                    >
                      <CloseOutlined />
                    </div>
                  </div>
                </div>
              </div>
              <WindowRef key={idx} info={d} idx={idx} />
            </div>
          </Draggable>
        ) : null;
      })}
    </div>
  );
}
export default ExtendedPage;

const WindowRef = React.memo((props: any) => {
  const { info, idx } = props;
  const navigation = useNavigate();
  function splitPath(path) {
    const parts = path.split("/");
    // 处理路径并返回切割后的部分
    const firstPart = "/" + parts[1];
    const secondPart = "/" + parts.slice(2).join("/");
    return [firstPart, secondPart];
  }
  const pathUrl = useMemo(() => {
    const [firstPart, secondPart] = splitPath(info.path);
    const u = `${window.location.origin}${firstPart}/index.html#${secondPart}`;

    return "http://192.168.120.178:8888/";
  }, [info]);
  console.log(pathUrl);
  const props1 = {
    jump: (name) => {
      navigation(`/${name}`);
    },
  };
  return (
    <div className={styles.windowRef}>
      {/* <iframe
        id="windowRef"
        src={pathUrl}
        className={styles.windowRef_iframe}
      ></iframe> */}
      <WujieReact
        sync={true}
        width="100%"
        height="100%"
        // degrade={true}
        name={info.projectName}
        url={pathUrl}
      ></WujieReact>
    </div>
  );
});
