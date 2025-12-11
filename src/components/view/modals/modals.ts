import { Component } from '../../base/Component';
import { IEvents } from '../../base/Events';

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected closeButton: HTMLButtonElement;
  protected contentElement: HTMLElement;
  
  // Обработчик в виде стрелочного метода, чтобы не терять контекст `this`
  private handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.events.emit('modal:request-close');
    }
  };

  constructor(private events: IEvents, container: HTMLElement) {
    super(container);
    
    this.closeButton = this.container.querySelector('.modal__close')!;
    this.contentElement = this.container.querySelector('.modal__content')!;
    
    this.closeButton.addEventListener('click', () => {
      this.events.emit('modal:request-close');
    });
    
    this.container.addEventListener('click', (event) => {
      if (event.target === this.container) {
        this.events.emit('modal:request-close');
      }
    });
  }

  set content(value: HTMLElement) {
    this.contentElement.innerHTML = '';
    this.contentElement.appendChild(value);
  }

  render(data: IModal): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }

  open(): void {
    this.container.classList.add('modal_active');
    // Навешиваем обработчик при открытии
    document.addEventListener('keydown', this.handleEscape);
  }

  close(): void {
    this.container.classList.remove('modal_active');
    // Правильно удаляем обработчик при закрытии
    document.removeEventListener('keydown', this.handleEscape);
  }
}