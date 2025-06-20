import { useState } from "react";
import { Section, Container, Title, Description, Illustration, SectionWrapper } from "./style.js";
import ilustracao from "../../assets/images/ilustracao-cadastro.png";
import { Form, useNavigate } from "react-router";
import Botao from "../../componentes/Botao/index.js";
import CampoTexto from "../../componentes/CampoTexto/index.js";
import Fieldset from "../../componentes/Fieldset/index.js";
import Label from "../../componentes/Label/index.js";
import { IUser } from "../../types/index.js";
import { createUser } from "../../api/users/index.js";

const Cadastro = () => {
  const [form, setForm] = useState<Omit<IUser, "id">>({
    name: "",
    income: 0,
  });

  const navigate = useNavigate();

  const onSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();
    try {
      await createUser(form);
    } catch (error) {
      console.error(error);
    }
    navigate("/home");
  };

  const onChange = (field: "name" | "income", value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Section>
      <SectionWrapper>
        <Container>
          <Title>Configuração financeira</Title>
          <Description>
            Boas-vindas à plataforma que protege seu bolso! Antes de começar, precisamos de algumas informações sobre
            sua rotina financeira. Vamos lá?
          </Description>
          <Form>
            <Fieldset>
              <Label htmlFor="nome">Nome</Label>
              <CampoTexto
                type="text"
                name="nome"
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="renda">Renda mensal total</Label>
              <CampoTexto
                type="text"
                name="renda"
                value={form.income}
                onChange={(e) => onChange("income", Number(e.target.value))}
              />
            </Fieldset>
          </Form>
          <Botao $variante="primario" onClick={onSubmit}>
            Ir para o app
          </Botao>
        </Container>
        <Illustration src={ilustracao} alt="ilustração da tela de cadastro. Um avatar mexendo em alguns gráficos" />
      </SectionWrapper>
    </Section>
  );
};

export default Cadastro;
