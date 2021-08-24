import { DataBase } from './db';

export class Highscores {
  public database: DataBase;

  constructor(private readonly rootelement: HTMLElement) {
    this.database = new DataBase();
    this.database.openRequest.addEventListener('success', () => {
      this.scores();
    });
    rootelement.insertAdjacentHTML(
      'beforeend',
      `
            <div id="highscore-wrapper">
                <span class="hightitle">Highscores:</span>
            </div>
        `
    );
  }

  scores(): void {
    const transaction = this.database.openRequest.result.transaction('users', 'readwrite');
    const users = transaction.objectStore('users');
    const pointIndex = users.index('points_idx');
    const pointReq = pointIndex?.getAll();
    pointReq?.addEventListener('success', () => {
      const highscore = document.getElementById('highscore-wrapper');
      pointReq.result
        .sort((a, b) => b.points - a.points)
        .forEach((user) => {
          highscore?.insertAdjacentHTML(
            'beforeend',
            `
                    <div class="highscore">
                        <div class="highscore_user">
                            <div>${user.name}</div>
                            <div>${user.surname}</div>
                        </div>
                        <div>${user.points} points</div>
                    </div>
                `
          );
        });
    });
  }
}
