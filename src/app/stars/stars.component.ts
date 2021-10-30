import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarsUserInt } from 'src/assets/interfaces/StarsInt';
import { StarsService } from '../stars.service';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css'],
})
export class StarsComponent implements OnInit {
  serverId: string = '';
  valid: boolean = false;
  error: boolean = false;
  stars: StarsUserInt[] = [];
  serverName: string = '';

  constructor(private route: ActivatedRoute, private service: StarsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.serverId = params.get('serverId') || '';
    });

    if (this.serverId) {
      this.service.getStars(this.serverId).subscribe(
        (data) => {
          this.stars = data.users.sort((a, b) => b.stars - a.stars);
          this.serverName = data.serverName;
          this.valid = true;
        },
        () => {
          this.error = true;
        }
      );
    }
  }
}
