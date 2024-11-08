import type { Observable } from "core/Misc/observable";
import type { PhysicsBody } from "core/Physics/v2/physicsBody";
import type { GlobalState } from "inspector/components/globalState";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
/**
 * Properties of the physics material grid component.
 */
export interface IPhysicsMaterialGridComponentProps {
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
 * Component that displays the physic material properties of a physics body.
 * @param props the component props
 * @returns the component
 */
export declare function PhysicsMaterialGridComponent(props: IPhysicsMaterialGridComponentProps): import("react/jsx-runtime").JSX.Element;
