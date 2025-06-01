import { MouseEvent, ReactNode, RefObject, useRef } from "react";
import { ButtonGroup, CloseButton, ModalContainer, ModalHeader } from "./style";
import Botao from "../Botao";

interface ModalProps {
  icon: ReactNode;
  titulo: string;
  children: ReactNode;
  onClick: () => void;
  clickOutOfModal?: boolean;
  ref?: RefObject<ModalHandle>;
}

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

const Modal = ({ icon, titulo, children, onClick, clickOutOfModal = true, ref }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeModal = () => {
    dialogRef.current?.close();
  };

  //ref "publica" do componente: esses metodos poderao ser chamados pelo pai do componente Modal;
  if (ref) {
    ref.current = {
      open: () => dialogRef.current?.showModal(),
      close: () => closeModal(),
    };
  }

  const onClickOutOfModal = (e: MouseEvent<HTMLDialogElement>) => {
    if (clickOutOfModal && e.target === dialogRef.current) {
      closeModal();
    }
  };

  return (
    <ModalContainer ref={dialogRef} onClick={onClickOutOfModal}>
      <ModalHeader>
        <div>
          {icon}
          {titulo}
        </div>
        <CloseButton onClick={closeModal}>x</CloseButton>
      </ModalHeader>
      {children}
      <ButtonGroup>
        <Botao $variante="secundario" onClick={closeModal}>
          Cancelar
        </Botao>
        <Botao
          $variante="primario"
          onClick={() => {
            onClick();
            closeModal();
          }}
        >
          Adicionar
        </Botao>
      </ButtonGroup>
    </ModalContainer>
  );
};

export default Modal;
