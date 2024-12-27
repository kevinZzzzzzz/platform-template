import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ColorPicker, Divider, Radio, Switch } from "antd";
import type { RadioChangeEvent } from "antd";
import React, { useState, useEffect, memo } from "react";
import styles from "./index.module.scss";
import { changeTheme } from "@/store/slice/LayoutSlice";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  changeAntdTokenStyle,
  changeColorWeaknessMode,
  changeExtendedPageBackground,
  changeGreyMode,
  changeSiderDeepFlag,
} from "@/store/slice/ThemeSlice";
import { Color } from "antd/es/color-picker";

const ThemeOptions = [
  { label: "浅色", value: "light" },
  { label: "暗色", value: "dark" },
];
function ThemeSetting(props: any) {
  const dispatch = useAppDispatch();
  const { theme, locale, projectList } = useAppSelector((store) => {
    return store.Layout;
  });
  const {
    siderDeepFlag,
    greyMode,
    colorWeaknessMode,
    ColorByTheme,
    AntdStyle,
    AntdTokenStyleMap,
    AntdTokenStyle,
    extendedPageBackground,
  } = useAppSelector((store) => {
    return store.Theme;
  });
  const [themeVal, setThemeVal] = useState(theme);
  const [greyModeVal, setGreyModeVal] = useState(greyMode);
  const [siderDeepFlagVal, setSiderDeepFlagVal] = useState(siderDeepFlag);
  const [colorWeaknessVal, setColorWeaknessVal] = useState(colorWeaknessMode);
  const [primaryColor, setPrimaryColor] = useState(AntdTokenStyle.colorPrimary);
  const [infoColor, setInfoColor] = useState(AntdTokenStyle.colorInfo);
  const [successColor, setSuccessColor] = useState(AntdTokenStyle.colorSuccess);
  const [warningColor, setWarningColor] = useState(AntdTokenStyle.colorWarning);
  const [errorColor, setErrorColor] = useState(AntdTokenStyle.colorError);
  const [extendedPageColorValue, setExtendedPageColorValue] = useState(
    extendedPageBackground
  );
  useEffect(() => {
    setThemeVal(theme);
  }, [theme]);
  const onChangeThemeVal = ({ target: { value } }: RadioChangeEvent) => {
    setThemeVal(value);
    dispatch(changeTheme({ theme: value }));
  };
  const onChangeSiderDeepFlag = (checked: boolean) => {
    setSiderDeepFlagVal(checked);
    dispatch(changeSiderDeepFlag({ siderDeepFlag: checked }));
  };
  const onChangeGreyPattern = (checked: boolean) => {
    setGreyModeVal(checked);
    dispatch(changeGreyMode({ greyMode: checked }));
  };
  const onChangeColorWeaknessMode = (checked: boolean) => {
    setColorWeaknessVal(checked);
    dispatch(changeColorWeaknessMode({ colorWeaknessMode: checked }));
  };
  const changePrimaryColor = (value) => {
    setPrimaryColor(value.toHexString());
    dispatch(
      changeAntdTokenStyle({
        AntdTokenStyle: {
          colorPrimary: value.toHexString(),
          colorLink: value.toHexString(),
        },
      })
    );
  };
  const changeInfoColor = (value) => {
    setInfoColor(value.toHexString());
    dispatch(
      changeAntdTokenStyle({
        AntdTokenStyle: {
          colorInfo: value.toHexString(),
        },
      })
    );
  };
  const changeSuccessColor = (value) => {
    setSuccessColor(value.toHexString());
    dispatch(
      changeAntdTokenStyle({
        AntdTokenStyle: {
          colorSuccess: value.toHexString(),
        },
      })
    );
  };
  const changeWarningColor = (value) => {
    setWarningColor(value.toHexString());
    dispatch(
      changeAntdTokenStyle({
        AntdTokenStyle: {
          colorWarning: value.toHexString(),
        },
      })
    );
  };
  const changeErrorColor = (value) => {
    setErrorColor(value.toHexString());
    dispatch(
      changeAntdTokenStyle({
        AntdTokenStyle: {
          colorError: value.toHexString(),
        },
      })
    );
  };
  const changeExtendedPageColor = (value) => {
    setExtendedPageColorValue(value.toHexString());
    dispatch(
      changeExtendedPageBackground({
        extendedPageBackground: value.toHexString(),
      })
    );
  };
  return (
    <div className={styles.ThemeSetting}>
      <Divider>
        <h4>主题配置</h4>
      </Divider>
      <div className={styles.ThemeSetting_blockCenter}>
        <Radio.Group
          block
          optionType="button"
          options={ThemeOptions}
          onChange={onChangeThemeVal}
          value={themeVal}
        />
      </div>
      {themeVal === "light" ? (
        <div className={styles.ThemeSetting_blockBetween}>
          <p className={styles.ThemeSetting_blockBetween_label}>深色侧边栏</p>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={siderDeepFlagVal}
            onChange={onChangeSiderDeepFlag}
          />
        </div>
      ) : (
        <></>
      )}
      <div className={styles.ThemeSetting_blockBetween}>
        <p className={styles.ThemeSetting_blockBetween_label}>灰色模式</p>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={greyModeVal}
          onChange={onChangeGreyPattern}
        />
      </div>
      <div className={styles.ThemeSetting_blockBetween}>
        <p className={styles.ThemeSetting_blockBetween_label}>色弱模式</p>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={colorWeaknessVal}
          onChange={onChangeColorWeaknessMode}
        />
      </div>
      <Divider>
        <h4>主题颜色</h4>
      </Divider>
      <div className={styles.ThemeSetting_blockBetween}>
        <p className={styles.ThemeSetting_blockBetween_label}>主色</p>
        <ColorPicker
          value={primaryColor}
          showText
          onChangeComplete={changePrimaryColor}
        />
      </div>
      <div className={styles.ThemeSetting_blockBetween}>
        <p className={styles.ThemeSetting_blockBetween_label}>信息色</p>
        <ColorPicker
          value={infoColor}
          showText
          onChangeComplete={changeInfoColor}
        />
      </div>
      <div className={styles.ThemeSetting_blockBetween}>
        <p className={styles.ThemeSetting_blockBetween_label}>成功色</p>
        <ColorPicker
          value={successColor}
          showText
          onChangeComplete={changeSuccessColor}
        />
      </div>
      <div className={styles.ThemeSetting_blockBetween}>
        <p className={styles.ThemeSetting_blockBetween_label}>警告色</p>
        <ColorPicker
          value={warningColor}
          showText
          onChangeComplete={changeWarningColor}
        />
      </div>
      <div className={styles.ThemeSetting_blockBetween}>
        <p className={styles.ThemeSetting_blockBetween_label}>错误色</p>
        <ColorPicker
          value={errorColor}
          showText
          onChangeComplete={changeErrorColor}
        />
      </div>
      <div className={styles.ThemeSetting_blockBetween}>
        <p className={styles.ThemeSetting_blockBetween_label}>扩展页背景色</p>
        <ColorPicker
          value={extendedPageColorValue}
          showText
          onChangeComplete={changeExtendedPageColor}
        />
      </div>
    </div>
  );
}
export default memo(ThemeSetting);
