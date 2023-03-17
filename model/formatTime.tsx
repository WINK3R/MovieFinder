export function formatTime(time: number) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const minutesToDisplay = minutes < 10 ? `0${minutes}` : minutes
    return `${hours}h ${minutesToDisplay}m`;
}