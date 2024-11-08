export function ClassNames(names, styleObject) {
    let string = "";
    for (const name in names) {
        if (names[name]) {
            string += styleObject[name] + " ";
        }
    }
    return string;
}
export function JoinClassNames(styleObject, ...names) {
    let string = "";
    for (const name of names) {
        if (name && styleObject[name]) {
            string += styleObject[name] + " ";
        }
    }
    return string;
}
//# sourceMappingURL=classNames.js.map