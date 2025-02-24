import { Component, EventEmitter, output } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.sass',
})
export class CategoriesComponent {
  newCategorieEvent = output<string>();

  // Emit this fucntion to the parent component
  addNewCategorie(value: string) {
    if (value.trim() !== '') this.newCategorieEvent.emit(value);
  }
}
