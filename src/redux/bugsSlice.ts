import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Bug, BugDraft } from "../types/bug";
import {
  createBugOnApi,
  deleteBugOnApi,
  fetchBugById,
  fetchBugsFromApi,
  updateBugOnApi,
} from "../services/bugService";

interface BugsState {
  bugs: Bug[];
  selectedBug: Bug | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
}

const initialState: BugsState = {
  bugs: [],
  selectedBug: null,
  loading: false,
  saving: false,
  error: null,
};

export const fetchBugs = createAsyncThunk("bugs/fetchAll", async () => {
  return await fetchBugsFromApi();
});

export const fetchBug = createAsyncThunk("bugs/fetchOne", async (id: number) => {
  return await fetchBugById(id);
});

export const createBug = createAsyncThunk(
  "bugs/create",
  async (payload: BugDraft) => {
    return await createBugOnApi(payload);
  }
);

export const updateBug = createAsyncThunk("bugs/update", async (bug: Bug) => {
  return await updateBugOnApi(bug);
});

export const deleteBug = createAsyncThunk("bugs/delete", async (id: number) => {
  await deleteBugOnApi(id);
  return id;
});

const bugsSlice = createSlice({
  name: "bugs",
  initialState,
  reducers: {
    clearSelectedBug(state) {
      state.selectedBug = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBugs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBugs.fulfilled, (state, action) => {
        state.loading = false;
        state.bugs = action.payload;
      })
      .addCase(fetchBugs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Impossible de charger les bogues.";
      })
      .addCase(fetchBug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBug = action.payload;
      })
      .addCase(fetchBug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Impossible de charger le bogue.";
      })
      .addCase(createBug.pending, (state, action) => {
        state.saving = true;
        state.error = null;
        state.bugs.push({
          ...action.meta.arg,
          id: Date.now(),
        });
      })
      .addCase(createBug.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(createBug.rejected, (state, action) => {
        state.saving = false;
        state.error = action.error.message ?? "Impossible de créer le bogue.";
      })
      .addCase(updateBug.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateBug.fulfilled, (state, action) => {
        state.saving = false;
        state.selectedBug = action.payload;
        const index = state.bugs.findIndex((bug) => bug.id === action.payload.id);
        if (index !== -1) {
          state.bugs[index] = action.payload;
        }
      })
      .addCase(updateBug.rejected, (state, action) => {
        state.saving = false;
        state.error = action.error.message ?? "Impossible de mettre à jour le bogue.";
      })
      .addCase(deleteBug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBug.fulfilled, (state, action) => {
        state.loading = false;
        state.bugs.filter((bug) => bug.id !== action.payload);
      })
      .addCase(deleteBug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Impossible de supprimer le bogue.";
      });
  },
});

export const { clearSelectedBug, clearError } = bugsSlice.actions;
export default bugsSlice.reducer;
