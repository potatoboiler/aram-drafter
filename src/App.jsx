import './App.css'
import { Component } from 'preact'
import CHAMPS from './champs.json'

const CHAMP_LIST = Object.keys(CHAMPS)
const NUM_CHAMPS = CHAMP_LIST.length

class Arena extends Component {
  constructor(props) {
    super(props)
    this.state = { n_players: 5 }
  }

  render() {
    const champs = ShuffleArray()
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 5fr)',
          gridGap: 0
        }}
      >
        <ChampColumn
          champsIdx={champs.slice(0, 15)}
          n={this.state.n_players}
          id='left'
        />
        <div></div>
        <ChampColumn
          champsIdx={champs.slice(15, 30)}
          n={this.state.n_players}
          id='right'
        />
      </div>
    )
  }
}

//<ChampColumn champs={champs} n={this.state.n_players} />
class ChampColumn extends Component {
  // constructor (props) {}
  render(props) {
    var champ_idx = 0
    var rows = []
    for (var i = 0; i < this.props.n; i++) {
      const chosenChampsIdx = this.props.champsIdx.slice(champ_idx, champ_idx + 3);
      const champIds = chosenChampsIdx.map(champIdx => CHAMP_LIST[champIdx])
      const champNames = chosenChampsIdx.map((champIdx) => CHAMPS[CHAMP_LIST[champIdx]])
      rows.push(
        <div style={{ height: '20vh' }}>
          <ChampTable
            c={champIds}
            cn={champNames}
            id={this.props.id}
          />
        </div>
      )
      champ_idx += 3
    }
    return <div>{rows}</div>
  }
}

/* props.c = champ names */
function ChampTable(props) {
  let id = props.id
  return (
    <table id={id}>
      <ChampEntry c={props.c[0]} cn={props.cn[0]} id={id} />
      <ChampEntry c={props.c[1]} cn={props.cn[1]} id={id} />
      <ChampEntry c={props.c[2]} cn={props.cn[2]} id={id} />
    </table>
  )
}

function ChampEntry(props) {
  var entry =
    <img
      src={GetChampionIconURI(props.c)}
      alt={props.cn}
      height='35'
    />;
  entry = (props.id === 'left') ? <td>{props.cn}{' '}{entry}</td> : <td>{entry}{' '}{props.cn}</td>;
  return <tr>{entry}</tr>
}

function GetChampionIconURI(name) {
  // Use Vite's base URL so `public/ico/...` assets resolve correctly
  // in dev and when the app is deployed under a sub-path.
  // Thanks to https://vitejs.dev/guide/assets.html#the-public-directory and Copilot
  return `${import.meta.env.BASE_URL}ico/${name}.png`
}

function ShuffleArray() {
  return [...Array(NUM_CHAMPS).keys()]
    .sort(() => 0.5 - Math.random())
    .slice(0, 30)
}

export function App() {
  return (
    <div className='App'>
      <Arena />
    </div>
  )
}

export default App
