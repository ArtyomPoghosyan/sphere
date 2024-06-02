import { DateFormat } from "@/constants";
import moment from "moment";

export const currentDate = moment().format(DateFormat.CURRENTDATE);