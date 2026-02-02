import { Injectable, computed, signal } from '@angular/core';
import {
  DEFAULT_LENGTH,
  TICKET_TO_RIDE_LENGTH_POINTS,
  getPointsForLength,
} from '../constants/ticket-to-ride-scores';

export interface CardState {
  length: Signal<number>;
  points: Computed<number>;
  history: Signal<number[]>;
  setLength(length: number): void;
  undo(): void;
  canUndo(): boolean;
}

interface InternalCardState {
  length: ReturnType<typeof signal<number>>;
  points: ReturnType<typeof computed<number>>;
  history: ReturnType<typeof signal<number[]>>;
}

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private readonly cards = new Map<string, InternalCardState>();
  readonly lengthPoints = TICKET_TO_RIDE_LENGTH_POINTS;

  createCard(id: string): CardState {
    if (!this.cards.has(id)) {
      const length = signal<number>(DEFAULT_LENGTH);
      const history = signal<number[]>([DEFAULT_LENGTH]);
      const points = computed(() => getPointsForLength(length()) ?? 0);

      this.cards.set(id, { length, points, history });
    }

    const card = this.cards.get(id)!;

    return {
      length: card.length,
      points: card.points,
      history: card.history,
      setLength: (len: number) => {
        card.length.set(len);
        card.history.update((h) => [...h, len]);
      },
      undo: () => {
        const h = card.history();
        if (h.length > 1) {
          h.pop();
          card.length.set(h[h.length - 1]);
          card.history.set([...h]);
        }
      },
      canUndo: () => card.history().length > 1,
    };
  }

  getCard(id: string): CardState | null {
    const card = this.cards.get(id);
    if (!card) return null;

    return {
      length: card.length,
      points: card.points,
      history: card.history,
      setLength: (len: number) => {
        card.length.set(len);
        card.history.update((h) => [...h, len]);
      },
      undo: () => {
        const h = card.history();
        if (h.length > 1) {
          h.pop();
          card.length.set(h[h.length - 1]);
          card.history.set([...h]);
        }
      },
      canUndo: () => card.history().length > 1,
    };
  }

  removeCard(id: string): void {
    this.cards.delete(id);
  }

  getPoints(length: number): number {
    return getPointsForLength(length) ?? 0;
  }
}
