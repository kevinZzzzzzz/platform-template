import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeCollapsed } from "@/store/slice/LayoutSlice";
import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./index.module.scss";
import Draggable from "react-draggable";
import { CloseOutlined, ExpandOutlined } from "@ant-design/icons";
import { findParentByClass } from "@/utils";

function ExtendedPage(props: any) {
  const dispatch = useAppDispatch();
  const { pluginList, projectList } = useAppSelector((store: any) => {
    return store.Layout;
  });
  const [modelList, setModelList] = useState([]);
  const [activeIdx, setActiveIdx] = useState(null);
  const modelRefList = useRef(null);
  const fullScreen = useRef([]);
  const [activeModelKey, setActiveModelKey] = useState(null);
  useEffect(() => {
    dispatch(changeCollapsed({ collapsed: true }));
    // console.log("projectList", projectList);
  }, [projectList, pluginList]);

  const handleDblClick = (d, idx) => {
    setActiveModelKey(d.key);
    setActiveIdx(idx);
    const modelListTemp = [...modelList];
    // if (!modelListTemp.find((d1) => d1.key === d.key)) {
    modelListTemp.push(d);
    setModelList(modelListTemp);
    // }
  };

  const handleBlank = (target) => {
    setActiveIdx(null);
  };

  const handleCloseModel = (d) => {
    const modelListTemp = [...modelList];
    const idx = modelListTemp.findIndex((d1) => d1.key === d.key);
    if (idx !== -1) {
      modelListTemp.splice(idx, 1);
      setModelList(modelListTemp);
    }
  };
  const handleZoomModel = (idx, target) => {
    const index = fullScreen.current.findIndex((d1) => d1 === idx);
    const targetRef = findParentByClass(target, styles.modelItem);
    if (index !== -1) {
      fullScreen.current.splice(index, 1);
      targetRef.style.top = "30%";
      targetRef.style.left = "30%";
      targetRef.style.transform = "translate(0px, 0px)";
      targetRef.style.width = "60vmax";
      targetRef.style.height = "20vmax";
    } else {
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
        return (
          <Draggable bounds="parent" handle=".modelHeader">
            <div
              className={styles.modelItem}
              ref={modelRefList}
              style={{
                zIndex: activeModelKey === d.key ? 999 : 2,
                boxShadow:
                  activeModelKey === d.key ? "0px 0px 10px 10px #ccc" : "none",
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
                        handleCloseModel(d);
                      }}
                    >
                      <CloseOutlined />
                    </div>
                  </div>
                </div>
              </div>
              <WindowRef key={idx} info={d} />
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}
export default ExtendedPage;

const WindowRef = React.memo((props: any) => {
  const info = props.info;
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
    return u;
  }, [info]);
  return (
    <div className={styles.windowRef}>
      <iframe
        // src={pathUrl}
        src={"http://192.168.120.178:8883/"}
        className={styles.windowRef_iframe}
        frameborder="0"
      ></iframe>
    </div>
  );
});
