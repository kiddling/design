import { useState, useEffect, useCallback } from "react";
import { KnowledgeCard, UserCardState, CardRelationship } from "@shared/types";
import {
  knowledgeCards as mockCards,
  cardRelationships as mockRelationships,
} from "@shared/knowledge-data";

export function useKnowledgeCards() {
  const [cards, setCards] = useState<KnowledgeCard[]>([]);
  const [relationships, setRelationships] = useState<CardRelationship[]>([]);
  const [userStates, setUserStates] = useState<Map<string, UserCardState>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 300));
        setCards(mockCards);
        setRelationships(mockRelationships);

        const savedStates = localStorage.getItem("knowledgeCardStates");
        if (savedStates) {
          const parsed = JSON.parse(savedStates);
          setUserStates(new Map(Object.entries(parsed)));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleFavorite = useCallback((cardId: string) => {
    setUserStates(prev => {
      const newStates = new Map(prev);
      const currentState = newStates.get(cardId) || {
        cardId,
        isFavorite: false,
        isStudied: false,
      };
      newStates.set(cardId, {
        ...currentState,
        isFavorite: !currentState.isFavorite,
      });

      const statesObj = Object.fromEntries(newStates);
      localStorage.setItem("knowledgeCardStates", JSON.stringify(statesObj));

      return newStates;
    });
  }, []);

  const toggleStudied = useCallback((cardId: string) => {
    setUserStates(prev => {
      const newStates = new Map(prev);
      const currentState = newStates.get(cardId) || {
        cardId,
        isFavorite: false,
        isStudied: false,
      };
      newStates.set(cardId, {
        ...currentState,
        isStudied: !currentState.isStudied,
        lastAccessedAt: new Date().toISOString(),
      });

      const statesObj = Object.fromEntries(newStates);
      localStorage.setItem("knowledgeCardStates", JSON.stringify(statesObj));

      return newStates;
    });
  }, []);

  const getUserState = useCallback(
    (cardId: string): UserCardState => {
      return (
        userStates.get(cardId) || {
          cardId,
          isFavorite: false,
          isStudied: false,
        }
      );
    },
    [userStates]
  );

  const getRelatedCards = useCallback(
    (cardId: string): CardRelationship[] => {
      return relationships.filter(
        rel => rel.from === cardId || rel.to === cardId
      );
    },
    [relationships]
  );

  return {
    cards,
    relationships,
    loading,
    error,
    toggleFavorite,
    toggleStudied,
    getUserState,
    getRelatedCards,
  };
}
