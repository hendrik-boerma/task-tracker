import { Component, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter()
  text: string = '';
  day: string = '';
  check: boolean = false;
  showAddTask: boolean = false;
  showError: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value)
  }

  clearError() {
    this.showError = false;
    return;
  }

  onSubmit() {
    if(!this.text) {
      this.showError = true;
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      check: this.check
    }

    this.onAddTask.emit(newTask)
  
    this.text = '';
    this.day = '';
    this.check = false;
  }

}
