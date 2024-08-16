export default function secToMinSec(s: number) {
  const sign = s < 0 ? "-" : ""; // Capture the sign if the value is negative
  s = Math.abs(s); // Work with the absolute value for time calculations

  if (s >= 3600) {
    // 3600 seconds = 1 hour
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = Math.floor(s % 60);
    return `${sign}${hours}:${convertToTwoDigits(minutes)}:${convertToTwoDigits(seconds)}`;
  } else {
    const minutes = Math.floor(s / 60);
    const seconds = Math.floor(s % 60);
    return `${sign}${convertToTwoDigits(minutes)}:${convertToTwoDigits(seconds)}`;
  }
}

function convertToTwoDigits(number: number) {
  return number < 10 ? `0${number}` : number.toString();
}
