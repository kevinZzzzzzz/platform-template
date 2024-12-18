import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProjectList } from "@/store/slice/LayoutSlice";
import { AsynchronousList } from "@/utils";
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
  const { projectList, menuList } = useAppSelector((store: any) => {
    return store.Layout;
  });
  const projectListInTime = useMemo(() => {
    return importProjectList.map((d) => {
      return {
        ...d,
        status: +projectList?.includes(d.key),
      };
    });
  }, [projectList]);

  // 安装 删除项目
  const handleImport = (item, idx) => {
    let projectListTemp = JSON.parse(JSON.stringify(projectList));
    let menuListTemp = JSON.parse(JSON.stringify(menuList));
    AsynchronousList([
      () => {
        setLoadings((prev) => {
          let temp = [...prev];
          temp[idx] = true;
          return temp;
        });
      },
      () => {
        setTimeout(() => {
          setLoadings((prev) => {
            let temp = [...prev];
            temp[idx] = false;
            return temp;
          });
        }, 1000);
      },
      () => {
        setTimeout(() => {
          if (item.status) {
            // 卸载
            message.success("卸载成功");
            projectListTemp = projectListTemp.filter((d) => d !== item.key);
            dispatch(updateProjectList({ projectList: projectListTemp }));
            menuListTemp = menuListTemp.filter(
              (d) => d.menukey !== item.menukey
            );
          } else {
            // 安装
            message.success("安装成功");
            dispatch(
              updateProjectList({ projectList: [...projectListTemp, item.key] })
            );
            // const obj = new ImportMenu(item);
            // console.log(obj);
            menuListTemp.push({
              icon: item.icon,
              key: item.key,
              label: item.name,
              path: item.path,
              title: item.name,
              disabled: false,
              type: null,
              menukey: item.menukey,
              children: item.children,
            });
          }
          window.$busInc.emit("updateMenu", {
            MenuInitList: menuListTemp,
          });
        }, 1000);
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
