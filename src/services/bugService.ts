import { bugsApi } from "../api/bugsApi";
import type { Bug, BugDraft } from "../types/bug";

export async function fetchBugsFromApi(): Promise<Bug[]> {
  const response = await bugsApi.getAll();
  return response.data;
}

export async function fetchBugById(id: number): Promise<Bug> {
  const response = await bugsApi.getById(id);
  return response.data;
}

export async function createBugOnApi(payload: BugDraft): Promise<Bug> {
  const response = await bugsApi.create(payload);
  return response.data;
}

export async function updateBugOnApi(bug: Bug): Promise<Bug> {
  const response = await bugsApi.update(bug.id, {
    title: bug.title,
    description: bug.description,
    severity: bug.severity,
    status: bug.status,
  });
  return response.data;
}

export async function deleteBugOnApi(id: number): Promise<void> {
  await bugsApi.remove(id);
}
