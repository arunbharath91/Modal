import { Modal } from "./modal";

(document.querySelector('[data-target="#videoModal"]') as HTMLElement).addEventListener('click', (e) => {
  e.preventDefault();
  new Modal('assets/templates/modal.html', {size: 'lg'});
});

const modelopen  = () => {
  new Modal("customer-model", {size: 'lg'});
};

(window as any).modelopen = modelopen;
