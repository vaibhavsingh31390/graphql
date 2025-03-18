import { GraphQLError } from "graphql";

export const toIsoDate = (timestamp: Date | string | number): string => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return "----/--/--";
  }
  return date.toISOString().slice(0, 10);
};

export const GraphQlNotFoundCheck = (data: any, SchemaName: string) => {
  if (!data) {
    throw new GraphQLError(`${SchemaName} not found!`, {
      extensions: { code: "NOT_FOUND" },
    });
  } else {
    return data;
  }
};
