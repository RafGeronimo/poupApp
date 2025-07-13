import { useRef, useState } from "react";
import MoneyIcon from "../Icones/MoneyIcon";
import Transacao from "../Transacao";
import { Cartao, CartaoCabecalho, CartaoCorpo } from "../Cartao";
import Botao from "../Botao";
import styled from "styled-components";
import { Form } from "react-router";
import Label from "../Label";
import CampoTexto from "../CampoTexto";
import Fieldset from "../Fieldset";
import Modal, { ModalHandle } from "../Modal";
import { SelectGroup, SelectOption } from "../Select";
import useMainContext from "../../hooks/useMainContext";
import { ITransaction } from "../../types";

export const Container = styled(CartaoCorpo)`
  padding: var(--padding-l) var(--padding-m);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const ListaMovimentacoes = styled.ul`
  list-style: none;
  color: var(--cor-primaria);
  margin: 0;
  padding-left: 0px;
  padding-bottom: var(--padding-m);
  width: 100%;
  height: 535px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Transacoes = () => {
  const ref = useRef<ModalHandle>({ open: () => undefined, close: () => undefined });
  const { transactions, createNewTransaction, user } = useMainContext();
  const [newTransaction, setNewTransaction] = useState<Omit<ITransaction, "userId" | "id">>({
    name: "",
    value: 0,
    type: "income" as "income" | "expense",
    category: "",
    date: "",
  });

  const onChange = (field: keyof typeof newTransaction, value: string | number) => {
    setNewTransaction((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async () => {
    if (user) {
      try {
        await createNewTransaction(newTransaction);
        setNewTransaction({
          name: "",
          value: 0,
          type: "income" as "income" | "expense",
          category: "",
          date: "",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Cartao>
      <CartaoCabecalho>Movimentação financeira</CartaoCabecalho>
      <Container>
        <ListaMovimentacoes>
          {transactions.map((t) => (
            <Transacao key={t.id} tipo={t.type} nome={t.name} valor={t.value} data={t.date} />
          ))}
        </ListaMovimentacoes>
        <Botao $variante="neutro" onClick={() => ref.current?.open()}>
          <MoneyIcon />
          Adicionar transação
        </Botao>
        <Modal titulo="Adicionar transação" icon={<MoneyIcon />} onClick={onSubmit} ref={ref}>
          <Form>
            <Fieldset>
              <Label htmlFor="nomeTransacao">Nome da transação</Label>
              <CampoTexto
                type="text"
                id="nomeTransacao"
                placeholder="Ex: Compra na padaria"
                value={newTransaction.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("name", e.target.value)}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="valor">Valor</Label>
              <CampoTexto
                type="number"
                id="valor"
                placeholder="10"
                value={newTransaction.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("value", parseFloat(e.target.value))}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="tipo">Tipo</Label>
              <SelectGroup
                id="tipo"
                value={newTransaction.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange("type", e.target.value)}
              >
                <SelectOption value="">Selecione o tipo</SelectOption>
                <SelectOption value="income">receita</SelectOption>
                <SelectOption value="expense">despesa</SelectOption>
              </SelectGroup>
            </Fieldset>
            <Fieldset>
              <Label htmlFor="valor">Data</Label>
              <CampoTexto
                type="date"
                id="valor"
                placeholder="dd/mm/aaaa"
                value={newTransaction.date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("date", e.target.value)}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="categoria">Categoria</Label>
              <CampoTexto
                type="text"
                id="categoria"
                placeholder="Alimentação"
                value={newTransaction.category}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("category", e.target.value)}
              />
            </Fieldset>
          </Form>
        </Modal>
      </Container>
    </Cartao>
  );
};
export default Transacoes;
