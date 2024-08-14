"use client"

import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Trash } from "lucide-react";
import { Label } from "./ui/label";

interface DeleteDialogProps {
    onDelete: (e: any) => void;
}

export default function DeleteDialog({onDelete}: DeleteDialogProps) {

    return(
        <Dialog>
            <DialogTrigger>
                <Button className="bg-red-400 hover:bg-red-300">
                    <Trash className="h-3 w-3" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <Label>Hapus Data</Label>
                </DialogHeader>
                <DialogDescription>
                    Apakah anda yakin ingin menghapus data ini?
                </DialogDescription>
                <DialogFooter>
                    <Button className="bg-red-500 hover:bg-red-400" onClick={onDelete}>
                        Hapus
                    </Button>
                    <DialogClose>
                        Batal
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}