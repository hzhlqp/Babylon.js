import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Color3 } from "core/Maths/math.color";
import { useEffect, useState } from "react";
import { ColorPickerLine } from "shared-ui-components/lines/colorPickerComponent";
import { faSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { Engine } from "core/Engines/engine";
export const PerformanceViewerSidebarComponent = (props) => {
    const { collector, onVisibleRangeChangedObservable } = props;
    // Map from id to IPerfMetadata information
    const [metadataMap, setMetadataMap] = useState();
    // Map from category to all the ids belonging to that category
    const [metadataCategoryId, setMetadataCategoryId] = useState();
    // Count how many elements are checked for that category
    const [metadataCategoryChecked, setMetadataCategoryChecked] = useState();
    // List of ordered categories
    const [metadataCategories, setMetadataCategories] = useState();
    // Min/Max/Current values of the ids
    const [valueMap, setValueMap] = useState();
    useEffect(() => {
        if (!onVisibleRangeChangedObservable) {
            return;
        }
        const observer = (props) => {
            setValueMap(props.valueMap);
        };
        onVisibleRangeChangedObservable.add(observer);
        return () => {
            onVisibleRangeChangedObservable.removeCallback(observer);
        };
    }, [onVisibleRangeChangedObservable]);
    useEffect(() => {
        const onUpdateMetadata = (metadata) => {
            const newCategoryIdMap = new Map();
            const newCategoryCheckedMap = new Map();
            metadata.forEach((value, id) => {
                const currentCategory = value.category ?? "";
                const currentIds = newCategoryIdMap.get(currentCategory) ?? [];
                let currentChecked = newCategoryCheckedMap.get(currentCategory) ?? 0;
                currentIds.push(id);
                newCategoryIdMap.set(currentCategory, currentIds);
                if (!value.hidden) {
                    currentChecked += 1;
                }
                newCategoryCheckedMap.set(currentCategory, currentChecked);
            });
            const orderedCategories = Array.from(newCategoryIdMap.keys());
            orderedCategories.sort();
            setMetadataCategoryId(newCategoryIdMap);
            setMetadataCategoryChecked(newCategoryCheckedMap);
            setMetadataMap(metadata);
            setMetadataCategories(orderedCategories);
        };
        collector.metadataObservable.add(onUpdateMetadata);
        return () => {
            collector.metadataObservable.removeCallback(onUpdateMetadata);
        };
    }, []);
    const onCheckChange = (id) => (selected) => {
        collector.updateMetadata(id, "hidden", !selected);
    };
    const onCheckAllChange = (category) => (selected) => {
        const categoryIds = metadataCategoryId?.get(category);
        categoryIds?.forEach((id) => {
            collector.updateMetadata(id, "hidden", !selected);
        });
    };
    const onColorChange = (id) => (color) => {
        collector.updateMetadata(id, "color", color);
    };
    return (_jsx("div", { id: "performance-viewer-sidebar", children: metadataCategories &&
            metadataCategories.map((category) => (_jsxs("div", { children: [category ? (_jsxs("div", { className: "category-header header sidebar-item", children: [_jsx("span", { className: "category", children: category }), _jsx(CheckBoxLineComponent, { isSelected: () => metadataCategoryChecked?.get(category) === metadataCategoryId?.get(category)?.length, onSelect: onCheckAllChange(category), faIcons: { enabled: faCheckSquare, disabled: faSquare } })] }, `header-${category}`)) : (_jsxs("div", { className: "version-header sidebar-item", children: [_jsx("span", { className: "category", children: "Version:" }), _jsx("span", { className: "value", children: Engine.Version })] }, "header-version")), metadataCategoryId?.get(category)?.map((id) => {
                        const metadata = metadataMap?.get(id);
                        const range = valueMap?.get(id);
                        return (metadata && (_jsxs("div", { className: "sidebar-item measure", children: [_jsxs("div", { className: "category", children: [_jsx(CheckBoxLineComponent, { isSelected: () => !metadata.hidden, onSelect: onCheckChange(id), faIcons: { enabled: faCheckSquare, disabled: faSquare } }), _jsx(ColorPickerLine, { value: Color3.FromHexString(metadata.color ?? "#000"), onColorChanged: onColorChange(id), shouldPopRight: true }), _jsx("span", { className: "sidebar-item-label", children: id })] }), range && _jsxs("div", { className: "value", children: [" ", ((range.min + range.max) / 2).toFixed(2), " "] })] }, `perf-sidebar-item-${id}`)));
                    })] }, `category-${category || "version"}`))) }));
};
//# sourceMappingURL=performanceViewerSidebarComponent.js.map