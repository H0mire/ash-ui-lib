import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../ui-components/src/lib/button/button.component';
import { CardComponent } from '../../../../ui-components/src/lib/card/card.component';
import { InputComponent } from '../../../../ui-components/src/lib/input/input.component';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    CardComponent,
    InputComponent
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {
  title = 'UI Components Demo';
  formValues = {
    username: '',
    email: '',
    password: '',
    search: '',
    phone: '',
    zipcode: '',
    age: '',
    customField: ''
  };

  // Custom validator example
  validateCustomField = (value: string): string | null => {
    if (value && !value.startsWith('ASH-')) {
      return 'Value must start with ASH-';
    }
    return null;
  };

  onValidationChange(field: string, isValid: boolean) {
    console.log(`${field} validation changed:`, isValid);
  }
}
