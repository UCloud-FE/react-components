import Modal from './Modal';
export default Modal;

import Content from './Content';
Modal.Content = Content;

import * as method from './method';

Object.assign(Modal, method);
