import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { List } from '../models/List';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})

export class AddListComponent implements OnInit {
  private newList :List;

  constructor(private listServ: ListService) { }

  @Output() addList: EventEmitter<List> = new EventEmitter<List>();

  ngOnInit() {
    this.newList = {
        title: '',
        category:'',
        description:'',
        _id:''

    }
  }

  public onSubmit() {
    this.listServ.addList(this.newList).subscribe(
        response=> {
            if(response.success== true) {
               //If success, update the view-list component
		this.addList.emit(this.newList);
            }
        },
    );

  }

}
