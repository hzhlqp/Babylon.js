import type { Observable } from "core/Misc/observable";
import type { PhysicsBody } from "core/Physics/v2/physicsBody";
import type { GlobalState } from "inspector/components/globalState";
import type { PropertyChangedEvent } from "inspector/components/propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
/**
 * Properties of the physics mass properties grid component.
 */
export interface IPhysicsMassPropertiesGridComponentProps {
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
    /**
     * Index of the instance to edit
     */
    instanceIndex?: number;
}
/**
 * Component that displays the mass properties of a physics body.
 * @param props the component props
 * @returns the component
 */
export declare function PhysicsMassPropertiesGridComponent(props: IPhysicsMassPropertiesGridComponentProps): import("react/jsx-runtime").JSX.Element;
