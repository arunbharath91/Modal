export class Modal {
  constructor() {
  }

  public add(selector = "[data-toggle='modal']") {
    const element = document.querySelector(selector) as HTMLElement;

      const id = element.getAttribute('data-target') as string;
      const targetId = (document.querySelector(id) as HTMLElement);
      element.addEventListener('click', (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setTimeout(() => {
          targetId.classList.add(...['show', 'model-open']);
        }, 30, targetId.classList.add('d-block'));
      });

      (targetId.querySelector('[data-dismiss="modal"]') as HTMLElement).addEventListener('click', () => {
        setTimeout(() => {
          targetId.classList.remove('d-block');
        }, 30, targetId.classList.remove(...['show', 'model-open']));
      });
  }
}
