import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'ash-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() hint: string = '';
  @Input() error: string = '';
  @Input() prefix: string = '';
  @Input() suffix: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() fullWidth: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() clearable: boolean = false;
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() variant: 'outlined' | 'filled' | 'standard' = 'outlined';

  // Validation inputs
  @Input() pattern: string = '';
  @Input() minLength: number | null = null;
  @Input() maxLength: number | null = null;
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() validateOnBlur: boolean = false;
  @Input() customValidator?: (value: string) => string | null;

  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() iconClick = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() validationChange = new EventEmitter<boolean>();

  value: string = '';
  focused: boolean = false;
  touched: boolean = false;
  isValid: boolean = true;
  validationError: string | null = null;

  // Built-in validation patterns
  private patterns = {
    email: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$',
    phone: '^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$',
    url: '^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$',
    password: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$', // Minimum 8 characters, at least one letter and one number
    zipcode: '^[0-9]{5}(?:-[0-9]{4})?$',
    numbers: '^[0-9]+$'
  };

  // ControlValueAccessor implementation
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
    if (!this.validateOnBlur) {
      this.validate();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Event handlers
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    
    if (!this.validateOnBlur) {
      this.validate();
    }
  }

  onFocus(event: FocusEvent): void {
    this.focused = true;
    this.focus.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.focused = false;
    this.touched = true;
    this.onTouched();
    
    if (this.validateOnBlur) {
      this.validate();
    }
    
    this.blur.emit(event);
  }

  onClear(): void {
    this.value = '';
    this.onChange('');
    this.clear.emit();
    this.validate();
  }

  onIconClicked(): void {
    this.iconClick.emit();
  }

  // Validation methods
  private validate(): void {
    this.validationError = null;

    if (this.required && !this.value) {
      this.validationError = 'This field is required';
    } else if (this.value) {
      // Check built-in type validation
      if (this.type === 'email' && !this.validatePattern(this.patterns.email)) {
        this.validationError = 'Please enter a valid email address';
      }
      
      // Check pattern validation
      if (this.pattern && !this.validatePattern(this.pattern)) {
        this.validationError = 'Please match the requested format';
      }

      // Check length validation
      if (this.minLength && this.value.length < this.minLength) {
        this.validationError = `Minimum length is ${this.minLength} characters`;
      }
      if (this.maxLength && this.value.length > this.maxLength) {
        this.validationError = `Maximum length is ${this.maxLength} characters`;
      }

      // Check number range validation
      if (this.type === 'number') {
        const numValue = parseFloat(this.value);
        if (this.min !== null && numValue < this.min) {
          this.validationError = `Minimum value is ${this.min}`;
        }
        if (this.max !== null && numValue > this.max) {
          this.validationError = `Maximum value is ${this.max}`;
        }
      }

      // Custom validator
      if (this.customValidator) {
        const customError = this.customValidator(this.value);
        if (customError) {
          this.validationError = customError;
        }
      }
    }

    this.isValid = !this.validationError;
    this.error = this.validationError || '';
    this.validationChange.emit(this.isValid);
  }

  private validatePattern(pattern: string): boolean {
    const regex = new RegExp(pattern);
    return regex.test(this.value);
  }

  // Helper method to get built-in pattern
  getBuiltInPattern(type: string): string {
    return this.patterns[type as keyof typeof this.patterns] || '';
  }
}
