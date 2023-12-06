import { GraphQLClient } from "graphql-request";
import {
  MainProjectsQuery as ProjectsQueryFrontend,
  MainProjectsDocument as ProjectsDocumentFrontend,
} from "../../../../frontend/src/graphql/public/gql/graphql";
import { config as configFrontend } from "../../../../frontend/src/config";
export const config = configFrontend;

export const localesMap = new Map<string, string>([
  ["ru", "ru-RU"],
  ["en", "en-US"],
]);

export const client = new GraphQLClient(`${config.codegenUrl}/graphql`, {
  headers: {
    Authorization: `Bearer Px52qffm9qbMY4WsyjZIvp3mS55Fg61d`,
  },
});

export type ProjectsQuery = ProjectsQueryFrontend;
export const ProjectsDocument = ProjectsDocumentFrontend;
