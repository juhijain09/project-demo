import { Component, OnInit, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
	public NavStatus = 'open';
  constructor( private el:ElementRef) { }

  ngOnInit() {
  }
  public toggleNav(){
    console.log('inside side bar');
   this.el.nativeElement.querySelector("#sidebar").classList.toggle('active');
  }

}
