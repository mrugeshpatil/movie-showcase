type StatusProps = {
  //status: "loading" | "success" | "error";
  status: string;
};

export const StatusAPI = (props: StatusProps) => {
  const { status } = props;
  //let message;
  const message =
    status === "loading"
      ? "Loading movies..."
      : status === "success"
      ? "Movies Loaded!"
      : status === "error"
      ? "Error probelm loading movies!"
      : null;
  return <div>Status - {message}</div>;
};
