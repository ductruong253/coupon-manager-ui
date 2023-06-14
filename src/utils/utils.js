import dayjs from "dayjs";

export function formatDate(date) {
    const formatted = dayjs(date).format("MM/DD/YYYY hh:mm:ss A");
    return formatted;
}