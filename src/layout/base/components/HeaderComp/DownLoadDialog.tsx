import { generatedRoutes } from "@/router/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateProjectList,
  changeHeaderTabList,
  updatePluginList,
} from "@/store/slice/LayoutSlice";
import {
  AsynchronousList,
  importPlugin,
  removePlugin,
  requireImg,
  sleep,
} from "@/utils";
import { Button, message, Tabs } from "antd";
import React, { useState, useEffect, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { importProjectList, importPluginList } from "./mock";

const DownLoadDialogComp: React.FC = (props: any) => {
  const tabsItems = [
    {
      label: "项目",
      key: "1",
      children: <ImportProject />,
    },
    {
      label: "插件",
      key: "2",
      children: <ImportPlugin />,
    },
  ];
  return (
    <div className={styles.DownLoadDialog}>
      <Tabs tabPosition={"left"} items={tabsItems} />
    </div>
  );
};
export default DownLoadDialogComp;

// 导入项目组件
const ImportProject = memo(() => {
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { projectList, menuKey, headerTabList } = useAppSelector(
    (store: any) => {
      return store.Layout;
    }
  );
  const projectListInTime = useMemo(() => {
    return importProjectList.map((d1) => {
      return {
        ...d1,
        status: projectList?.find((d2) => d2.key === d1.key) ? 1 : 0,
      };
    });
  }, [projectList]);

  const handleClick = () => {
    window.$busInc.emit("handleModel", {
      visible: false,
    });
    navigate("/extendedPage");
  };

  // 安装 删除项目
  const handleImport = (item, idx) => {
    let projectListTemp = JSON.parse(JSON.stringify(projectList));
    AsynchronousList([
      () => {
        setLoadings((prev) => {
          let temp = [...prev];
          temp[idx] = true;
          return temp;
        });
      },
      () => {
        sleep(1000).then((res: any) => {
          setLoadings((prev) => {
            let temp = [...prev];
            temp[idx] = false;
            return temp;
          });
        });
      },
      () => {
        sleep(1000).then((res: any) => {
          if (item.status) {
            // 卸载
            message.success("卸载成功");
            projectListTemp = projectListTemp.filter((d) => d.key !== item.key);
            dispatch(updateProjectList({ projectList: projectListTemp }));
          } else {
            // 安装
            message.success("安装成功");
            projectListTemp = [...projectListTemp, item];
            dispatch(updateProjectList({ projectList: projectListTemp }));
          }
        });
      },
    ]);
  };
  return (
    <div className={styles.ImportProject}>
      <Button
        type="primary"
        onClick={() => {
          handleClick();
        }}
      >
        扩展页
      </Button>
      <div className={styles.ImportProject_list}>
        {projectListInTime?.map((d, idx) => {
          return (
            <div className={styles.ImportProject_list_item} key={idx}>
              <div
                className={styles.ImportProject_list_item_info}
                style={{
                  opacity: d.status ? 0.5 : 1,
                }}
              >
                <img src={d.image} alt="" />
                <div className={styles.ImportProject_list_item_info_name}>
                  <p>{d.name}</p>
                </div>
              </div>
              <Button
                type={d.status ? "default" : "primary"}
                size={"small"}
                loading={loadings[idx]}
                onClick={() => {
                  handleImport(d, idx);
                }}
              >
                {d.status ? "删 除" : "安 装"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
});

// 导入插件组件
const ImportPlugin = memo(() => {
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pluginList } = useAppSelector((store: any) => {
    return store.Layout;
  });
  const pluginListInTime = useMemo(() => {
    return importPluginList.map((d1) => {
      return {
        ...d1,
        status: pluginList?.find((d2) => d2.key === d1.key) ? 1 : 0,
      };
    });
  }, [pluginList]);

  const handleClick = () => {
    window.$busInc.emit("handleModel", {
      visible: false,
    });
    navigate("/pluginTextPage");
  };

  // 安装 删除插件
  const handleImport = (item, idx) => {
    let pluginListTemp = JSON.parse(JSON.stringify(pluginList));
    AsynchronousList([
      () => {
        setLoadings((prev) => {
          let temp = [...prev];
          temp[idx] = true;
          return temp;
        });
      },
      () => {
        sleep(1000).then((res: any) => {
          setLoadings((prev) => {
            let temp = [...prev];
            temp[idx] = false;
            return temp;
          });
        });
      },
      () => {
        sleep(1000).then((res: any) => {
          if (item.status) {
            // 卸载
            removePlugin(item.key);
            message.success("卸载成功");
            pluginListTemp = pluginListTemp.filter((d) => d.key !== item.key);
            dispatch(updatePluginList({ pluginList: pluginListTemp }));
          } else {
            // 安装
            importPlugin(item.key);
            message.success("安装成功");
            dispatch(
              updatePluginList({ pluginList: [...pluginListTemp, item] })
            );
          }
        });
      },
    ]);
  };
  return (
    <div className={styles.ImportProject}>
      <Button
        type="primary"
        onClick={() => {
          handleClick();
        }}
      >
        插件测试页
      </Button>
      <div className={styles.ImportProject_list}>
        {pluginListInTime?.map((d, idx) => {
          return (
            <div className={styles.ImportProject_list_item} key={idx}>
              <div
                className={styles.ImportProject_list_item_info}
                style={{
                  opacity: d.status ? 0.5 : 1,
                }}
              >
                <img src={requireImg("/src/assets/chajian.png")} alt="" />
                <div className={styles.ImportProject_list_item_info_name}>
                  <p>{d.name}</p>
                  <h6>{d.description}</h6>
                </div>
              </div>
              <Button
                type={d.status ? "default" : "primary"}
                size={"small"}
                loading={loadings[idx]}
                onClick={() => {
                  handleImport(d, idx);
                }}
              >
                {d.status ? "删 除" : "安 装"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
});
