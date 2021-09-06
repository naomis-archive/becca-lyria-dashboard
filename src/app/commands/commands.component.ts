import { Component, OnInit } from '@angular/core';
import { CommandsInt } from 'src/assets/interfaces/CommandsInt';
import { CommandsService } from '../commands.service';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css'],
})
export class CommandsComponent implements OnInit {
  loaded = false;
  commands: CommandsInt[] = [];
  constructor(private service: CommandsService) {}

  ngOnInit(): void {
    this.service.getCommands().subscribe((data) => {
      this.commands = data.sort((a, b) => b.uses - a.uses);
      this.loaded = true;
    });
  }
}
