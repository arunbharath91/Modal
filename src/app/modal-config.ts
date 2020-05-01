import { Modal } from "./modal";

(document.querySelector('[data-target="#videoModal"]') as HTMLElement).addEventListener('click', (e) => {
  e.preventDefault();
  new Modal('assets/templates/modal.html', {size: 'lg',
  onOpen: ()=>{
    console.log('open');
  }
});
});

const modelopen  = () => {
  new Modal("customer-model", {size: 'md',
  onClose: ()=>{
    console.log('close');
  }
});
};

(window as any).modelopen = modelopen;
