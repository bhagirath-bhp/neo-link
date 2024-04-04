let hexString = "0123456789abcdef";
export const randomColor = () => {
    let hexCode = "#";
    for(let i=0; i<6; i++){
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
}

export const generateGrad = () => {
    let colorOne = randomColor();
    let colorTwo = randomColor();
    let angle = Math.floor(Math.random() * 360);
    const outputCode = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
    return {outputCode, colorOne, colorTwo};
}
