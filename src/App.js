import React from 'react'
import PropTypes from 'prop-types'

import './App.css'

const ModsType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
    japanese: PropTypes.string.isRequired,
    chinese: PropTypes.string.isRequired,
    french: PropTypes.string.isRequired,
  }),
  type: PropTypes.arrayOf(PropTypes.string.isRequired),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    'Sp. Attack': PropTypes.number.isRequired,
    'Sp. Defense': PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
})

const ModsRow = ({ mods, onClick }) => (
  <>
    <tr key={mods.id}>
      <td>{mods.name}</td>
      <td></td>
      <td>
        <button onClick={() => onClick(mods)}>More Information</button>
      </td>
    </tr>
  </>
)

ModsRow.propTypes = {
  mods: PropTypes.arrayOf(ModsType),
}

const ModsInfo = ({ name, _links }) => (
  <div>
    <h2>{name}</h2>
    <table>
      <tbody>
        {Object.keys(_links).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{_links[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

ModsInfo.propTypes = ModsType

function App() {
  const [mods, setMods] = React.useState([])
  const [selectedMods, selectedModsSet] = React.useState(null)
  const APIurl =
    'https://api.github.com/repos/Roll20/roll20-api-scripts/contents/'

  React.useEffect(() => {
    fetch(APIurl)
      .then((res) => res.json())
      .then((data) => setMods(data))
  }, [])

  return (
    <div
      style={{
        margin: 'auto',
        width: 800,
        paddingTop: '1em',
      }}
    >
      <h1 className="title">Roll20 Mods Search</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '80% 20%',
          gridColumnGap: '1rem',
        }}
      >
        <div>
          <table width="100%">
            <tbody>
              {mods.map((mods) => (
                <ModsRow
                  mods={mods}
                  onClick={(mods) => selectedModsSet(mods)}
                />
              ))}
            </tbody>
          </table>
        </div>
        {selectedMods && <ModsInfo {...selectedMods} />}
      </div>
    </div>
  )
}

export default App
