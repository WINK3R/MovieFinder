export function formatTime(time: number) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}h ${minutes < 10 ? `0${minutes}` : minutes}m`;
}