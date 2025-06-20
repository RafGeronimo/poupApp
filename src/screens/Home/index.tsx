import { useQuery } from "@tanstack/react-query";
import BalancoFinanceiro from "../../componentes/BalancoFinanceiro";
import BarraLateral from "../../componentes/BarraLateral";
import BarraPesquisa from "../../componentes/BarraPesquisa";
import OrcamentoDiario from "../../componentes/OrcamentoDiario";
import SaudacaoUsuario from "../../componentes/SaudacaoUsuario";
import Transacoes from "../../componentes/Transacoes";
import { Container, Movimentacoes, Orcamento, TransacoesWrapper } from "./style";
import { getUsers } from "../../api/users";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const userList = await getUsers();
      if (userList.length === 0) {
        navigate("/");
      }
      return userList[0];
    },
  });

  return (
    <Container>
      <BarraLateral />
      <BarraPesquisa />
      <SaudacaoUsuario userName={data?.name ?? ""} />
      <Orcamento>
        <OrcamentoDiario />
      </Orcamento>
      <Movimentacoes>
        <BalancoFinanceiro />
      </Movimentacoes>
      <TransacoesWrapper>
        <Transacoes />
      </TransacoesWrapper>
    </Container>
  );
}

export default Home;
