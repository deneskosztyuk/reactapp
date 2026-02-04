declare module "react-smooth-scrolll" {
  import { ReactNode } from "react";

  export interface SmoothScrollProps {
    children: ReactNode;
    enabled?: boolean;
    behavior?: ScrollBehavior;
  }

  export const SmoothScroll: React.FC<SmoothScrollProps>;
  export default SmoothScroll;
}
