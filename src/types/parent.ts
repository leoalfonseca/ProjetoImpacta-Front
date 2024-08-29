import { ElementProps } from "./element";
import { InstallationProps } from "./installations";
import { IunitOfMeasure } from "./unit";

export type ParentType = {
  id: string;
  unit: string;
  name: string;
  isActive: boolean;
  element: ElementProps;
  elementItemStatus: string;
  unitOfMeasure: IunitOfMeasure;
  installation: InstallationProps;
};
