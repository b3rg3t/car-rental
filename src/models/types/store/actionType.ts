import { ActionMap } from "./actionMap";
import { CarPayload } from "./carPayload";

export type ActionType = ActionMap<CarPayload>[keyof ActionMap<CarPayload>];
