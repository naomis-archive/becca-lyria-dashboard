import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerCommandsInt } from 'src/assets/interfaces/StatsInt';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  stat: string = '';
  valid: boolean = false;
  error: boolean = false;
  commands: ServerCommandsInt[] = [];

  constructor(private route: ActivatedRoute, private service: StatsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.stat = params.get('stat') || '';
    });

    switch (this.stat) {
      case 'commands':
      this.service.getServerCommands().subscribe(
        (data) => {
          this.commands = data.sort((a, b) => b.commandUses - a.commandUses);
          this.valid = true;
        },
        () => {
          this.error = true;
        }
      );
      break;
      default:
        this.stat = '';
    }
  }
}
