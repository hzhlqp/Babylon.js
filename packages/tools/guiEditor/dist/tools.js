import { Vector2 } from "core/Maths/math";
export class Tools {
    static LookForItems(item, selectedEntities, firstIteration = true) {
        if (selectedEntities.length == 0) {
            return false;
        }
        if (!firstIteration && selectedEntities.includes(item)) {
            return true;
        }
        const children = item.getChildren ? item.getChildren() : item.children;
        if (children) {
            for (const child of children) {
                if (Tools.LookForItems(child, selectedEntities, false)) {
                    return true;
                }
            }
        }
        return false;
    }
    static _RecursiveRemoveHiddenMeshesAndHoistChildren(items) {
        const result = [];
        for (const i of items) {
            // If the mesh is hidden, add it's children that are not hidden, this will handle the case of bounding box parenting for bounding box gizmo
            if (i.reservedDataStore && i.reservedDataStore.hidden && i.getChildMeshes) {
                Tools._RecursiveRemoveHiddenMeshesAndHoistChildren(i.getChildMeshes()).forEach((m) => {
                    result.push(m);
                });
            }
            else if (!i.reservedDataStore || !i.reservedDataStore.hidden) {
                result.push(i);
            }
        }
        return result;
    }
    static SortAndFilter(parent, items) {
        if (!items) {
            return [];
        }
        const finalArray = Tools._RecursiveRemoveHiddenMeshesAndHoistChildren(items);
        if (parent && parent.reservedDataStore && parent.reservedDataStore.detachedChildren) {
            finalArray.push(...parent.reservedDataStore.detachedChildren);
        }
        return finalArray.reverse();
    }
    static GetCellInfo(grid, control) {
        const cellInfo = grid.getChildCellInfo(control);
        let rowNumber = parseInt(cellInfo.substring(0, cellInfo.search(":")));
        if (isNaN(rowNumber)) {
            rowNumber = 0;
        }
        let columnNumber = parseInt(cellInfo.substring(cellInfo.search(":") + 1));
        if (isNaN(columnNumber)) {
            columnNumber = 0;
        }
        return new Vector2(rowNumber, columnNumber);
    }
    static ReorderGrid(grid, index, control, cell) {
        const tags = [];
        const controls = [];
        const length = grid.children.length;
        for (let i = index; i < length; ++i) {
            const control = grid.children[index];
            controls.push(control);
            tags.push(Tools.GetCellInfo(grid, control));
            grid.removeControl(control);
        }
        grid.addControl(control, cell.x, cell.y);
        for (let i = 0; i < controls.length; ++i) {
            grid.addControl(controls[i], tags[i].x, tags[i].y);
        }
    }
}
//# sourceMappingURL=tools.js.map