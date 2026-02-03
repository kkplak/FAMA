declare module "@react-three/fiber" {
  import * as React from "react";

  export const Canvas: React.FC<any>;
  export function useFrame(cb: any): void;
  export function useThree(): any;

  const _default: any;
  export default _default;
}
