import { Status } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type TodoProps = {
  status: Status | undefined;
  setStatus: (value: Status) => void;
};

const StatusSelect = ({ status, setStatus }: TodoProps) => {
  const todoStatus = status !== undefined ? status : "ToDo";

  const getTableCellClass = (status: Status) => {
    let trigger =
      "border-medium-gray text-darker-gray bg-none focus:ring-medium-gray hover:bg-lighter-gray hover:text-black";
    let triggerIcon = "stroke-medium-gray";

    if (status === "Done") {
      trigger =
        "border-teal text-white bg-teal focus:ring-teal hover:bg-darker-teal hover:border-darker-teal hover:text-white";
      triggerIcon = "stroke-white";
    } else if (status === "InProgress") {
      trigger =
        "border-blue text-blue bg-none focus:ring-blue hover:text-darker-blue hover:border-darker-blue hover:bg:lighter-gray";
      triggerIcon = "stroke-blue";
    }

    return { trigger, triggerIcon };
  };

  const classes = getTableCellClass(todoStatus);
  return (
    <Select
      defaultValue={todoStatus}
      onValueChange={(value: Status) => setStatus(value)}
    >
      <SelectTrigger
        className={`w-28 ${classes.trigger}`}
        iconClassName={classes.triggerIcon}
      >
        <SelectValue
          placeholder={
            todoStatus === "ToDo"
              ? "To Do"
              : todoStatus === "InProgress"
              ? "In Progress"
              : "Done"
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ToDo">To Do</SelectItem>
          <SelectItem value="InProgress">In Progress</SelectItem>
          <SelectItem value="Done">Done</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
