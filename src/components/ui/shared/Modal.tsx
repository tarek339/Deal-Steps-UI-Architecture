import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModalProps } from "@/types/interfaces/components";

const Modal = ({ tigger, title, description, footer }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger className="text-red-600 hover:underline">
        {tigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {
            <>
              <DialogClose>
                <span className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                  Cancel
                </span>
              </DialogClose>
              {footer}
            </>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
