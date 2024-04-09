import './App.css'
import React from 'react'

// Fiddlesticks must be capitalized as FiddleSticks
const CHAMPS = {
  Aatrox: 'Aatrox',
  Ahri: 'Ahri',
  Akali: 'Akali',
  Akshan: 'Akshan',
  Alistar: 'Alistar',
  Amumu: 'Amumu',
  Anivia: 'Anivia',
  Annie: 'Annie',
  Aphelios: 'Aphelios',       
  Ashe: 'Ashe',
  AurelionSol: 'Aurelion Sol',
  Azir: 'Azir',
  Bard: 'Bard',
  Belveth: "Bel'Veth",        
  Blitzcrank: 'Blitzcrank',   
  Brand: 'Brand',
  Braum: 'Braum',
  Briar: 'Briar',
  Caitlyn: 'Caitlyn',
  Camille: 'Camille',
  Cassiopeia: 'Cassiopeia',   
  Chogath: "Cho'Gath",        
  Corki: 'Corki',
  Darius: 'Darius',
  Diana: 'Diana',
  Draven: 'Draven',
  DrMundo: 'Dr. Mundo',       
  Ekko: 'Ekko',
  Elise: 'Elise',
  Evelynn: 'Evelynn',
  Ezreal: 'Ezreal',
  Fiddlesticks: 'Fiddlesticks',
  Fiora: 'Fiora',
  Fizz: 'Fizz',
  Galio: 'Galio',
  Gangplank: 'Gangplank',
  Garen: 'Garen',
  Gnar: 'Gnar',
  Gragas: 'Gragas',
  Graves: 'Graves',
  Gwen: 'Gwen',
  Hecarim: 'Hecarim',
  Heimerdinger: 'Heimerdinger',
  Hwei: 'Hwei',
  Illaoi: 'Illaoi',
  Irelia: 'Irelia',
  Ivern: 'Ivern',
  Janna: 'Janna',
  JarvanIV: 'Jarvan IV',
  Jax: 'Jax',
  Jayce: 'Jayce',
  Jhin: 'Jhin',
  Jinx: 'Jinx',
  Kaisa: "Kai'Sa",
  Kalista: 'Kalista',
  Karma: 'Karma',
  Karthus: 'Karthus',
  Kassadin: 'Kassadin',
  Katarina: 'Katarina',
  Kayle: 'Kayle',
  Kayn: 'Kayn',
  Kennen: 'Kennen',
  Khazix: "Kha'Zix",
  Kindred: 'Kindred',
  Kled: 'Kled',
  KogMaw: "Kog'Maw",
  KSante: "K'Sante",
  Leblanc: 'LeBlanc',
  LeeSin: 'Lee Sin',
  Leona: 'Leona',
  Lillia: 'Lillia',
  Lissandra: 'Lissandra',
  Lucian: 'Lucian',
  Lulu: 'Lulu',
  Lux: 'Lux',
  Malphite: 'Malphite',
  Malzahar: 'Malzahar',
  Maokai: 'Maokai',
  MasterYi: 'Master Yi',
  Milio: 'Milio',
  MissFortune: 'Miss Fortune',
  MonkeyKing: 'Wukong',
  Mordekaiser: 'Mordekaiser',
  Morgana: 'Morgana',
  Naafiri: 'Naafiri',
  Nami: 'Nami',
  Nasus: 'Nasus',
  Nautilus: 'Nautilus',
  Neeko: 'Neeko',
  Nidalee: 'Nidalee',
  Nilah: 'Nilah',
  Nocturne: 'Nocturne',
  Nunu: 'Nunu & Willump',
  Olaf: 'Olaf',
  Orianna: 'Orianna',
  Ornn: 'Ornn',
  Pantheon: 'Pantheon',
  Poppy: 'Poppy',
  Pyke: 'Pyke',
  Qiyana: 'Qiyana',
  Quinn: 'Quinn',
  Rakan: 'Rakan',
  Rammus: 'Rammus',
  RekSai: "Rek'Sai",
  Rell: 'Rell',
  Renata: 'Renata Glasc',
  Renekton: 'Renekton',
  Rengar: 'Rengar',
  Riven: 'Riven',
  Rumble: 'Rumble',
  Ryze: 'Ryze',
  Samira: 'Samira',
  Sejuani: 'Sejuani',
  Senna: 'Senna',
  Seraphine: 'Seraphine',
  Sett: 'Sett',
  Shaco: 'Shaco',
  Shen: 'Shen',
  Shyvana: 'Shyvana',
  Singed: 'Singed',
  Sion: 'Sion',
  Sivir: 'Sivir',
  Skarner: 'Skarner',
  Smolder: 'Smolder',
  Sona: 'Sona',
  Soraka: 'Soraka',
  Swain: 'Swain',
  Sylas: 'Sylas',
  Syndra: 'Syndra',
  TahmKench: 'Tahm Kench',
  Taliyah: 'Taliyah',
  Talon: 'Talon',
  Taric: 'Taric',
  Teemo: 'Teemo',
  Thresh: 'Thresh',
  Tristana: 'Tristana',
  Trundle: 'Trundle',
  Tryndamere: 'Tryndamere',
  TwistedFate: 'Twisted Fate',
  Twitch: 'Twitch',
  Udyr: 'Udyr',
  Urgot: 'Urgot',
  Varus: 'Varus',
  Vayne: 'Vayne',
  Veigar: 'Veigar',
  Velkoz: "Vel'Koz",
  Vex: 'Vex',
  Vi: 'Vi',
  Viego: 'Viego',
  Viktor: 'Viktor',
  Vladimir: 'Vladimir',
  Volibear: 'Volibear',
  Warwick: 'Warwick',
  Xayah: 'Xayah',
  Xerath: 'Xerath',
  XinZhao: 'Xin Zhao',
  Yasuo: 'Yasuo',
  Yone: 'Yone',
  Yorick: 'Yorick',
  Yuumi: 'Yuumi',
  Zac: 'Zac',
  Zed: 'Zed',
  Zeri: 'Zeri',
  Ziggs: 'Ziggs',
  Zilean: 'Zilean',
  Zoe: 'Zoe',
  Zyra: 'Zyra'
}
const CHAMP_LIST = Object.keys(CHAMPS)
const NUM_CHAMPS = CHAMP_LIST.length

class Arena extends React.Component {
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
class ChampColumn extends React.Component {
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
  return '/aram-drafter/ico/' + name + '.png'
}

function ShuffleArray() {
  return [...Array(NUM_CHAMPS).keys()]
    .sort(() => 0.5 - Math.random())
    .slice(0, 30)
}

function App() {
  return (
    <div className='App'>
      <Arena />
    </div>
  )
}

export default App
