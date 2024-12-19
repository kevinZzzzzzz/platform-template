import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function EmbedPage(props: any) {
  const location = useLocation();
  const [url, setUrl] = useState("");
  useEffect(() => {
    const [firstPart, secondPart] = splitPath(location.pathname);
    const u = `${window.location.origin}${firstPart}/index.html#${secondPart}`;
    setUrl(u);
  }, [location]);

  function splitPath(path) {
    const parts = path.split("/");
    // 处理路径并返回切割后的部分
    const firstPart = "/" + parts[1];
    const secondPart = "/" + parts.slice(2).join("/");
    return [firstPart, secondPart];
  }
  return (
    <div className="fixTopLayout">
      <iframe
        className="fixTopLayout_iframe"
        // src="http://192.168.120.178:8881/ColdChainWeb/index.html#/home"
        // src="http://192.168.120.178:8883/"
        src={url}
      ></iframe>
    </div>
  );
}
export default EmbedPage;
