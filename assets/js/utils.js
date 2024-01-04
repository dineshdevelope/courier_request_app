import * as dayjs from "dayjs";

export function formatMyDate(date, format = "D, MMM -YYYY, hh:mma") {
  return dayjs(date).format(format);
}
