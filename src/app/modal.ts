interface IOptions {
  size?: string;
  onOpen ? : Function;
  onClose ? : Function;
}

let modalIndex: number = 1000;

const defaultOption: IOptions = {
  size: 'lg'
}

export class Modal {
  private source: string;
  private options: IOptions;
  constructor(source: string, options?: IOptions) {
    this.source = source;
    this.options = {...defaultOption, ...options};
    modalIndex++;
    this.initModal();

  }

  initModal() {
    const validSoure: boolean = (this.source.split('.').pop() as string).toLowerCase() === 'html';

    if (this.options.onOpen) this.options.onOpen.call(this)
    const modal = document.createElement('modal');
    modal.className = 'modal';
    modal.setAttribute("source", `${this.source}`);
    modal.style.zIndex = modalIndex.toString();
    modal.innerHTML = `<div class="modal-dialog ${this.options.size}">
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
    document.body.prepend(modal);

    (validSoure) ? this.httpReq(`${this.source}`, {
      mode: 'no-cors',
      method: 'get'
    }, modal) : this.projectTemplate(modal)

    this.registerCloseEvent(modal);
  }

  protected registerCloseEvent(modal: HTMLElement) {
  (modal.querySelector('[data-dismiss="modal"]') as HTMLElement).addEventListener('click', () => {
      if (this.options.onClose) this.options.onClose.call(this)
      modal.remove();
      modalIndex--;
  });
}

  protected projectTemplate(modal: HTMLElement) {
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
