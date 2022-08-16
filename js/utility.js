function addEntityCode(text, arr, replArr) {
    for (let i = 0; i < arr.length; i++) {
        text = text.replace(arr[i], replArr[i]);
    }
    return (text);
}
export { addEntityCode };