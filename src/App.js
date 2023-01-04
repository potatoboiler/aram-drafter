import logo from './logo.svg'
import './App.css'
import React from 'react'

const NUM_CHAMPS = 161

const BASE_URL = '/aram-drafter'

const CHAMP_LIST = [
  'Aatrox',
  'Ahri',
  'Akali',
  'Akshan',
  'Alistar',
  'Amumu',
  'Anivia',
  'Annie',
  'Aphelios',
  'Ashe',
  'Aurelion_Sol',
  'Azir',
  'Bard',
  "Bel'Veth",
  'Blitzcrank',
  'Brand',
  'Braum',
  'Caitlyn',
  'Camille',
  'Cassiopeia',
  'Cho%27Gath',
  'Corki',
  'Darius',
  'Diana',
  'Dr._Mundo',
  'Draven',
  'Ekko',
  'Elise',
  'Evelynn',
  'Ezreal',
  'Fiddlesticks',
  'Fiora',
  'Fizz',
  'Galio',
  'Gangplank',
  'Garen',
  'Gnar',
  'Gragas',
  'Graves',
  'Gwen',
  'Hecarim',
  'Heimerdinger',
  'Illaoi',
  'Irelia',
  'Ivern',
  'Janna',
  'Jarvan_IV',
  'Jax',
  'Jayce',
  'Jhin',
  'Jinx',
  'Kai%27Sa',
  'Kalista',
  'Karma',
  'Karthus',
  'Kassadin',
  'Katarina',
  'Kayle',
  'Kayn',
  'Kennen',
  'Kha%27Zix',
  'Kindred',
  'Kled',
  'Kog%27Maw',
  'LeBlanc',
  'Lee_Sin',
  'Leona',
  'Lillia',
  'Lissandra',
  'Lucian',
  'Lulu',
  'Lux',
  'Malphite',
  'Malzahar',
  'Maokai',
  'Master_Yi',
  'Miss_Fortune',
  'Mordekaiser',
  'Morgana',
  'Nami',
  'Nasus',
  'Nautilus',
  'Neeko',
  'Nidalee',
  'Nilah',
  'Nocturne',
  'Nunu',
  'Olaf',
  'Orianna',
  'Ornn',
  'Pantheon',
  'Poppy',
  'Pyke',
  'Qiyana',
  'Quinn',
  'Rakan',
  'Rammus',
  'Rek%27Sai',
  'Rell',
  'Renata_Glasc',
  'Renekton',
  'Rengar',
  'Riven',
  'Rumble',
  'Ryze',
  'Samira',
  'Sejuani',
  'Senna',
  'Seraphine',
  'Sett',
  'Shaco',
  'Shen',
  'Shyvana',
  'Singed',
  'Sion',
  'Sivir',
  'Skarner',
  'Sona',
  'Soraka',
  'Swain',
  'Sylas',
  'Syndra',
  'Tahm_Kench',
  'Taliyah',
  'Talon',
  'Taric',
  'Teemo',
  'Thresh',
  'Tristana',
  'Trundle',
  'Tryndamere',
  'Twisted_Fate',
  'Twitch',
  'Udyr',
  'Urgot',
  'Varus',
  'Vayne',
  'Veigar',
  'Vel%27Koz',
  'Vex',
  'Viego',
  'Viktor',
  'Vi',
  'Vladimir',
  'Volibear',
  'Warwick',
  'Wukong',
  'Xayah',
  'Xerath',
  'Xin_Zhao',
  'Yasuo',
  'Yone',
  'Yorick',
  'Yuumi',
  'Zac',
  'Zed',
  'Zeri',
  'Ziggs',
  'Zilean',
  'Zoe',
  'Zyra'
]

class Arena extends React.Component {
  constructor (props) {
    super(props)
    this.state = { n_players: 5 }
  }

  render () {
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
          champs={champs.slice(0, 15)}
          n={this.state.n_players}
          id='left'
        />
        <div>Column 2</div>
        <ChampColumn
          champs={champs.slice(15, 30)}
          n={this.state.n_players}
          id='right'
        />
      </div>
    )
  }
}

//<ChampColumn champs={champs} n={this.state.n_players} />
class ChampColumn extends React.Component {
  // constructor (props) {}
  render (props) {
    var champ_idx = 0
    var rows = []
    for (var i = 0; i < this.props.n; i++) {
      rows.push(
        <div style={{ height: '20vh' }}>
          <ChampTable
            c={this.props.champs
              .slice(champ_idx, champ_idx + 3)
              .map(x => CHAMP_LIST[x])}
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
function ChampTable (props) {
  let id = props.id
  return (
    <table id={id}>
      <ChampEntry c={props.c[0]} id={id} />
      <ChampEntry c={props.c[1]} id={id} />
      <ChampEntry c={props.c[2]} id={id} />
    </table>
  )
}

function ChampEntry (props) {
  if (props.id == 'left') {
    var entry = (
      <td>
        {props.c}{' '}
        <img
          src={'/aram-drafter/ico/' + props.c + '_OriginalSquare.png'}
          alt={props.c}
          height='35'
        />
      </td>
    )
  } else {
    var entry = (
      <td>
        <img
          src={'/aram-drafter/ico/' + props.c + '_OriginalSquare.png'}
          alt={props.c}
          height='35'
        />{' '}
        {props.c}
      </td>
    )
  }
  return <tr>{entry}</tr>
}

function ShuffleArray () {
  return [...Array(NUM_CHAMPS).keys()]
    .sort(() => 0.5 - Math.random())
    .slice(0, 30)
}

function App () {
  return (
    <div className='App'>
      <Arena />
    </div>
  )
}

export default App
