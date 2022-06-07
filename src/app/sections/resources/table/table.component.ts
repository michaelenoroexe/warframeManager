import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class ResTableComponent implements OnInit {
  elmass = [
    {name: 'echowinder', owned: 100, mastered: false},
    {name: 'esher devar', owned: 200, mastered: false},
    {name: 'salvage', owned: 35454500, mastered: false},
    {name: 'komms', owned: 600, mastered: false},
    {name: 'seer barel', owned: 10, mastered: false},
    {name: 'tonkor', owned: 1, mastered: true},
    {name: 'sedna nav segment', owned: 10, mastered: false},
    {name: 'ganglion', owned: 1050, mastered: false},
    {name: 'grokdrul', owned: 1060, mastered: false},
    {name: 'arca plasmor', owned: 1, mastered: true},
    {name: 'nano spores', owned: 165400, mastered: false},
    {name: 'garuda chassis blueprint', owned: 10, mastered: false},
    {name: 'dual toxocyst', owned: 1, mastered: true},
    {name: 'lenz', owned: 1, mastered: true},
    {name: 'dual toxocyst', owned: 1, mastered: true},
    {name: 'lenz', owned: 1, mastered: true},
    {name: 'dual toxocyst', owned: 1, mastered: true},
    {name: 'lenz', owned: 1, mastered: true},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
