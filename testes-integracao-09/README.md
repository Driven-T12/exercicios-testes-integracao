# testes-integracao-09: Geração de cenários

- Muitos testes exigem que as entidades já estejam persistidas de uma forma específica para validar um cenário de teste.
- Para garantir que os testes sejam confiáveis, eles precisam ser isolados, totalmente independente. Na prática, isso significa que devemos criar cenários para cada um deles individualmente.
- ➡️ Crie cenários de testes para validar os testes presentes na aplicação.
    - Não esqueça de ajustar o `.env` e rodar o Prisma antes de iniciar.