import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../ui-components/src/lib/button/button.component';
import { CardComponent } from '../../../../ui-components/src/lib/card/card.component';
import { InputComponent } from '../../../../ui-components/src/lib/input/input.component';

interface ComponentDoc {
  name: string;
  description: string;
  usage: string;
  props: PropDoc[];
  examples: Example[];
}

interface PropDoc {
  name: string;
  type: string;
  default: string;
  description: string;
  required: boolean;
}

interface Example {
  title: string;
  description: string;
  code: string;
  preview: boolean;
}

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss'
})
export class DocumentationComponent {
  activeComponent: string = 'button';
  activeTab: string = 'overview';

  components: ComponentDoc[] = [
    {
      name: 'Button',
      description: 'A versatile button component that supports different variants, sizes, and states.',
      usage: `import { ButtonComponent } from 'ui-components';

@Component({
  // ...
  imports: [ButtonComponent]
})`,
      props: [
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'outline' | 'text'",
          default: 'primary',
          description: 'The visual style variant of the button',
          required: false
        },
        {
          name: 'size',
          type: "'small' | 'medium' | 'large'",
          default: 'medium',
          description: 'The size of the button',
          required: false
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Whether the button is disabled',
          required: false
        },
        {
          name: 'fullWidth',
          type: 'boolean',
          default: 'false',
          description: 'Whether the button should take full width',
          required: false
        },
        {
          name: 'icon',
          type: 'string',
          default: "''",
          description: 'Font Awesome icon class to display',
          required: false
        }
      ],
      examples: [
        {
          title: 'Basic Button',
          description: 'A simple primary button',
          code: '<ash-button>Click me</ash-button>',
          preview: true
        },
        {
          title: 'Button Variants',
          description: 'Different button styles',
          code: `<ash-button>Primary</ash-button>
<ash-button variant="secondary">Secondary</ash-button>
<ash-button variant="outline">Outline</ash-button>
<ash-button variant="text">Text</ash-button>`,
          preview: true
        }
      ]
    },
    {
      name: 'Input',
      description: 'A form input component with built-in validation and various display options.',
      usage: `import { InputComponent } from 'ui-components';

@Component({
  // ...
  imports: [InputComponent]
})`,
      props: [
        {
          name: 'type',
          type: "'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'",
          default: 'text',
          description: 'The type of input field',
          required: false
        },
        {
          name: 'label',
          type: 'string',
          default: "''",
          description: 'Label text for the input',
          required: false
        },
        {
          name: 'variant',
          type: "'outlined' | 'filled' | 'standard'",
          default: 'outlined',
          description: 'The visual style variant of the input',
          required: false
        },
        {
          name: 'error',
          type: 'string',
          default: "''",
          description: 'Error message to display',
          required: false
        },
        {
          name: 'pattern',
          type: 'string',
          default: "''",
          description: 'Regex pattern for validation',
          required: false
        }
      ],
      examples: [
        {
          title: 'Basic Input',
          description: 'A simple text input with label',
          code: '<ash-input label="Username" placeholder="Enter username"></ash-input>',
          preview: true
        },
        {
          title: 'Input with Validation',
          description: 'Input with email validation',
          code: `<ash-input
  type="email"
  label="Email"
  [required]="true"
  (validationChange)="onValidationChange($event)">
</ash-input>`,
          preview: true
        }
      ]
    },
    {
      name: 'Card',
      description: 'A container component for organizing content with optional header and footer.',
      usage: `import { CardComponent } from 'ui-components';

@Component({
  // ...
  imports: [CardComponent]
})`,
      props: [
        {
          name: 'variant',
          type: "'default' | 'outlined' | 'elevated'",
          default: 'default',
          description: 'The visual style variant of the card',
          required: false
        },
        {
          name: 'padding',
          type: "'none' | 'small' | 'medium' | 'large'",
          default: 'medium',
          description: 'Padding size for the card content',
          required: false
        },
        {
          name: 'hasHeader',
          type: 'boolean',
          default: 'false',
          description: 'Whether the card has a header section',
          required: false
        },
        {
          name: 'hasFooter',
          type: 'boolean',
          default: 'false',
          description: 'Whether the card has a footer section',
          required: false
        },
        {
          name: 'loading',
          type: 'boolean',
          default: 'false',
          description: 'Whether to show loading skeleton state',
          required: false
        }
      ],
      examples: [
        {
          title: 'Basic Card',
          description: 'A simple card with content',
          code: `<ash-card>
  <p>Card content goes here</p>
</ash-card>`,
          preview: true
        },
        {
          title: 'Card with Header and Footer',
          description: 'Card with all sections',
          code: `<ash-card [hasHeader]="true" [hasFooter]="true">
  <div card-header>
    <h3>Card Title</h3>
  </div>
  <p>Main content area</p>
  <div card-footer>
    <ash-button>Action</ash-button>
  </div>
</ash-card>`,
          preview: true
        }
      ]
    }
  ];

  get currentComponent(): ComponentDoc {
    return this.components.find(c => c.name.toLowerCase() === this.activeComponent) || this.components[0];
  }

  setActiveComponent(component: string): void {
    this.activeComponent = component.toLowerCase();
    this.activeTab = 'overview';
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
  }
}
