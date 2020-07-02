import React from 'react';
import Logo from './assets/default-monochrome.svg';
import LogoWhite from './assets/default-monochrome-white.svg';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.slim';
import 'bootstrap/dist/js/bootstrap.bundle';

//import pizzas from './pizzas.json';

export default class App extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      mode: false,
      pizzas: [],
      error: ''
    }

    this.darkSwitch = this.darkSwitch.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    let mode = localStorage.getItem('darkMode');
    mode = (mode === 'true');
    if (mode) {
      document.body.setAttribute('data-theme', 'dark');
      if (this._isMounted) {
        this.setState({
          mode: true
        });
      }
    }

    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  darkSwitch() {
    let mode = localStorage.getItem('darkMode');
    if (mode && mode === 'true') {
      localStorage.setItem('darkMode', false);
      document.body.setAttribute('data-theme', 'light');
      if (this._isMounted) {
        this.setState({
          mode: false
        });
      }
      return false;
    }
    else {
      localStorage.setItem('darkMode', true);
      document.body.setAttribute('data-theme', 'dark');
      if (this._isMounted) {
        this.setState({
          mode: true
        });
      }
      return true;
    }
  }

  async getData() {
    const response = await fetch('/api/pizza', {
      method: 'GET'
    });

    if (response.ok && this._isMounted) {
      const result = await response.json();
      this.setState({
        pizzas: result
      });
    }
    else {
      const result = await response.json();
      this.setState({
        error: result.message
      });
    }
  }

  render() {
    const { mode, pizzas } = this.state;

    return (
      <div className="App">
        <div className="container text-right">
          <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" id="customSwitch1" onChange={this.darkSwitch} checked={mode} />
            <label className="custom-control-label" htmlFor="customSwitch1">
              {mode ?
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-sun" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"/>
                  <path fillRule="evenodd" d="M8.202.28a.25.25 0 0 0-.404 0l-.91 1.255a.25.25 0 0 1-.334.067L5.232.79a.25.25 0 0 0-.374.155l-.36 1.508a.25.25 0 0 1-.282.19l-1.532-.245a.25.25 0 0 0-.286.286l.244 1.532a.25.25 0 0 1-.189.282l-1.509.36a.25.25 0 0 0-.154.374l.812 1.322a.25.25 0 0 1-.067.333l-1.256.91a.25.25 0 0 0 0 .405l1.256.91a.25.25 0 0 1 .067.334L.79 10.768a.25.25 0 0 0 .154.374l1.51.36a.25.25 0 0 1 .188.282l-.244 1.532a.25.25 0 0 0 .286.286l1.532-.244a.25.25 0 0 1 .282.189l.36 1.508a.25.25 0 0 0 .374.155l1.322-.812a.25.25 0 0 1 .333.067l.91 1.256a.25.25 0 0 0 .405 0l.91-1.256a.25.25 0 0 1 .334-.067l1.322.812a.25.25 0 0 0 .374-.155l.36-1.508a.25.25 0 0 1 .282-.19l1.532.245a.25.25 0 0 0 .286-.286l-.244-1.532a.25.25 0 0 1 .189-.282l1.508-.36a.25.25 0 0 0 .155-.374l-.812-1.322a.25.25 0 0 1 .067-.333l1.256-.91a.25.25 0 0 0 0-.405l-1.256-.91a.25.25 0 0 1-.067-.334l.812-1.322a.25.25 0 0 0-.155-.374l-1.508-.36a.25.25 0 0 1-.19-.282l.245-1.532a.25.25 0 0 0-.286-.286l-1.532.244a.25.25 0 0 1-.282-.189l-.36-1.508a.25.25 0 0 0-.374-.155l-1.322.812a.25.25 0 0 1-.333-.067L8.203.28zM8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"/>
                </svg> :
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-moon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7.003 7.003 0 0 0 8 15a7.002 7.002 0 0 0 6.53-4.47z"/>
                </svg>
              }
            </label>
          </div>
        </div>
        <div className="container my-5">
          <div className="text-center">
            <img src={mode ? LogoWhite : Logo} alt="Wokin Pizza" className="w-50" />
          </div>
          <hr/>
          <p>Sukella syvälle makunautintojen maailmaan ja valitse oma lempparisi meidän räätälöidyn pizzavalikoiman parista. Yksikään näistä herkuista ei kyllä jätä nälkäiseksi!</p>
          <p><strong>Miten tilaan?</strong> Valitse alta lempparipizzasi ja ota täytteet ylös. Suunnista kohti lähimpää pizzeriaasi tai vaihtoehtoisesti pizza-onlineen ja tilaa itsellesi jokin näistä herkuista. Et tule varmasti pettymään!</p>
          <p>Mikäli päädyt maistamaan jotain näistä herkuista, jaa toki kuva twitterissä häshtägillä <span className="badge badge-primary">#wokinpizza</span>.</p>
        </div>
        <div className="container my-5">
          <div className="row row-cols-1 row-cols-md-2">
            {pizzas.map((pizza, index) => (
              <div className="col mb-4" key={index}>
                <div className="card">
                  <img src={pizza.thumbnail} className="card-img-top" alt={pizza.name} />
                  <div className="card-body">
                    <h5 className="card-title">{ pizza.name }</h5>
                    <p className="card-text">{ pizza.description }</p>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">{ pizza.toppings }</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}