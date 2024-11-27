import React, { useState, useEffect } from "react";
import useTitle from "@/hooks/useTitle";

function GuardRouteComp({ children, ...props }) {
  useTitle(props.name);
  return <>{children}</>;
}
export default GuardRouteComp;
