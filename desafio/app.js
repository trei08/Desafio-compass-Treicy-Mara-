// Factory para criar objetos Pessoa
function Pessoa(nome, nascimento, telefone, email) {
  return {
    id: Date.now(), // ID único baseado em timestamp
    nome,
    nascimento,
    telefone,
    email
  };
}

// Recupera pessoas do localStorage
function getPessoas() {
  const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
  console.log('[DEBUG] Pessoas carregadas:', pessoas);
  return pessoas;
}

// Salva pessoas no localStorage
function salvarPessoas(pessoas) {
  localStorage.setItem('pessoas', JSON.stringify(pessoas));
  console.log('[DEBUG] Pessoas salvas:', pessoas);
}

// Adiciona pessoa na lista visual
function renderPessoa(pessoa) {
  const div = document.createElement('div');
  div.className = 'pessoa';
  div.innerHTML = `
    <strong>Nome:</strong> ${pessoa.nome}<br>
    <strong>Nascimento:</strong> ${pessoa.nascimento}<br>
    <strong>Telefone:</strong> ${pessoa.telefone}<br>
    <strong>Email:</strong> ${pessoa.email}<br>
    <button onclick="deletarPessoa(${pessoa.id})">Remover</button>
  `;
  document.getElementById('listaPessoas').appendChild(div);
}

// Re-renderiza todas as pessoas
function renderLista() {
  const listaDiv = document.getElementById('listaPessoas');
  listaDiv.innerHTML = ''; // limpa
  const pessoas = getPessoas();
  pessoas.forEach(renderPessoa);
}

// Remove pessoa do localStorage e atualiza a lista
function deletarPessoa(id) {
  let pessoas = getPessoas();
  pessoas = pessoas.filter(p => p.id !== id);
  salvarPessoas(pessoas);
  renderLista();
  console.log(`[DEBUG] Pessoa com ID ${id} removida.`);
}

// Lógica de cadastro
document.getElementById('cadastroForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const nascimento = document.getElementById('nascimento').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;

  const pessoa = Pessoa(nome, nascimento, telefone, email);
  const pessoas = getPessoas();
  pessoas.push(pessoa);
  salvarPessoas(pessoas);

  renderLista();
  this.reset();

  console.log('[DEBUG] Pessoa cadastrada:', pessoa);
});

// Carrega dados ao iniciar
window.onload = renderLista;
