import { Observable } from "core/Misc/observable";
/**
 * Receives Telemetry events and raises events to the API
 */
export class TelemetryManager {
    constructor() {
        /**
         *
         */
        this.onEventBroadcastedObservable = new Observable();
        this._event = this._eventEnabled;
    }
    /**
     * Receives a telemetry event
     */
    get broadcast() {
        return this._event;
    }
    /**
     * Log a Telemetry event for errors raised on the WebGL context.
     * @param engine The Babylon engine with the WebGL context.
     * @param viewerId
     */
    flushWebGLErrors(engine, viewerId) {
        if (!engine) {
            return;
        }
        let logErrors = true;
        while (logErrors) {
            const error = engine.getError();
            if (error === 0) {
                logErrors = false;
            }
            else {
                this.broadcast("WebGL Error", viewerId, { error: error });
            }
        }
    }
    /**
     * Enable or disable telemetry events
     * @param enabled Boolean, true if events are enabled
     */
    set enable(enabled) {
        if (enabled) {
            this._event = this._eventEnabled;
        }
        else {
            this._event = this._eventDisabled;
        }
    }
    /**
     * Called on event when disabled, typically do nothing here
     */
    _eventDisabled() {
        // nothing to do
    }
    /**
     * Called on event when enabled
     * @param event - The name of the Telemetry event
     * @param viewerId
     * @param details An additional value, or an object containing a list of property/value pairs
     */
    _eventEnabled(event, viewerId, details) {
        const telemetryData = {
            viewerId,
            event: event,
            session: this.session,
            date: new Date(),
            now: window.performance ? window.performance.now() : Date.now(),
            detail: null,
        };
        if (typeof details === "object") {
            for (const attr in details) {
                if (Object.prototype.hasOwnProperty.call(details, attr)) {
                    telemetryData[attr] = details[attr];
                }
            }
        }
        else if (details) {
            telemetryData.detail = details;
        }
        this.onEventBroadcastedObservable.notifyObservers(telemetryData);
    }
    /**
     * Returns the current session ID or creates one if it doesn't exist
     * @returns The current session ID
     */
    get session() {
        if (!this._currentSessionId) {
            //String + Timestamp + Random Integer
            this._currentSessionId = "SESSION_" + Date.now() + Math.floor(Math.random() * 0x10000);
        }
        return this._currentSessionId;
    }
    /**
     * Disposes the telemetry manager
     */
    dispose() {
        this.onEventBroadcastedObservable.clear();
    }
}
export const telemetryManager = new TelemetryManager();
//# sourceMappingURL=telemetryManager.js.map