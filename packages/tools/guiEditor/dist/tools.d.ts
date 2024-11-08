import type { Control } from "gui/2D/controls/control";
import type { Grid } from "gui/2D/controls/grid";
import { Vector2 } from "core/Maths/math";
export declare class Tools {
    static LookForItems(item: any, selectedEntities: any[], firstIteration?: boolean): boolean;
    private static _RecursiveRemoveHiddenMeshesAndHoistChildren;
    static SortAndFilter(parent: any, items: any[]): any[];
    static GetCellInfo(grid: Grid, control: Control): Vector2;
    static ReorderGrid(grid: Grid, index: number, control: Control, cell: Vector2): void;
}
