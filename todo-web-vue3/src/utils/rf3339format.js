export default function dateFormat(time) {
    const date = new Date(time)
    return new Date(
        +new Date(date.toJSON()) +
        8 * 3600 * 1000
    ).toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "")
}
