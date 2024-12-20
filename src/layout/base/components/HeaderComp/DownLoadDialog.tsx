import { updateRouter } from "@/router";
import { generatedRoutes } from "@/router/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateProjectList,
  changeHeaderTabList,
} from "@/store/slice/LayoutSlice";
import { AsynchronousList, sleep } from "@/utils";
import { Button, message, Tabs } from "antd";
import React, { useState, useEffect, memo, useMemo } from "react";
import styles from "./index.module.scss";
import { ImportMenu, importProjectList } from "./mock";

const DownLoadDialogComp: React.FC = (props: any) => {
  const { pluginList, projectList } = useAppSelector((store: any) => {
    return store.Layout;
  });
  const tabsItems = [
    {
      label: "项目",
      key: "1",
      children: <ImportProject />,
    },
    {
      label: "插件",
      key: "2",
      children: "插件",
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

  // 安装 删除项目
  const handleImport = (item, idx) => {
    let projectListTemp = JSON.parse(JSON.stringify(projectList));
    let headerTabListTemp = JSON.parse(JSON.stringify(headerTabList));
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
            headerTabListTemp = headerTabListTemp.filter(
              (d) => d.key !== item.key && d.key !== item.children[0].key
            );
            dispatch(updateProjectList({ projectList: projectListTemp }));
            dispatch(changeHeaderTabList({ headerTabList: headerTabListTemp }));
          } else {
            // 安装
            message.success("安装成功");
            projectListTemp = [...projectListTemp, item];
            dispatch(updateProjectList({ projectList: projectListTemp }));
          }
        });
      },
      () => {
        sleep(1100).then((res: any) => {
          window.location.reload();
        });
      },
    ]);
  };
  return (
    <div className={styles.ImportProject}>
      {projectListInTime?.map((d, idx) => {
        return (
          <div className={styles.ImportProject_item} key={idx}>
            <div
              className={styles.ImportProject_item_info}
              style={{
                opacity: d.status ? 0.5 : 1,
              }}
            >
              <img src={d.image} alt="" />
              <p>{d.name}</p>
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
  );
});
