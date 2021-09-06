import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaderboardUserInt } from 'src/assets/interfaces/LeaderboardInt';
import { LeaderboardService } from '../leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  serverId: string = '';
  valid: boolean = false;
  error: boolean = false;
  leaderboard: LeaderboardUserInt[] = [];
  serverName: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: LeaderboardService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.serverId = params.get('serverId') || '';
    });

    if (this.serverId) {
      this.service.getLeaderboard(this.serverId).subscribe((data) => {
        this.leaderboard = data.users.sort((a, b) => b.level - a.level);
        this.serverName = data.serverName;
        this.valid = true;
      }, (error) => {
        this.error = true;
      });
    }
  }
}
