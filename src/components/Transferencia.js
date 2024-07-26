import React, { Component } from 'react';
import smart_contract from '../abis/loteria.json';
import Web3 from 'web3';
import Swal from 'sweetalert2';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Navigation from './Navbar';
import MyCarousel from './Carousel';
import { Container } from 'react-bootstrap';

class Transferencia extends Component {

  async componentDidMount() {
    // 1. Carga de Web3
    await this.loadWeb3()
    // 2. Carga de datos de la Blockchain
    await this.loadBlockchainData()
  }

  // 1. Carga de Web3
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Accounts: ', accounts)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('¡Deberías considerar usar Metamask!')
    }
  }

  // 2. Carga de datos de la Blockchain
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log('accounts:', accounts)
    this.setState({ account: accounts[0] })
    // Ganache -> 5777, Rinkeby -> 4, BSC -> 97
    const networkId = await web3.eth.net.getId()
    console.log('networkid:', networkId)
    const networkData = smart_contract.networks[networkId]
    console.log('NetworkData:', networkData)

    if (networkData) {
      const abi = smart_contract.abi
      console.log('abi', abi)
      const address = networkData.address
      console.log('address:', address)
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
    } else {
      window.alert('¡El Smart Contract no se ha desplegado en la red!')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      loading: true,
      contract: null,
      errorMessage: ""
    }
  }

  _balanceTokens = async () => {
    try {
      console.log("Balance de tokens en ejecucion...")
      const _balance = await this.state.contract.methods.balanceTokens(this.state.account).call()
      Swal.fire({
        icon: 'info',
        title: 'Balance de tokens del usuario:',
        width: 800,
        padding: '3em',
        text: `${_balance} tokens`,
        backdrop: `
          rgba(15, 238, 168, 0.2)
          left top
          no-repeat
        `
      })
    } catch (err) {
      this.setState({ errorMessage: err })
    } finally {
      this.setState({ loading: false })
    }
  }

  _balanceTokensSC = async () => {
    try {
      console.log("Balance de tokens del Smart Contract en ejecucion...")
      const _balanceTokensSC = await this.state.contract.methods.balanceTokensSC().call()
      Swal.fire({
        icon: 'info',
        title: 'Balance de tokens del Smart Contract:',
        width: 800,
        padding: '3em',
        text: `${_balanceTokensSC} tokens`,
        backdrop: `
          rgba(15, 238, 168, 0.2)
          left top
          no-repeat
        `
      })
    } catch (err) {
      this.setState({ errorMessage: err })
    } finally {
      this.setState({ loading: false })
    }
  }

  _balanceEthersSC = async () => {
    try {
      console.log("Balance de ethers del Smart Contract en ejecucion...")
      const _balanceEthersSC = await this.state.contract.methods.balanceEthersSC().call()
      Swal.fire({
        icon: 'info',
        title: 'Balance de ethers del Smart Contract:',
        width: 800,
        padding: '3em',
        text: `${_balanceEthersSC} ethers`,
        backdrop: `
          rgba(15, 238, 168, 0.2)
          left top
          no-repeat
        `
      })
    } catch (err) {
      this.setState({ errorMessage: err })
    } finally {
      this.setState({ loading: false })
    }
  }

  transferir = async (alias1,alias2,monto) => {
    try {
      console.log("Compra de tokens en ejecucion..."+alias1)
      console.log("Compra de tokens en ejecucion..."+alias2)
      console.log("Compra de tokens en ejecucion..."+monto)

      window.web3 = new Web3(window.ethereum)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Accounts: ', accounts)
    
      const web3 = window.web3
      const accounts1 = await web3.eth.getAccounts()
console.log("Compra de tokens en ejecucion..."+accounts1[0])


      const ethers = web3.utils.toWei(alias1, 'ether')
      //habilitar la llamada cuando ya este listo el contrato
      /*await this.state.contract.methods.compraTokens(alias,addres).send({
        from: this.state.account,
        value: ethers
      })*/
      Swal.fire({
        icon: 'success',
        title: '¡Registrado Correctamente!',
        width: 800,
        padding: '3em',
        text: `.....`,
        backdrop: `
          rgba(15, 238, 168, 0.2)
          left top
          no-repeat
        `
      })
    } catch (err) {
      this.setState({ errorMessage: err })
    } finally {
      this.setState({ loading: false })
    }
  }

  _devolverTokens = async (_numTokens) => {
    try {
      console.log("Devolucion de tokens ERC-20 en ejecucion...")
      await this.state.contract.methods.devolverTokens(_numTokens).send({
        from: this.state.account
      })
      Swal.fire({
        icon: 'warning',
        title: '¡Devolución de tokens ERC-20!',
        width: 800,
        padding: '3em',
        text: `Has devuelto ${_numTokens} token/s`,
        backdrop: `
            rgba(15, 238, 168, 0.2)
            left top
            no-repeat
          `
      })

    } catch (err) {
      this.setState({ errorMessage: err })
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    window.web3 = new Web3(window.ethereum)
                  const prueba = window.ethereum.request({ method: 'eth_requestAccounts' });

    return (
      <div>
        <Navigation account={this.state.account} />
        <MyCarousel />
        <div className="container-fluid mt-5">
          <div className="row">
          
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <h1>Transferencias</h1>      
                &nbsp;                
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const alias1 = this.alias1.value
                  const alias2 = this.alias2.value
                  const monto = this.address.value
                  this.transferir(alias1, alias2)
                }}>
                <table border="1">
                <tbody>
                <tr>
                </tr>
                <tr>
                <td className="text-right"><h3>Usuario Origen:</h3></td> 
                <td><input type="text"
                    className="form-control mb-1"
                    
                    ref={(input) => this.alias1 = input} />
                    </td>
                    </tr>
                    <tr>
                <td className="text-right"><h3>Usuario Destino:</h3></td>
                <td><input type="text"
                    className="form-control mb-1"
                    
                    ref={(input) => this.alias2 = input} /></td>
                </tr>
                
                <tr>
                <td className="text-right"><h3>Monto:</h3></td>
                <td><input type="number"
                    className="form-control mb-1"
                    placeholder="Monto a Transferir"
                    ref={(input) => this.cantidad = input} /></td>
                </tr>
                </tbody>
                </table>

                <input type="submit"
                    className="bbtn btn-block btn-success btn-sm"
                    value="TRANSFERIR" />
                </form>

                &nbsp;
                
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Transferencia;
