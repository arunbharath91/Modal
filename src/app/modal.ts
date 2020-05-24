interface IOptions {
  size?: string;
  onOpen?: Function;
  onClose?: Function;
  overlayClick?: boolean;
}

let modalIndex: number = 1000;

const defaultOption: IOptions = {
  size: 'lg',
  overlayClick: false
}

export class Modal {
  private source: string;
  private options: IOptions;
  private modal!: HTMLElement;
  private modalContainer!: HTMLElement;
  constructor(source: string, options?: IOptions) {
    this.source = source;
    this.options = { ...defaultOption, ...options };
    modalIndex++;
    this.initModal();

  }

  initModal() {
    const validSoure: boolean = (this.source.split('.').pop() as string).toLowerCase() === 'html';

    if (this.options.onOpen) { this.options.onOpen.call(this) };
    this.modal = document.createElement('modal');
    this.modal.className = 'modal';
    this.modal.setAttribute("source", `${this.source}`);
    this.modal.style.zIndex = modalIndex.toString();
    this.modal.innerHTML = `<div class="modal-container ${this.options.size}">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
           <div class="view-container">

           </div>
          </div>
        </div>
      </div>`;
    document.body.prepend(this.modal);
    this.modalContainer = (this.modal.querySelector(`.modal-container`) as HTMLElement);

    this.templateInsertion(validSoure);
    this.eventRegistration();
  }

  private templateInsertion(validSoure: boolean) {
    if (validSoure) {
      this.httpReq(`${this.source}`, { mode: 'no-cors', method: 'get' }, this.modalContainer);
    } else {
      this.insertTemplate(this.modalContainer)
    }
  }

  private eventRegistration() {
    (this.modal.querySelector('[data-dismiss="modal"]') as HTMLElement).addEventListener('click', () => { this.close() });
    if (this.options.overlayClick) {
      this.modalContainer.addEventListener('click', (e) => {
        e.stopPropagation();
      });
      this.modal.addEventListener('click', () => { this.close() });
    }
  }

  private close() {
    if (this.options.onClose) { this.options.onClose.call(this) };
    this.modal.remove();
    modalIndex--;
  }

  protected insertTemplate(modal: HTMLElement) {
    const templateContent = (document.querySelector(`template[modal-ref="${this.source}"]`) as HTMLElement);
    (modal.querySelector(`.view-container`) as HTMLElement).innerHTML = templateContent.innerHTML;
  }

  protected httpReq(url: RequestInfo, methods: RequestInit, bindElement: HTMLElement) {
    (bindElement.querySelector(`.view-container`) as HTMLElement).insertAdjacentHTML('afterbegin', `<div class="loader"></div>`);
    fetch(url, methods)
      .then((response) => {
        response.text().then((text) => {
          (bindElement.querySelector(`.view-container`) as HTMLElement).innerHTML = text;
        });
      })
      .catch((err) => {
        console.log(err)
      });
  }
}
