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

const ModsInfo = ({ name: { english }, base }) => (
  <div>
    <h2>{english}</h2>
    <table>
      <tbody>
        {Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

ModsInfo.propTypes = ModsType

function App() {
  const [filter, filterSet] = React.useState('')
  const [mods, modsSet] = React.useState([])
  const [selectedMods, selectedModsSet] = React.useState(null)

  React.useEffect(() => {
    fetch('https://api.github.com/repos/Roll20/roll20-api-scripts/contents/')
      .then((resp) => resp.json())
      .then((data) => modsSet(data))
  }, [])

  return (
    <div
      style={{
        margin: 'auto',
        width: 800,
        paddingTop: '1em',
      }}
    >
      <h1 className="title">Roll20 Mod Directory</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '80% 20%',
          gridColumnGap: '1rem',
        }}
      >
        <div>
          <input
            type="text"
            value={filter}
            onChange={(evt) => filterSet(evt.target.value)}
          />
          <table width="100%">
            <tbody>
              {mods
                .filter(({ name }) =>
                  name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
                )
                .slice(0, 20)
                .map((mods) => (
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
