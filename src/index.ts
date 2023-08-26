interface DateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  yyyy: string;
  MM: string;
  dd: string;
  hh: string;
  mm: string;
  ss: string;
}

function getDateInfo(date: Date, isPad: boolean): DateInfo {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const padStartIfRequired = (value: number): string => {
    if (isPad) return value.toString().padStart(2, "0");
    return value.toString();
  };
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    yyyy: year.toString(),
    MM: padStartIfRequired(month),
    dd: padStartIfRequired(day),
    hh: padStartIfRequired(hour),
    mm: padStartIfRequired(minute),
    ss: padStartIfRequired(second),
  };
}

function getDateString(date: Date, formatter: string, isPad: boolean) {
  if (formatter === "date") {
    formatter = "yyyy-MM-dd";
  } else if (formatter === "datetime") {
    formatter = "yyyy-MM-dd hh:mm:ss";
  }
  const dateInfo = getDateInfo(date, isPad);
  const formattedDate = formatter.replace(/yyyy|MM|dd|hh|mm|ss/g, (match) => {
    switch (match) {
      case "yyyy":
        return dateInfo.yyyy;
      case "MM":
        return dateInfo.MM;
      case "dd":
        return dateInfo.dd;
      case "hh":
        return dateInfo.hh;
      case "mm":
        return dateInfo.mm;
      case "ss":
        return dateInfo.ss;
      default:
        return match;
    }
  });
  return formattedDate;
}

export function formate(
  date: Date,
  formatter: string | ((dateInfo: DateInfo) => string),
  isPad = false
): string {
  if (!date) return "";
  if (typeof formatter === "string") {
    return getDateString(date, formatter, isPad);
  }
  if (typeof formatter === "function") {
    return formatter(getDateInfo(date, isPad));
  }
  return "";
}
