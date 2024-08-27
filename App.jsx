import { useState } from 'react';
import './App.css';

const App = () =>{
  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipoTransacao, setTipoTransacao] = useState('debito');
  const [edicaoTransacao, setEdicaoTransacao] = useState(null);

  const addTransacao = (e) => {
    e.preventDefault();

    if(descricao.trim() !== '' && valor !== ''){
      const transacao = {
        id: Date.now(),
        descricao: descricao,
        valor: tipoTransacao === 'debito' ? parseInt(valor) : -parseInt(valor),
      }

      setTransacoes([...transacoes, transacao])
      setDescricao('');
      setValor('');
      setTipoTransacao('debito')
    }
  };

  const editarTransacao = (id) => {
    const transacao = transacao.find((t) => t.id === id);
    setEdicaoTransacao(transacao)
    setDescricao(transacao.descricao)
    setValor(Math.abs(transacao.valor).toString());
    setTipoTransacao(transacao.valor >= 0 ? 'debito' : 'despesa');
  };

  const atualizarTransacao = (e) => {
    e.preventDefault();
    if(descricao.trim() !== '' && valor !== ''){
      const transacaoAtualizada = {
        id: editarTransacao.id,
        descricao: descricao,
        valor: tipoTransacao === 'debito' ? parseInt(valor) : -parseInt(valor),
      };

      const transacoesAtualizadas = transacoes.map((t) => (t.id === edicaoTransacao.id ? transacaoAtualizada: t));

      setTransacoes(transacoesAtualizadas);
      setDescricao('')
      setValor('')
      setTipoTransacao('debito')
      setEdicaoTransacao(null)
    }
  };

  const deletarTransacao = (id) => {
    const transacoesFiltradas = transacoes.filter((t) => t.id !== id);
    setTransacoes(transacoesFiltradas);
  };

  const calcularSaldoTotal = () => {
    let saldoTotal = 0;
    transacoes.forEach((transacao) => {
      saldoTotal += transacao.valor
    });
  

  return saldoTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
  };
  return(
    <div className="App">
      <header>
        <h1>Gerenciamento Financeiro Pessoal</h1>
      </header>

      <form onSubmit={edicaoTransacao ? atualizarTransacao : addTransacao}>

        <input 
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)} />

        <input 
        type="number"
        placeholder='valor'
        value={valor}
        onChange={(e) => setValor(e.target.value)}
         />

         <select value={tipoTransacao} onChange={(e) => setTipoTransacao(e.target.value)}>
          <option value="debito">Débito</option>
          <option value="despesas">Despesas</option>
         </select>

         <button type='submit'> {edicaoTransacao ? 'Atualizar' : 'Adicionar'}</button>

      </form>

      <ul>

        {transacoes.map((transacao) => (
          <li key={transacao.id}>
            <span>{transacao.descricao}</span>
            <span>{transacao.valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
  }</span>
            <div className="icons">
              <button onClick={() => editarTransacao(transacao.id)}>
                Editar
              </button>
              <button onClick={() => deletarTransacao(transacao.id)}>
                Deletar
              </button>
            </div>
          </li>
        ))}
        <div className="saldo">
          <h2>Saldo Total: {calcularSaldoTotal()}</h2>
        </div>
      </ul>
    </div>
    
  );


};

export default App;