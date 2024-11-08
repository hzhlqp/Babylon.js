import type { Observable } from "core/Misc/observable";
import type { PhysicsBody } from "core/Physics/v2/physicsBody";
import type { GlobalState } from "inspector/components/globalState";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
/**
 * Properties of the physics body grid component.
 */
export interface IPhysicsBodyGridComponentProps {
    /**
     * Lock object
     */
    lockObject: LockObject;
    /**
     * Callback raised on the property changed event
     */
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    /**
     * Physics body to edit
     */
    body: PhysicsBody;
    /**
     * Global state
     */
    globalState: GlobalState;
}
/**
 * Component that allows displaying and tweaking a physics body's properties.
 * @param props the component props
 * @returns the component
 */
export declare function PhysicsBodyGridComponent(props: IPhysicsBodyGridComponentProps): import("react/jsx-runtime").JSX.Element;
