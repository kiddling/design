import { useState, useEffect } from "react";
import {
  ReadingState,
  UserResourceState,
} from "../../../shared/types/resource";

const STORAGE_KEY = "resource-states";
const NOTES_STORAGE_KEY = "resource-notes";

export function useResourceState() {
  const [states, setStates] = useState<Record<string, ReadingState>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const stored = localStorage.getItem(NOTES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
  }, [states]);

  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const setResourceState = (resourceId: string, state: ReadingState) => {
    setStates(prev => ({ ...prev, [resourceId]: state }));
  };

  const getResourceState = (resourceId: string): ReadingState => {
    return states[resourceId] || "未读";
  };

  const setResourceNotes = (resourceId: string, note: string) => {
    setNotes(prev => ({ ...prev, [resourceId]: note }));
  };

  const getResourceNotes = (resourceId: string): string => {
    return notes[resourceId] || "";
  };

  const getStateCounts = () => {
    const counts = {
      已读: 0,
      在读: 0,
      想读: 0,
      未读: 0,
    };
    Object.values(states).forEach(state => {
      counts[state]++;
    });
    return counts;
  };

  return {
    setResourceState,
    getResourceState,
    setResourceNotes,
    getResourceNotes,
    getStateCounts,
    states,
  };
}
