import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './services/storage.service';
import { AdBannerComponent } from './components/ad-banner.component';
import { getPointsForLength } from './constants/ticket-to-ride-scores';
import { count } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AdBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [StorageService],
})
export class AppComponent implements OnInit {
  title = 'TTR Mobile App';
  storageAvailable = false;

  // totalScore = signal(0);
  singleCarCount = signal(1);

  routeLengths = [1, 2, 3, 4, 5, 6];

  cards = signal<any[]>([
    {
      value: 1,
      count: signal(0),
      points: computed(
        (): number => getPointsForLength(1) * this.cards()[0].count(),
      ),
    },
    {
      value: 2,
      count: signal(0),
      points: computed(
        (): number => getPointsForLength(2) * this.cards()[1].count(),
      ),
    },
    {
      value: 3,
      count: signal(0),
      points: computed(
        (): number => getPointsForLength(3) * this.cards()[2].count(),
      ),
    },
    {
      value: 4,
      count: signal(0),
      points: computed(
        (): number => getPointsForLength(4) * this.cards()[3].count(),
      ),
    },
    {
      value: 5,
      count: signal(0),
      points: computed(
        (): number => getPointsForLength(5) * this.cards()[4].count(),
      ),
    },
    {
      value: 6,
      count: signal(0),
      points: computed(
        (): number => getPointsForLength(6) * this.cards()[5].count(),
      ),
    },
  ]);
  clickHistory = signal<number[]>([]);

  totalScore = computed(() =>
    this.cards().reduce((acc, card) => acc + card.points(), 0),
  );

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.storageAvailable = this.storageService.isStorageAvailable();
  }

  onCardTouchStart(rl: number): void {
    getPointsForLength(rl);

    this.cards()[rl - 1].count.update((count: number) => count + 1);
    this.clickHistory.update((history) => [...history, rl]);
  }

  undoLast(): void {
    const history = this.clickHistory();
    if (history.length === 0) {
      return; // No actions to undo
    }
    const lastLength = history[history.length - 1];

    this.cards()[lastLength - 1].count.update((count: number) =>
      Math.max(0, count - 1),
    );
    this.clickHistory.set(history.slice(0, -1));
  }

  clearAll(): void {
    this.cards().forEach((card) => card.count.set(0));
    this.clickHistory.set([]);
  }
}
