import styled from "styled-components";

export const StyledUsuario = styled.div`
  grid-area: usuario;
  color: var(--cor-neutra-light);

  & > h1 {
    margin: 16px 0 0 0;
  }

  & > p {
    margin: 8px 0 16px 0;
  }
`;

type SaudacaoUsuarioProps = {
  userName: string;
};

const SaudacaoUsuario = ({ userName }: SaudacaoUsuarioProps) => {
  return (
    <StyledUsuario>
      <h1>Olá, {userName}</h1>
      <p>Veja como estão suas finanças hoje.</p>
    </StyledUsuario>
  );
};

export default SaudacaoUsuario;
