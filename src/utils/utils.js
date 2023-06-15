import dayjs from "dayjs";

export function formatDate(date, option) {
    let formatted;
    if (option && option === 'PICKER') {
        formatted = dayjs(date).format("YYYY-MM-DDTHH:mm");
        console.log(formatted)
    } else {
        formatted = dayjs(date).format("MM/DD/YYYY hh:mm:ss A");
    }
    return formatted;
}