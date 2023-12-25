import { Input, Button, Skeleton } from "@nextui-org/react";

export default function LoadingRequestAccess() {
  return (
    <form className="flex flex-col gap-4 w-full items-center">
      <Skeleton className="md:w-1/2 w-full rounded-lg">
        <Input type="text" className="md:w-1/2 w-full" />
      </Skeleton>
      <Skeleton className="md:w-1/2 w-full rounded-lg">
        <Input type="password" className="md:w-1/2 w-full" />
      </Skeleton>
      <Skeleton className="md:w-1/2 w-full rounded-lg">
        <Input type="text" className="md:w-1/2 w-full" />
      </Skeleton>
      <Skeleton className="md:w-1/2 w-full rounded-lg">
        <Input type="text" className="md:w-1/2 w-full" />
      </Skeleton>

      <Skeleton className="md:w-1/2 w-full rounded-lg">
        <Button size="lg" className="md:w-1/2 w-full" />
      </Skeleton>
      <Skeleton className="md:w-1/2 w-full rounded-lg">
        <Button size="lg" className="md:w-1/2 w-full" />
      </Skeleton>
    </form>
  );
}
