export type MessageType = Record<string, string>;

export type LanguageOptionsType = {
  name: "sql" | "mysql" | "mariadb" | "postgresql";
};

export type MainOptionsType = {
  language: LanguageOptionsType;
  port: number;
};
