type Props = {
  params: {
    id: string;
  };
};

export const GET = async (request: Request, { params }: Props) => {
  const { id } = params;
  return Response.json({
    id,
    name: "Product Name",
  });
};
