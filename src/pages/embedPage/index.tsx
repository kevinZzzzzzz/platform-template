import React, { useState, useEffect } from "react";

function EmbedPage(props: any) {
  return (
    <div className="fixTopLayout">
      <iframe
        className="fixTopLayout_iframe"
        // src="http://192.168.120.178:8881/ColdChainWeb/index.html#/home"
        src="http://192.168.120.178:8883/"
      ></iframe>
    </div>
  );
}
export default EmbedPage;
