(() => {
  const produtos = [...document.querySelectorAll('.produto-card')];
  const listaProdutos = document.querySelector('.produtos-lista');
  const listaCarrinho = document.getElementById('carrinho-itens');
  const carrinhoVazio = document.getElementById('carrinho-vazio');
  const resumoCarrinho = document.getElementById('carrinho-resumo');
  const totalCarrinho = document.getElementById('carrinho-total');
  const contagemCarrinho = document.getElementById('carrinho-contagem');
  const botoesCategoria = [...document.querySelectorAll('.categoria-item')];
  const carrinho = new Map();
  const formatarPreco = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format;

  function criarItemCarrinho(item) {
    const linha = document.createElement('li');
    const informacoes = document.createElement('div');
    const nome = document.createElement('span');
    const detalhe = document.createElement('span');
    const remover = document.createElement('button');

    linha.className = 'carrinho-item';
    informacoes.className = 'carrinho-item-info';
    nome.className = 'carrinho-item-nome';
    nome.textContent = item.nome;
    detalhe.className = 'carrinho-item-detalhe';
    detalhe.textContent = `${item.quantidade}x ${formatarPreco(item.preco)}`;
    informacoes.append(nome, detalhe);

    remover.type = 'button';
    remover.className = 'carrinho-remover';
    remover.dataset.id = item.id;
    remover.setAttribute('aria-label', `Remover ${item.nome} do carrinho`);
    remover.textContent = 'Remover';

    linha.append(informacoes, remover);
    return linha;
  }

  function renderizarCarrinho() {
    const itens = [...carrinho.values()];
    const quantidadeTotal = itens.reduce((total, item) => total + item.quantidade, 0);
    const valorTotal = itens.reduce((total, item) => total + item.preco * item.quantidade, 0);

    listaCarrinho.replaceChildren(...itens.map(criarItemCarrinho));
    carrinhoVazio.hidden = itens.length > 0;
    resumoCarrinho.hidden = itens.length === 0;
    contagemCarrinho.textContent = `(${quantidadeTotal})`;

    const valor = document.createElement('strong');
    valor.textContent = formatarPreco(valorTotal);
    totalCarrinho.replaceChildren('Total: ', valor);
  }

  function adicionarAoCarrinho(card) {
    const id = card.dataset.id;
    const item = carrinho.get(id) || {
      id,
      nome: card.dataset.nome,
      preco: Number(card.dataset.preco),
      quantidade: 0
    };

    item.quantidade += 1;
    carrinho.set(id, item);
    renderizarCarrinho();
  }

  listaProdutos.addEventListener('click', (evento) => {
    const card = evento.target.closest('.produto-card');
    if (card) adicionarAoCarrinho(card);
  });

  listaProdutos.addEventListener('keydown', (evento) => {
    const card = evento.target.closest('.produto-card');
    if (!card || (evento.key !== 'Enter' && evento.key !== ' ')) return;

    evento.preventDefault();
    adicionarAoCarrinho(card);
  });

  listaCarrinho.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.carrinho-remover');
    if (!botao) return;

    carrinho.delete(botao.dataset.id);
    renderizarCarrinho();
  });

  botoesCategoria.forEach((botao) => {
    botao.addEventListener('click', () => {
      const categoria = botao.dataset.categoria;

      botoesCategoria.forEach((item) => {
        item.classList.toggle('ativo', item === botao);
      });

      produtos.forEach((produto) => {
        produto.hidden = categoria !== 'todas' && produto.dataset.categoria !== categoria;
      });
    });
  });

  renderizarCarrinho();
})();
