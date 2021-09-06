import { Component, OnInit } from '@angular/core';
import { AboutService } from '../about.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  commands = 0;
  members = 0;
  guilds = 0;
  constructor(private service: AboutService) {}

  ngOnInit(): void {
    this.service.getCounts().subscribe((data) => {
      this.commands = data.commands;
      this.members = data.members;
      this.guilds = data.guilds;
    });
  }
}
