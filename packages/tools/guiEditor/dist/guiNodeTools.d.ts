import { Checkbox } from "gui/2D/controls/checkbox";
import { ColorPicker } from "gui/2D/controls/colorpicker";
import { Ellipse } from "gui/2D/controls/ellipse";
import { Line } from "gui/2D/controls/line";
import { Rectangle } from "gui/2D/controls/rectangle";
import { Slider } from "gui/2D/controls/sliders/slider";
import { TextBlock } from "gui/2D/controls/textBlock";
import { Image } from "gui/2D/controls/image";
import { InputText } from "gui/2D/controls/inputText";
import { Grid } from "gui/2D/controls/grid";
import { DisplayGrid } from "gui/2D/controls/displayGrid";
import { StackPanel } from "gui/2D/controls/stackPanel";
import { RadioButton } from "gui/2D/controls/radioButton";
import { ImageBasedSlider } from "gui/2D/controls/sliders/imageBasedSlider";
export declare class GUINodeTools {
    static ImageControlDefaultUrl: string;
    static CreateControlFromString(data: string): Grid | Rectangle | StackPanel | Line | TextBlock | Image | Slider | ImageBasedSlider | RadioButton | InputText | ColorPicker | Ellipse | Checkbox | DisplayGrid;
}
