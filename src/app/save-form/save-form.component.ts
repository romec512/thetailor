import { Component, OnInit } from '@angular/core';
import {ShareService} from '../share.service';

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.css']
})
export class SaveFormComponent implements OnInit {
  figures;
  constructor(private share: ShareService) { }

  ngOnInit() {
    this.figures = this.share.getFigures();
  }

}
