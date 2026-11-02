import { apiClient } from "./client";
import type { Bug, BugDraft } from "../types/bug";

export const bugsApi = {
  getAll() {
    return apiClient.get<Bug[]>("/bugs");
  },

  getById(id: number) {
    return apiClient.get<Bug>(`/bugs/${id}`);
  },

  create(payload: BugDraft) {
    return apiClient.post<Bug>("/bugs", payload);
  },

  update(id: number, payload: Partial<BugDraft>) {
    return apiClient.put<Bug>(`/bugs/${id}`, payload);
  },

  remove(id: number) {
    return apiClient.delete(`/bugs/${id}`);
  },
};
