import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.jsx";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function ProfilePage() {
  return (
    <div
      className={
        "flex flex-col items-center justify-center gap-5 p-5 h-[calc(100vh-100px)] bg-white rounded-lg"
      }
    >
      <Avatar className={"w-60 h-60"}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className={"flex flex-col text-center gap-3"}>
        <span className={"font-bold text-4xl"}>Gabriel Cesar Hutagalung</span>
        <span className={"text-2xl"}>Petani Coding</span>
      </div>

      <div>
        <Table>
          {/*<TableCaption>Tentang Gabriel</TableCaption>*/}
          <TableBody>
            <TableRow>
              <TableCell className={"font-bold"}>Email</TableCell>
              <TableCell>gabrielhutagalung970@gmail.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={"font-bold lg:w-32"}>Username</TableCell>
              <TableCell>gabrielhtg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={"font-bold"}>Status</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
