import { Button, Input, Skeleton } from "@nextui-org/react";

export default function LoadingLogin() {
  return (
    <form className="flex flex-col gap-4 w-full items-center">
      <Skeleton className="md:w-1/2 w-full rounded-large">
        <Input className="md:w-1/2 w-full" />
      </Skeleton>

      <Skeleton className="md:w-1/2 w-full rounded-large">
        <Input className="md:w-1/2 w-full" />
      </Skeleton>

      <Skeleton className="md:w-1/2 w-full rounded-large">
        <Button size="lg" className="md:w-1/2 w-full" />{" "}
      </Skeleton>

      <Skeleton className="md:w-1/2 w-full rounded-large">
        <Button size="lg" className="md:w-1/2 w-full" />
      </Skeleton>
    </form>
  );
}
