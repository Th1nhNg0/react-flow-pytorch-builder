import Conv2d, { defaultNodeType as Conv2dDefaultProps } from "./Conv2d";
import Flatten, { defaultNodeType as FlattenDefaultProps } from "./Flatten";
import MaxPool2d, {
  defaultNodeType as MaxPool2dDefaultProps,
} from "./MaxPool2d";
import ReLU, { defaultNodeType as ReluDefaultProps } from "./ReLU";
import Linear, { defaultNodeType as LinearDefaultProps } from "./Linear";
import Dropout, { defaultNodeType as DropoutDefaultProps } from "./Dropout";
import LayerNorm, {
  defaultNodeType as LayerNormDefaultProps,
} from "./LayerNorm";
import BatchNorm2d, {
  defaultNodeType as BatchNorm2dDefaultProps,
} from "./BatchNorm2d";
import Start from "./Start";

export const nodeTypes = {
  Start: Start,
  Conv2d: Conv2d,
  ReLU: ReLU,
  MaxPool2d: MaxPool2d,
  Flatten: Flatten,
  Linear: Linear,
  Dropout: Dropout,
  LayerNorm: LayerNorm,
  BatchNorm2d: BatchNorm2d,
};

export const nodeDefaultProps = {
  Conv2d: Conv2dDefaultProps,
  Flatten: FlattenDefaultProps,
  MaxPool2d: MaxPool2dDefaultProps,
  ReLU: ReluDefaultProps,
  Linear: LinearDefaultProps,
  Dropout: DropoutDefaultProps,
  LayerNorm: LayerNormDefaultProps,
  BatchNorm2d: BatchNorm2dDefaultProps,
};
