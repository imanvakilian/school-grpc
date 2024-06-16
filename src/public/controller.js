import autoBind from "auto-bind";

export class Controller {
    constructor() {
        return autoBind(this);
    }
}