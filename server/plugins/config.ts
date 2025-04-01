import dotenv from "dotenv";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fastifyPlugin from "fastify-plugin";

import fastifyEnv from "@fastify/env";

dotenv.config();

const NODE_ENVS = ["prod", "test", "development"] as const;
type NODE_ENV = (typeof NODE_ENVS)[number];

declare module "fastify" {
  interface FastifyInstance {
    config: {
      API_HOST: string;
      API_PORT: number;
      ALLOWED_ORIGINS: string[];
      AUTH0_DOMAIN: string;
      AUTH0_AUDIENCE: string;
    };
  }
}

export default fastifyPlugin(
  (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
    done: (err?: Error | undefined) => void
  ) => {
    const schema = {
      type: "object",
      required: ["AUTH0_DOMAIN", "AUTH0_AUDIENCE", "ALLOWED_ORIGINS"],
      properties: {
        API_HOST: {
          type: "string",
          default: "127.0.0.1",
        },
        API_PORT: {
          type: "number",
          default: 3000,
        },
        ALLOWED_ORIGINS: {
          type: "string",
          separator: ",",
          default: "http://localhost:8080",
        },
        AUTH0_DOMAIN: {
          type: "string",
        },
        AUTH0_AUDIENCE: {
          type: "string",
        },
      },
    };

    const configOptions = {
      confKey: "config",
      data: process.env,
      dotenv: true,
      schema: schema,
    };

    if (
      NODE_ENVS.find(
        (validName) => validName === (process.env.NODE_ENV || "prod")
      ) === undefined
    ) {
      throw new Error(
        `NODE_ENV is not valid, it must be one of "prod", "test" or "development", not "${process.env.NODE_ENV}"`
      );
    }

    fastifyEnv(fastify, configOptions, done);
  },
  { name: "config" }
);
