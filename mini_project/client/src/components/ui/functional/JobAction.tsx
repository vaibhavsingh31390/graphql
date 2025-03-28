import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isAuthenticated } from "@/lib/helpers";
import { getCompanysList, Job } from "@/lib/graphql/queries";
import ClientPostForm from "./ClientPostForm";
import ClientPostDeleteForm from "./ClientPostDeleteForm";

export interface JobAttr {
  job: Job;
}

async function JobAction({ job }: JobAttr) {
  const companys = await getCompanysList();
  const auth = await isAuthenticated();

  if (!auth?.auth || !job?.showActions) {
    return null;
  }

  const actions = [
    {
      icon: <RxUpdate size={28} color="#000" />,
      name: "Update",
      dialogTitle: "Update Job Posting",
      dialogDescription: "Make changes to your job posting here.",
      content: <ClientPostForm companys={companys} job={job} create={false} />,
    },
    {
      icon: <MdDelete size={28} color="red" />,
      name: "Delete",
      dialogTitle: "Are you sure you wannna delete this job?",
      dialogDescription: "",
      content: <ClientPostDeleteForm id={job.id.toString()} />,
    },
  ];

  return (
    <div className="flex flex-row gap-5">
      {actions.map((action, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <button
              title={action.name}
              className="cursor-pointer hover:opacity-70 transition-opacity"
              aria-label={action.name}
            >
              {action.icon}
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[var(--background)]">
            <DialogHeader>
              <DialogTitle>{action.dialogTitle}</DialogTitle>
              <DialogDescription>{action.dialogDescription}</DialogDescription>
            </DialogHeader>
            {action.content}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

export default JobAction;
