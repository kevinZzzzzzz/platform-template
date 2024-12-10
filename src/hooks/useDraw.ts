import { useAppDispatch } from "@/store/hooks";
import { changeCollapsed } from "@/store/slice/LayoutSlice";
import { Drawer, DrawerProps } from "antd";
import React, { useState, useEffect } from "react";

function UseDraws() {
  const dispatch = useAppDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");

  const showDrawer = () => {
    setDrawerOpen(true);
    dispatch(changeCollapsed({ collapsed: true }));
  };
  const onDrawerClose = () => {
    setDrawerOpen(false);
  };
  return { placement, drawerOpen, showDrawer, onDrawerClose };
}
export default UseDraws;
