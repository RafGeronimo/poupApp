import useMainContext from "../../hooks/useMainContext";
import { Cartao, CartaoCabecalho, CartaoCorpo, Descricao } from "../Cartao";

const formatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

const OrcamentoDiario = () => {
  const { user } = useMainContext();
  return (
    <Cartao>
      <CartaoCabecalho>Orçamento diário disponível</CartaoCabecalho>
      <CartaoCorpo>
        <Descricao>{formatador.format(user?.dailyBalance ?? 0)}</Descricao>
      </CartaoCorpo>
    </Cartao>
  );
};
export default OrcamentoDiario;
