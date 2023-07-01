export function formatNumber(num: number): string {
  num = num / 10 ** 18;
  if (Math.abs(num) >= 1.0e9) {
    // Billions
    return trimZeros((Math.abs(num) / 1.0e9).toFixed(3)) + "B";
  } else if (Math.abs(num) >= 1.0e6) {
    // Millions
    return trimZeros((Math.abs(num) / 1.0e6).toFixed(3)) + "M";
  } else if (Math.abs(num) >= 1.0e3) {
    // Thousands
    return trimZeros((Math.abs(num) / 1.0e3).toFixed(3)) + "K";
  } else {
    return Math.abs(num).toString();
  }
}

function trimZeros(formattedNum: string): string {
  // Remove trailing zeros after the decimal and the decimal point itself if not required
  return formattedNum.indexOf(".") !== -1
    ? formattedNum.replace(/0+$/, "").replace(/\.$/, "")
    : formattedNum;
}
