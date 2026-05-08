import { z } from "zod";

export const zipUploadSchema = z.object({
    projectId: z.string().min(1, "projectId is required"),
});

export const githubUrlSchema = z.object({
    projectId: z.string().min(1, "projectId is required"),
    repoUrl: z.string().url("Invalid URL").refine(
        (url) => url.includes("github.com"),
        "URL must be a GitHub repository"
    ),
});