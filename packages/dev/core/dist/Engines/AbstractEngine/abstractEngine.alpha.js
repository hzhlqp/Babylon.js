import { AbstractEngine } from "../abstractEngine";
import { Constants } from "../constants";
AbstractEngine.prototype.setAlphaEquation = function (equation) {
    if (this._alphaEquation === equation) {
        return;
    }
    switch (equation) {
        case Constants.ALPHA_EQUATION_ADD:
            this._alphaState.setAlphaEquationParameters(Constants.GL_ALPHA_EQUATION_ADD, Constants.GL_ALPHA_EQUATION_ADD);
            break;
        case Constants.ALPHA_EQUATION_SUBSTRACT:
            this._alphaState.setAlphaEquationParameters(Constants.GL_ALPHA_EQUATION_SUBTRACT, Constants.GL_ALPHA_EQUATION_SUBTRACT);
            break;
        case Constants.ALPHA_EQUATION_REVERSE_SUBTRACT:
            this._alphaState.setAlphaEquationParameters(Constants.GL_ALPHA_EQUATION_REVERSE_SUBTRACT, Constants.GL_ALPHA_EQUATION_REVERSE_SUBTRACT);
            break;
        case Constants.ALPHA_EQUATION_MAX:
            this._alphaState.setAlphaEquationParameters(Constants.GL_ALPHA_EQUATION_MAX, Constants.GL_ALPHA_EQUATION_MAX);
            break;
        case Constants.ALPHA_EQUATION_MIN:
            this._alphaState.setAlphaEquationParameters(Constants.GL_ALPHA_EQUATION_MIN, Constants.GL_ALPHA_EQUATION_MIN);
            break;
        case Constants.ALPHA_EQUATION_DARKEN:
            this._alphaState.setAlphaEquationParameters(Constants.GL_ALPHA_EQUATION_MIN, Constants.GL_ALPHA_EQUATION_ADD);
            break;
    }
    this._alphaEquation = equation;
};
//# sourceMappingURL=abstractEngine.alpha.js.map