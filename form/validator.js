import {
    isNotEmpty,
    isMinimum,
    isMaximum
} from "./rules";

export const validator = (rule) => {
    if (rule.includes(":")) {
        let [ruleFunction, parameter] = rule.split(':');
        switch (ruleFunction) {
            case 'min':
                return {
                    validationRule: isMinimum(parameter),
                    error: `Minimum length ${parameter}`
                };
            case 'max':
                return {
                    validationRule: isMaximum(parameter),
                    error: `Maximum length ${parameter}`
                };
            default:
                return null;
        }
    } else {
        switch (rule) {
            case 'required':
                return {
                    validationRule: isNotEmpty,
                    error: 'This is required'
                };
                defaut:
                    return null;
        }

    }
}