// Função para criar uma nova pessoa
function criarPessoa(nome, nascimento, telefone, email) {
  console.log('Criando nova pessoa...');
  return {
    id: Date.now(), // ID único baseado no timestamp
    nome,
    nascimento,
    telefone,
    email
  };
}

// Carrega pessoas do localStorage
function carregarPessoas() {
  console.log('Carregando pessoas...');
  const pessoasSalvas = localStorage.getItem('pessoas');
  return pessoasSalvas ? JSON.parse(pessoasSalvas) : [];
}

// Salva lista de pessoas no localStorage
function salvarPessoas(pessoas) {
  console.log('Salvando pessoas...');
  localStorage.setItem('pessoas', JSON.stringify(pessoas));
}

// Atualiza a lista de pessoas na tela
function exibirPessoas() {
  console.log('Exibindo pessoas...');
  const lista = document.getElementById('listaPessoas');
  lista.innerHTML = ''; // Limpa a lista

  pessoas.forEach(p => {
    const div = document.createElement('div');
    div.className = 'pessoa';
    div.innerHTML = `
      <strong>Nome:</strong> ${p.nome}<br>
      <strong>Nascimento:</strong> ${p.nascimento}<br>
      <strong>Telefone:</strong> ${p.telefone}<br>
      <strong>Email:</strong> ${p.email}<br>
      <button onclick="excluirPessoa(${p.id})">Excluir</button>
    `;
    lista.appendChild(div);
  });
}

// Exclui uma pessoa da lista
function excluirPessoa(id) {
  console.log(`Excluindo pessoa com ID: ${id}`);
  pessoas = pessoas.filter(p => p.id !== id);
  atualizarEExibirPessoas();
}

// Atualiza e exibe pessoas na tela
function atualizarEExibirPessoas() {
  salvarPessoas(pessoas);
  exibirPessoas();
}

// Ao enviar o formulário de cadastro
document.getElementById('cadastroForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const nascimento = document.getElementById('nascimento').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;

  const novaPessoa = criarPessoa(nome, nascimento, telefone, email);
  pessoas.push(novaPessoa);
  atualizarEExibirPessoas();

  this.reset(); // Limpa o formulário
  console.log('Pessoa cadastrada com sucesso!');
});

// Inicializa a lista de pessoas
let pessoas = carregarPessoas();
exibirPessoas();
