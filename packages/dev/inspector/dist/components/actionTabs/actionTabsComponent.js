import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { TabsComponent } from "./tabsComponent";
import { faFileAlt, faWrench, faBug, faChartBar, faCog } from "@fortawesome/free-solid-svg-icons";
import { StatisticsTabComponent } from "./tabs/statisticsTabComponent";
import { DebugTabComponent } from "./tabs/debugTabComponent";
import { Resizable } from "re-resizable";
import { PropertyGridTabComponent } from "./tabs/propertyGridTabComponent";
import { HeaderComponent } from "../headerComponent";
import { ToolsTabComponent } from "./tabs/toolsTabComponent";
import { SettingsTabComponent } from "./tabs/settingsTabComponent";
import "./actionTabs.scss";
const ResizableCasted = Resizable;
export class ActionTabsComponent extends React.Component {
    constructor(props) {
        super(props);
        this._once = true;
        let initialIndex = props.initialTab === undefined ? 0 /* DebugLayerTab.Properties */ : props.initialTab;
        if (this.props.globalState) {
            const validationResults = this.props.globalState.validationResults;
            if (validationResults) {
                if (validationResults.issues.numErrors || validationResults.issues.numWarnings) {
                    initialIndex = 3 /* DebugLayerTab.Tools */;
                }
            }
        }
        this.state = { selectedEntity: null, selectedIndex: initialIndex };
    }
    componentDidMount() {
        if (this.props.globalState) {
            this._onSelectionChangeObserver = this.props.globalState.onSelectionChangedObservable.add((entity) => {
                this.setState({ selectedEntity: entity, selectedIndex: 0 /* DebugLayerTab.Properties */ });
            });
            this._onTabChangedObserver = this.props.globalState.onTabChangedObservable.add((index) => {
                this.setState({ selectedIndex: index });
            });
        }
    }
    componentWillUnmount() {
        if (this.props.globalState) {
            if (this._onSelectionChangeObserver) {
                this.props.globalState.onSelectionChangedObservable.remove(this._onSelectionChangeObserver);
            }
            if (this._onTabChangedObserver) {
                this.props.globalState.onTabChangedObservable.remove(this._onTabChangedObserver);
            }
        }
    }
    changeSelectedTab(index) {
        if (this.props.globalState) {
            this.props.globalState.onTabChangedObservable.notifyObservers(index);
        }
    }
    renderContent() {
        if (this.props.globalState && this.props.scene) {
            return (_jsxs(TabsComponent, { selectedIndex: this.state.selectedIndex, onSelectedIndexChange: (value) => this.changeSelectedTab(value), children: [_jsx(PropertyGridTabComponent, { title: "Properties", icon: faFileAlt, scene: this.props.scene, selectedEntity: this.state.selectedEntity, globalState: this.props.globalState, onSelectionChangedObservable: this.props.globalState.onSelectionChangedObservable, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable }), _jsx(DebugTabComponent, { title: "Debug", icon: faBug, scene: this.props.scene, globalState: this.props.globalState }), _jsx(StatisticsTabComponent, { title: "Statistics", icon: faChartBar, scene: this.props.scene, globalState: this.props.globalState }), _jsx(ToolsTabComponent, { title: "Tools", icon: faWrench, scene: this.props.scene, globalState: this.props.globalState }), _jsx(SettingsTabComponent, { title: "Settings", icon: faCog, scene: this.props.scene, globalState: this.props.globalState })] }));
        }
        else {
            return null;
        }
    }
    onClose() {
        if (!this.props.onClose) {
            return;
        }
        this.props.onClose();
    }
    onPopup() {
        if (!this.props.onPopup) {
            return;
        }
        this.props.onPopup();
    }
    render() {
        if (this.props.popupMode) {
            return (_jsxs("div", { id: "actionTabs", children: [!this.props.noHeader && (_jsx(HeaderComponent, { title: "INSPECTOR", handleBack: true, noClose: this.props.noClose, noExpand: this.props.noExpand, noCommands: this.props.noCommands, onClose: () => this.onClose(), onPopup: () => this.onPopup(), onSelectionChangedObservable: this.props.globalState ? this.props.globalState.onSelectionChangedObservable : undefined })), this.renderContent()] }));
        }
        if (this._once) {
            this._once = false;
            // A bit hacky but no other way to force the initial width to 300px and not auto
            setTimeout(() => {
                const element = document.getElementById("actionTabs");
                if (!element) {
                    return;
                }
                element.style.width = "200px";
            }, 150);
        }
        return (_jsxs(ResizableCasted, { id: "actionTabs", minWidth: 300, maxWidth: 600, defaultSize: { height: "100%" }, minHeight: "100%", enable: { top: false, right: false, bottom: false, left: true, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }, children: [!this.props.noHeader && (_jsx(HeaderComponent, { title: "INSPECTOR", handleBack: true, noClose: this.props.noClose, noExpand: this.props.noExpand, noCommands: this.props.noCommands, onClose: () => this.onClose(), onPopup: () => this.onPopup(), onSelectionChangedObservable: this.props.globalState ? this.props.globalState.onSelectionChangedObservable : undefined })), this.renderContent()] }));
    }
}
//# sourceMappingURL=actionTabsComponent.js.map