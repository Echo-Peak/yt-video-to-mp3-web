import {
  format,
  isToday,
  isYesterday,
  isThisWeek,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";

export const convertToFriendlyDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  if (isToday(date)) {
    return `Today at ${format(date, "h:mma")}`;
  }
  if (isYesterday(date)) {
    return `Yesterday at ${format(date, "h:mma")}`;
  }
  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return `Last ${format(date, "EEEE")} at ${format(date, "h:mma")}`;
  }
  const weeksAgo = differenceInWeeks(now, date);
  if (weeksAgo < 5) {
    return `${weeksAgo} week${weeksAgo === 1 ? "" : "s"} ago (${format(
      date,
      "yyyy-MM-dd"
    )})`;
  }
  const monthsAgo = differenceInMonths(now, date);
  if (monthsAgo < 12) {
    return `${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago (${format(
      date,
      "yyyy-MM-dd"
    )})`;
  }
  return format(date, "yyyy-MM-dd");
};
