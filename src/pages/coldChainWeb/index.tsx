import React, { useState, useEffect } from "react";

function ColdChainWeb(props: any) {
  return (
    <div className="fixTopLayout">
      <iframe
        className="fixTopLayout_iframe"
        src="http://192.168.120.178:8881/ColdChainWeb/index.html#/assetManage/transBox"
      ></iframe>
    </div>
  );
}
export default ColdChainWeb;
