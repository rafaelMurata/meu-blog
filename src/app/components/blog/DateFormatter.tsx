import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  try {
    if (!dateString) return null; // Return null if dateString is empty or undefined

    const date = parseISO(dateString);
    return (
      <time className="text-slate-400" dateTime={dateString}>
        {format(date, "dd-MM-yyyy")}
      </time>
    );
  } catch (error) {
    console.error("Invalid date string:", dateString);
    return null; // Return null if dateString is not a valid ISO date string
  }
};

export default DateFormatter;